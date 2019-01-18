<template>
  <div class="wrm-modal">
    <div class="wrm-modal-content wrm-modern">
      <div class="wrm-flex-row wrm-modal-content-header wrm-modern">
        <wrm-header-back-button v-if="!first"
          style="padding-left: 5px; padding-right: 5px"
          @click.native="onBack()" />
        <div
          class="wrm-flex-item-grow"
          style="padding: 0 15px; overflow: hidden; height: 30px">
          <slot name="header"></slot>
        </div>
        <wrm-header-close-button
          style="padding-right: 5px"
          @click.native="onCancel()" />
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
            @click="onNext()">
            Next
          </button>
          <button type="button" class="wrm-button wrm-primary" v-else
            style="margin-left: 5px"
            :disabled="loading || blocked"
            @click="onFinish()">
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
 * Copyright (c) 2019, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

export default {
  name: 'WrmWizardDialog',
  components: {},
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
    blocked: {
      type: Object,
      required: true
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onNext() {
      this.$emit('next');
    },
    onBack() {
      this.$emit('back');
    },
    onFinish() {
      this.$emit('finish');
    }
  }
};
</script>
<style>
</style>
