<template>
  <div class="wrm-modal">
    <div class="wrm-modal-content wrm-modern">
      <div class="wrm-flex-row wrm-modal-content-header wrm-modern">
        <div
          class="wrm-flex-item-grow"
          style="padding: 0 15px; overflow: hidden">
          <slot name="header"></slot>
        </div>
        <wrm-header-close-button
          style="padding-right: 5px"
          @click.native="close()" />
      </div>
      <div v-if="display === 'list'" class="wrm-slide">
        <div class="wrm-heading" style="padding: 2px 0">Choose an option</div>
        <wrm-hint-list
          :hints="hints"
          :default-hint-icon="defaultHintIcon"
          @select="select" />
      </div>
      <div v-else-if="display === 'overview'" class="wrm-slide">
        <slot name="message"></slot>
        <!-- confirm button ON and at least one choice-->
        <div v-if="confirmButton && hints.length > 0"
          @click="!confirming && (display = 'list')">
          <wrm-hint
            :hint="selectedHint || hints[0]"
            :default-icon="defaultHintIcon"
            :active="confirming"
            :selected="false"
            :selectable="true"
            :disabled="false" />
        </div>
        <!-- confirm button ON, no choices, but needs storage access to
          retrieve hints -->
        <div v-else-if="confirmButton && needsStorageAccess"
          @click="!confirming && requestStorageAccess()">
          <div class="wrm-flex-item">
            <div
              style="margin-top: 5px"
              class="wrm-flex-row wrm-item wrm-flex-item-grow wrm-selectable">
              <h6 class="wrm-flex-item">Choose an option</h6>
              <div class="wrm-flex-item wrm-flex-item-grow"></div>
              <h6><i class="wrm-flex-item fas fa-chevron-right"></i></h6>
            </div>
          </div>
        </div>
        <!-- confirm button OFF; selection integrated -->
        <div v-else-if="!confirmButton && hints.length > 0"
          class="wrm-flex-column-stretch">
          <wrm-hint-list
            :hints="hints"
            :default-hint-icon="defaultHintIcon"
            activate-on-select
            @select="confirm" />
        </div>
        <slot name="hint-list-footer"></slot>
        <div v-if="confirmButton"
          class="wrm-button-bar" style="margin-top: 10px">
          <button type="button" class="wrm-button"
            :disabled="confirming"
            @click="onCancel()">
            Cancel
          </button>
          <button
            style="margin-left: 5px"
            :disabled="confirming || hints.length === 0"
            @click="confirm({hint: selectedHint, waitUntil: () => {}})"
            type="button" class="wrm-button wrm-primary">
            {{confirmButtonText}}
          </button>
        </div>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

import WrmCloseButton from './WrmCloseButton.vue';
import WrmHint from './WrmHint.vue';
import WrmHintList from './WrmHintList.vue';
import {requestStorageAccess} from './storageAccess.js';

export default {
  name: 'WrmHintChooser',
  components: {WrmCloseButton, WrmHint, WrmHintList},
  async created() {
    const self = this;
    this._listener = event => {
      if(!self.confirming && event.key === 'Escape') {
        event.preventDefault();
        self.close();
      }
    };
    document.addEventListener('keydown', this._listener);

    if(typeof document.hasStorageAccess === 'function') {
      this.needsStorageAccess = !await document.hasStorageAccess();
    } else {
      this.needsStorageAccess = false;
    }
  },
  destroyed() {
    document.removeEventListener('keydown', this._listener);
  },
  props: {
    hints: {
      type: Array,
      required: true
    },
    defaultHintIcon: {
      type: String,
      required: true
    },
    confirmButton: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: 'Confirm'
    }
  },
  data() {
    return {
      display: 'overview',
      confirming: false,
      needsStorageAccess: false,
      selectedHint: null
    };
  },
  methods: {
    close() {
      if(this.display === 'list') {
        this.display = 'overview';
        return;
      }
      this.onCancel();
    },
    async requestStorageAccess() {
      const self = this;
      await requestStorageAccess();
      this.needsStorageAccess = false;
      let promise = Promise.resolve();
      this.$emit('load-hints', {
        waitUntil: p => promise = p
      });
      try {
        await promise;
        if(this.hints.length > 0) {
          self.display = 'list';
        }
      } catch(e) {}
    },
    select(event) {
      this.selectedHint = event.hint;
      this.display = 'overview';
    },
    async confirm(event) {
      let _resolve;
      const promise = new Promise(r => _resolve = r);
      this._resolve = _resolve;
      event.waitUntil(promise);

      this.selectedHint = event.hint;
      this.confirming = true;

      try {
        // wait for selection to be handled
        await this.onConfirm(event.hint);
      } catch(e) {
        console.error(e);
      }

      // ensure still confirming and not canceled
      if(this.confirming) {
        if(!this.confirmButton) {
          this.selectedHint = null;
        } else {
          this.selectedHint = this.hints[0] || null;
        }
        this.confirming = false;

        _resolve();
      }
    },
    onCancel() {
      if(this.confirming) {
        this._resolve();
        this.confirming = false;
      }
      this.$emit('cancel');
    },
    onConfirm(hint) {
      let promise = Promise.resolve();
      this.$emit('confirm', {
        hint,
        waitUntil: p => promise = p
      });
      return promise;
    }
  }
};
</script>
<style>
</style>
