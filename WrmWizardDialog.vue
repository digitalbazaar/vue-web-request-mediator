<template>
  <div class="wrm-modal">
    <div class="wrm-modal-content wrm-modern">
      <div class="wrm-flex-row wrm-modal-content-header wrm-modern">
        <wrm-header-back-button v-if="!first && !hideBackButton"
          @click="onBack()" />
        <div
          class="wrm-flex-item-grow"
          style="padding: 0 15px; overflow: hidden;">
          <slot name="header"></slot>
        </div>
        <wrm-header-close-button
          v-if="!hideCancelButton"
          @click="onCancel()"
          ref="close" />
      </div>
      <div>
        <slot name="body"></slot>
      </div>
      <slot name="footer">
        <!-- div class="wrm-separator"></div -->
        <div class="wrm-button-bar" style="margin-top: 10px">
          <button type="button" class="wrm-button"
            :disabled="loading"
            @click="onCancel()">
            Cancel
          </button>
          <button type="button" class="wrm-button wrm-primary" v-if="hasNext"
            style="margin-left: 5px"
            :disabled="loading || blocked"
            @click="onNext()"
            ref="next">
            Next
          </button>
          <button type="button" class="wrm-button wrm-primary" v-else
            style="margin-left: 5px"
            :disabled="loading || blocked"
            @click="onFinish()"
            ref="finish">
            Finish
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2019-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
import {onBeforeUnmount, onMounted, ref} from 'vue';

export default {
  name: 'WrmWizardDialog',
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    first: {
      type: Boolean,
      required: true
    },
    hasNext: {
      type: Boolean,
      required: true
    },
    hideBackButton: {
      type: Boolean,
      default: false
    },
    hideCancelButton: {
      type: Boolean,
      default: false
    },
    blocked: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit}) {
    const close = ref(null);
    const finish = ref(null);
    const next = ref(null);

    const onCancel = () => emit('cancel');
    const onNext = () => emit('next');
    const onBack = () => emit('back');
    const onFinish = () => emit('finish');

    let _listener;

    onMounted(() => {
      _listener = event => {
        if(event.key === 'Escape') {
          event.preventDefault();
          onCancel();
        }
      };
      document.addEventListener('keydown', _listener);

      // focus on a button to allow `Escape` to function properly
      const button = ref.next.value || ref.finish.value || ref.close.value;
      if(button) {
        button.focus();
      }
    });
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', _listener);
    });

    return {close, finish, next, onCancel, onNext, onBack, onFinish};
  },
  emits: ['cancel', 'next', 'back', 'finish']
};
</script>

<style>
</style>
