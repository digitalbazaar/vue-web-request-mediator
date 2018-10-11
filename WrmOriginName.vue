<template>
  <div class="wrm-ellipsis">
    <slot style="font-size: 14px" name="task"></slot>
    <div style="font-size: 14px">
      <strong>{{name}}</strong>
    </div>
    <div class="wrm-flex-row"
      style="justify-content: flex-start; font-weight: bold">
      <i class="fas fa-lock wrm-flex-item wrm-green"
        style="padding-right: 2px"></i>
      <span v-if="domain">
        <span class="wrm-green">https</span><span class="wrm-dark-gray">://{{domain}}</span>
      </span>
      <span v-else>
        <span class="wrm-dark-gray">{{origin}}</span>
      </span>
    </div>
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2017-2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

export default {
  name: 'WrmOriginName',
  computed: {
    domain() {
      // origin should always start with `https://`
      if(this.origin.startsWith('https://')) {
        return this.origin.substr(8);
      }
      return null;
    },
    name() {
      if(!this.manifest) {
        return this.domain || this.origin;
      }
      const {name, short_name} = this.manifest;
      return name || short_name || this.domain || this.origin;
    }
  },
  props: {
    origin: {
      type: String,
      required: true
    },
    manifest: {
      type: Object,
      required: false
    }
  }
};
</script>
<style>
</style>
