<template>
  <div class="wrm-modal">
    <div class="wrm-modal-content">
      <wrm-close-button @click="onDeny()"></wrm-close-button>
      <div style="margin-right: 10px">
        <strong>{{origin}}</strong> wants to
      </div>
      <div style="padding-top: 15px"></div>
      <div v-for="permission in permissions">
        <i class="{{permission.icon}}"></i> {{permission.name}}
      </div>
      <br>
      <div class="wrm-button-bar" style="margin-top: 10px">
        <button
          @click="onDeny()"
          type="button" class="wrm-button">Block
        </button>
        <span style="margin-right: 5px"></span>
        <button
          @click="onAllow()"
          type="button" class="wrm-button">Allow
        </button>
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

export default {
  name: 'WrmPermissionDialog',
  components: {WrmCloseButton},
  created() {
    const self = this;
    this._listener = event => {
      if(event.key === 'Escape') {
        event.preventDefault();
        self.onDeny();
      }
    };
    document.addEventListener('keydown', this._listener);
  },
  destroyed() {
    document.removeEventListener('keydown', this._listener);
  },
  props: {
    origin: {
      type: String,
      required: true
    },
    permissions: {
      type: Array,
      required: true
    }
  },
  methods: {
    onAllow() {
      this.$emit('allow');
    },
    onDeny() {
      this.$emit('deny');
    }
  }
};
</script>
<style>
</style>
