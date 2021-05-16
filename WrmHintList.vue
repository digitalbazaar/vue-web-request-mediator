<template>
  <div class="wrm-flex-column-stretch">
    <div class="wrm-flex-column-stretch wrm-flex-item-grow">
      <div class="wrm-flex-row wrm-flex-item"
        v-for="hint in hints" :key="hint.hintOption.credentialHandler">
        <wrm-hint
          @click.native="!selectedHint && select(hint)"
          class="wrm-flex-item-grow"
          :hint="hint"
          :default-icon="defaultHintIcon"
          :active="!!(activateOnSelect && selectedHint === hint)"
          :selected="selectedHint === hint"
          :selectable="true"
          :disabled="!!(removingHint ||
            (selectedHint && selectedHint !== hint))">
        </wrm-hint>
        <wrm-remove-button
          v-if="enableRemoveHint"
          @click.native="remove(hint)"
          class="wrm-flex-item"
          :disabled="!!(removingHint || selectedHint)">
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
    activateOnSelect: Boolean
  },
  data() {
    return {
      selectedHint: null,
      removingHint: false
    };
  },
  methods: {
    async remove(hint) {
      this.removingHint = true;
      try {
        // wait for hint to be removed
        await this.onRemove(hint);
      } catch(e) {
        console.error(e);
      } finally {
        this.removingHint = false;
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
