<template>
  <div :class="hintClass" style="overflow: hidden">
    <i v-if="!hint.icon"
      :class="[defaultIcon, 'fas wrm-flex-item']"
      style="font-size: 48px"></i>
    <img v-if="hint.icon" :src="hint.icon.fetchedImage"
      crossorigin="anonymous"
      style="width: 48px; min-width: 48px; max-height: 48px"
      class="wrm-flex-item">
    <div
      style="margin-left: 10px; margin-top: 3px; align-items: start;
        overflow: hidden"
      class="wrm-flex-column wrm-flex-item-grow">
      <div class="wrm-flex-item-grow wrm-ellipsis" style="width: 100%">
        <strong style="font-size: 14px">{{hint.name}}</strong>
        <wrm-origin :origin="hint.origin" />
        <div style="margin-top: 3px">
          <strong v-if="hint.jit" style="font-size: 10px">
            Recommended by {{hint.jit.recommendedBy.name}}
          </strong>
        </div>
      </div>
      <wrm-activity-bar
        v-if="active"
        class="wrm-flex-item"
        style="margin-top: 1px" />
      <!-- ensure same spacing whether activity bar is present or not -->
      <div
        v-else
        class="wrm-activity-bar wrm-flex-item"
        style="visibility: hidden"></div>
    </div>
  </div>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
import WrmActivityBar from './WrmActivityBar.vue';
import WrmOriginName from './WrmOriginName.vue';

export default {
  name: 'WrmHint',
  components: {WrmActivityBar, WrmOriginName},
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
  },
  emits: ['click']
};
</script>

<style>
</style>
