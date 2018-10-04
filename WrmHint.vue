<template>
  <div :class="hintClass">
    <i v-if="!hint.icon"
      :class="[defaultIcon, 'fa fa-pull-left wrm-flex-item']"
      style="padding-left: 8px; font-size: 32px"></i>
    <img v-if="hint.icon" :src="hint.icon.fetchedImage"
      style="width: 32px; max-height: 32px" class="wrm-flex-item">
    <div style="margin-left: 10px;" class="wrm-flex-item-grow">
      <strong>{{hint.name}}</strong>
      <h6>{{hint.origin}}</h6>
      <wrm-activity-bar v-if="active"></wrm-activity-bar>
      <!-- ensure same spacing whether activity bar is present or not -->
      <div v-else class="wrm-activity-bar" style="visibility: hidden"></div>
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

import WrmActivityBar from './WrmActivityBar.vue';

export default {
  name: 'WrmHint',
  components: {WrmActivityBar},
  props: {
    hint: {
      type: Object,
      required: true
    },
    defaultIcon: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    },
    selectable: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    hintClass() {
      const classes = ['wrm-flex-row', 'wrm-item'];
      if(this.disabled) {
        classes.push('wrm-disabled');
      } else if(this.selected) {
        classes.push('wrm-selected');
      } else if(this.selectable) {
        classes.push('wrm-selectable');
      }
      return classes.join(' ');
    }
  }
};
</script>
<style>
</style>
