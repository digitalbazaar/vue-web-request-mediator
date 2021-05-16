<template>
  <div
    class="wrm-flex-row"
    style="justify-content: flex-start; font-weight: bold">
    <i class="fas fa-lock wrm-flex-item wrm-green"
      style="padding-right: 6px"></i>
    <span v-if="domain">
      <!-- span class="wrm-green">https</span><span class="wrm-dark-gray">://{{domain}}</span -->
      <span class="wrm-dark-gray">{{domain}}</span>
    </span>
    <span v-else>
      <span class="wrm-dark-gray">{{origin}}</span>
    </span>
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2017-2021, Digital Bazaar, Inc.
 * All rights reserved.
 */
export default {
  name: 'WrmOrigin',
  computed: {
    domain() {
      // origin should always start with `https://`
      if(this.origin.startsWith('https://')) {
        return this.origin.substr(8);
      }
      return null;
    }
  },
  props: {
    origin: {
      type: String,
      required: true
    }
  }
};
</script>
<style>
</style>
