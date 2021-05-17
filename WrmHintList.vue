<template>
  <div class="wrm-flex-column-stretch">
    <div class="wrm-flex-column-stretch wrm-flex-item-grow">
      <div class="wrm-flex-row wrm-flex-item"
        v-for="hint in hints" :key="hint.hintOption.credentialHandler">
        <wrm-hint
          @click.native="!confirmingRemove && !removingHint &&
            !selectedHint && select(hint)"
          class="wrm-flex-item-grow"
          :hint="hint"
          :default-icon="defaultHintIcon"
          :active="!!(
            ((confirmingRemove || removingHint) && removeHint === hint) ||
            (activateOnSelect && selectedHint === hint))"
          :selected="selectedHint === hint"
          :selectable="true"
          :disabled="!!(removingHint || confirmingRemove ||
            (selectedHint && selectedHint !== hint))">
        </wrm-hint>
        <wrm-remove-button
          v-if="enableRemoveHint && !hint.jit"
          @cancel="cancelRemove(hint)"
          @confirm="confirmRemove(hint)"
          @remove="remove(hint)"
          class="wrm-flex-item"
          :cancel-timeout="cancelRemoveHintTimeout"
          :disabled="!!(removingHint || selectedHint ||
            (removeHint && removeHint !== hint))"
          :remove-text="'Hide'">
        </wrm-remove-button>
      </div>
    </div>
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018-2021, Digital Bazaar, Inc.
 * All rights reserved.
 */
import WrmHint from './WrmHint.vue';
import WrmRemoveButton from './WrmRemoveButton.vue';

export default {
  name: 'WrmHintList',
  components: {WrmHint, WrmRemoveButton},
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
    activateOnSelect: Boolean
  },
  data() {
    return {
      selectedHint: null,
      confirmingRemove: false,
      removeHint: null,
      removingHint: false,
      removeHintName: ''
    };
  },
  methods: {
    async cancelRemove(hint) {
      this.confirmingRemove = false;
      this.removeHint = null;
      hint.name = this.removeHintName;
    },
    async confirmRemove(hint) {
      this.removeHint = hint;
      this.removeHintName = hint.name;
      this.confirmingRemove = true;
      hint.name = this.hintRemovalText + ' ' + this.removeHintName;
    },
    async remove(hint) {
      this.removingHint = true;
      try {
        // wait for hint to be removed
        await this.onRemove(hint);
      } catch(e) {
        console.error(e);
      } finally {
        hint.name = this.removeHintName;
        this.removingHint = false;
        this.removeHint = null;
        this.confirmingRemove = false;
      }
    },
    async select(hint) {
      this.selectedHint = hint;
      try {
        // wait for selection to be handled
        await this.onSelect(hint);
      } catch(e) {
        console.error(e);
      }
      this.selectedHint = null;
    },
    onRemove(hint) {
      let promise = Promise.resolve();
      this.$emit('remove', {
        hint,
        waitUntil: p => promise = p
      });
      return promise;
    },
    onSelect(hint) {
      let promise = Promise.resolve();
      this.$emit('select', {
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
