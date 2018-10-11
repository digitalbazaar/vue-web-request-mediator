<template>
  <div class="wrm-ellipsis">
    <slot name="task"></slot>
    <div>
      <strong>{{name}}</strong>
    </div>
    <wrm-origin :origin="origin" />
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2017-2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

import WrmOrigin from './WrmOrigin.vue';

export default {
  name: 'WrmOriginName',
  components: {WrmOrigin},
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
