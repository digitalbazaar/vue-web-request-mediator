<template>
  <div class="wrm-flex-column-stretch">
    <div class="wrm-flex-column-stretch wrm-flex-item-grow">
      <div class="wrm-flex-row wrm-flex-item"
        v-for="hint in nonJitHints"
        :key="hint.hintOption.credentialHandler">
        <wrm-hint
          @click="!confirmingRemove && !removingHint &&
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
          v-if="enableRemoveHint"
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
      <div
        v-if="hasMixedHints"
        class="wrm-flex-row wrm-flex-item wrm-separator" />
      <div class="wrm-flex-row wrm-flex-item"
        v-for="hint in jitHints"
        :key="hint.hintOption.credentialHandler">
        <wrm-hint
          @click="!confirmingRemove && !removingHint &&
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
      </div>
    </div>
  </div>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
import {computed, ref, toRef} from 'vue';
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
  setup(props, {emit}) {
    const hints = toRef(props, 'hints');
    const defaultHintIcon = toRef(props, 'defaultHintIcon');
    const enableRemoveHint = toRef(props, 'enableRemoveHint');
    const cancelRemoveHintTimeout = toRef(props, 'cancelRemoveHintTimeout');
    const hintRemovalText = toRef(props, 'hintRemovalText');
    const activateOnSelect = toRef(props, 'activateOnSelect');

    const selectedHint = ref(null);
    const confirmingRemove = ref(false);
    const removeHint = ref(null);
    const removingHint = ref(false);
    let removeHintName = '';

    const jitHints = computed(() => hints.value.filter(h => h.jit));
    const nonJitHints = computed(() => hints.value.filter(h => !h.jit));
    const hasMixedHints = computed(
      () => jitHints.value.length > 0 && nonJitHints.value.length > 0);

    // FIXME: consider using vue-extendable-event
    const onRemove = async hint => {
      let promise = Promise.resolve();
      emit('remove', {
        hint,
        waitUntil: p => promise = p
      });
      return promise;
    };
    const onSelect = async hint => {
      let promise = Promise.resolve();
      emit('select', {
        hint,
        waitUntil: p => promise = p
      });
      return promise;
    };

    const cancelRemove = hint => {
      confirmingRemove.value = false;
      removeHint.value = null;
      hint.name = removeHintName;
    };
    const confirmRemove = hint => {
      removeHint.value = hint;
      removeHintName = hint.name;
      confirmingRemove.value = true;
      hint.name = `${hintRemovalText.value} ${removeHintName}`;
    };
    const remove = async hint => {
      removingHint.value = true;
      try {
        // wait for hint to be removed
        await onRemove(hint);
      } catch(e) {
        console.error(e);
      } finally {
        hint.name = removeHintName;
        removingHint.value = false;
        removeHint.value = null;
        confirmingRemove.value = false;
      }
    };
    const select = async hint => {
      selectedHint.value = hint;
      try {
        // wait for selection to be handled
        await onSelect(hint);
      } catch(e) {
        console.error(e);
      }
      selectedHint.value = null;
    };

    return {
      defaultHintIcon, enableRemoveHint, cancelRemoveHintTimeout,
      activateOnSelect, selectedHint, confirmingRemove,
      jitHints, nonJitHints, hasMixedHints,
      cancelRemove, confirmRemove, remove, select
    };
  },
  emits: ['remove', 'select']
};
</script>

<style>
</style>
