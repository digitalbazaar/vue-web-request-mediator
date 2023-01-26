<template>
  <div>
    <div v-if="display === 'list'" class="wrm-slide">
      <div class="wrm-heading" style="padding: 2px 0">Choose an option</div>
      <wrm-hint-list
        :hints="hints"
        :default-hint-icon="defaultHintIcon"
        :enable-remove-hint="enableRemoveHint"
        :cancel-remove-hint-timeout="cancelRemoveHintTimeout"
        :hint-removal-text="hintRemovalText"
        @remove="removeHint"
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
      <!-- confirm button OFF; selection integrated -->
      <div v-else-if="!confirmButton && hints.length > 0"
        class="wrm-flex-column-stretch">
        <wrm-hint-list
          :hints="hints"
          :default-hint-icon="defaultHintIcon"
          :enable-remove-hint="enableRemoveHint"
          :cancel-remove-hint-timeout="cancelRemoveHintTimeout"
          :hint-removal-text="hintRemovalText"
          activate-on-select
          @remove="removeHint"
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
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
import WrmCloseButton from './WrmCloseButton.vue';
import WrmHint from './WrmHint.vue';
import WrmHintList from './WrmHintList.vue';

export default {
  name: 'WrmHintChooser',
  components: {WrmCloseButton, WrmHint, WrmHintList},
  emits: ['cancel', 'confirm', 'remove-hint'],
  async created() {
    const self = this;
    this._listener = event => {
      if(!self.confirming && event.key === 'Escape') {
        event.preventDefault();
        self.close();
      }
    };
    document.addEventListener('keydown', this._listener);
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
    enableRemoveHint: {
      type: Boolean,
      default: false
    },
    cancelRemoveHintTimeout: {
      type: Number,
      // 5 seconds to cancel remove hint by default
      default: 5000
    },
    hintRemovalText: {
      type: String,
      default: 'Hiding...'
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
    async removeHint(event) {
      let _resolve;
      const promise = new Promise(r => _resolve = r);
      this._resolve = _resolve;
      event.waitUntil(promise);

      this.confirming = true;

      try {
        // wait for remove to be handled
        await this.onRemoveHint(event.hint);
      } catch(e) {
        console.error(e);
      }

      this.confirming = false;
      _resolve();
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
    },
    onRemoveHint(hint) {
      let promise = Promise.resolve();
      this.$emit('remove-hint', {
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
