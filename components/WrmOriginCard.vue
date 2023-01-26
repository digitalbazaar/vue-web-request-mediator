<template>
  <div class="wrm-flex-row">
    <wrm-origin-icon
      :icon-size="iconSize"
      :origin="origin"
      :manifest="manifest"
      style="padding-right: 10px" />
    <div class="wrm-flex-item-grow wrm-ellipsis">
      <wrm-origin-name
        v-if="manifest"
        :origin="origin"
        :manifest="manifest"
        class="wrm-flex-item-grow"
        style="padding-bottom: 2px; font-size: 14px">
        <template slot="task">
          <slot name="task" />
        </template>
      </wrm-origin-name>
      <wrm-origin :origin="origin" />
    </div>
  </div>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2017-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
import WrmOriginIcon from './WrmOriginIcon.vue';
import WrmOriginName from './WrmOriginName.vue';

export default {
  name: 'WrmOriginCard',
  components: {WrmOriginIcon, WrmOriginName},
  props: {
    iconSize: {
      type: Number,
      required: false,
      default: () => 48
    },
    origin: {
      type: String,
      required: true
    },
    manifest: {
      type: Object,
      required: false,
      default: null
    }
  }
};
</script>

<style>
</style>
