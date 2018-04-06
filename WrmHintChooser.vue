<template>
  <div class="wrm-modal">
    <div class="wrm-modal-content">
      <wrm-close-button @click="!confirming && close()"
        :disabled="confirming">
      </wrm-close-button>
      <div v-if="display === 'list'" class="wrm-slide">
        <div class="wrm-heading" style="margin-top: 0">Choose an option</div>
        <wrm-hint-list
          :hints="hints"
          :default-hint-icon="defaultHintIcon"
          :activate-on-select="false"
          @select="select">
        </wrm-hint-list>
      </div>
      <div v-if="display === 'overview'" class="wrm-slide">
        <slot name="header"></slot>
        <!-- confirm button ON and at least one choice -->
        <div v-if="confirmButton && selectedHint"
          @click="!confirming && (display = 'list')">
          <wrm-hint
            :hint="selectedHint"
            :default-icon="defaultHintIcon"
            :active="confirming"
            :selected="false"
            :selectable="true"
            :disabled="false">
          </wrm-hint>
        </div>
        <!-- confirm button OFF; selection integrated -->
        <div v-if="!confirmButton && hints.length > 0"
          class="wrm-flex-column-stretch">
          <wrm-hint-list
            :hints="hints"
            :default-hint-icon="defaultHintIcon"
            :activate-on-select="true"
            @select="confirm">
          </wrm-hint-list>
        </div>
        <div class="wrm-button-bar" style="margin-top: 10px">
          <button type="button" class="wrm-button"
            :disabled="confirming"
            @click="onCancel()">
            Cancel
          </button>
          <button v-if="confirmButton"
            style="margin-left: 5px"
            :disabled="confirming"
            @click="confirm(selectedHint)"
            type="button" class="wrm-button wrm-primary">
            {{confirmButtonText}}
          </button>
        </div>
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

import WrmHint from './WrmHint.vue';
import WrmHintList from './WrmHintList.vue';

export default {
  name: 'WrmHintChooser',
  components: {WrmHint, WrmHintList},
  beforeCreate() {
    document.addEventListener('keydown', listener);
  },
  destroyed() {
    document.removeEventListener('keydown', listener);
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
      selectedHint: null,
      confirming: false
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
    select(hint) {
      this.selectedHint = hint;
      this.display = 'overview';
    },
    async confirm(hint) {
      this.selectedHint = hint;
      this.confirming = true;

      try {
        // wait for selection to be handled
        await this.onConfirm(hint);
      } catch(e) {
        console.error(e);
      }

      if(!this.confirmButton) {
        this.selectedHint = null;
      } else {
        this.selectedHint = this.hints[0] || null;
      }
      this.confirming = false;
    },
    onCancel() {
      this.$emit('cancel');
    },
    onConfirm(hint) {
      // FIXME: this doesn't work, may need to pass in function to
      // `onConfirm`
      return this.$emit('confirm', hint);
    }
  }
};

// FIXME: `this` not properly bound
function listener(event) {
  if(!this.confirming && event.key === 'Escape') {
    event.preventDefault();
    this.close();
  }
}
</script>
<style>
</style>