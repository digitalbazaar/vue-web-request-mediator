<template>
  <div class="wrm-flex-row">
    <wrm-origin-icon
      :icon-size="48"
      :origin="origin"
      :manifest="manifest"
      style="padding-right: 10px" />
    <wrm-origin-name
      :origin="origin"
      :manifest="manifest"
      class="wrm-flex-item-grow">
      <template slot="task">
        <slot name="task"></slot>
      </template>
    </wrm-origin-name>
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2017-2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

import WrmOriginIcon from './WrmOriginIcon.vue';
import WrmOriginName from './WrmOriginName.vue';

export default {
  name: 'WrmOriginCard',
  components: {WrmOriginIcon, WrmOriginName},
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
