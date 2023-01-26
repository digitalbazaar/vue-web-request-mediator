<template>
  <span>
    <i
      v-if="iconType === 'default'"
      style="vertical-align: middle"
      :style="{'font-size': iconPixelSize}"
      :class="defaultIcon"></i>
    <img
      v-else
      crossorigin="anonymous"
      style="vertical-align: middle"
      :src="icon"
      :style="{
        width: iconPixelSize,
        'min-width': iconPixelSize,
        'max-height': iconPixelSize
      }"
      @error="imageError">
  </span>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2017-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
import {getWebAppManifestIcon} from './manifest.js';

export default {
  name: 'WrmOriginIcon',
  computed: {
    favicon() {
      if(this.iconType === 'default') {
        this.iconType = 'favicon';
      }
      return `${this.origin}/favicon.ico`;
    },
    icon() {
      const {favicon, manifest, origin} = this;
      const icon = getWebAppManifestIcon(
        {manifest, origin, size: this.iconSize});
      if(!icon) {
        this.iconType = 'favicon';
        return favicon;
      }
      this.iconType = 'manifest';
      return icon.src;
    },
    iconPixelSize() {
      return this.iconSize + 'px';
    }
  },
  data() {
    return {
      iconType: 'manifest'
    };
  },
  props: {
    defaultIcon: {
      type: String,
      default: 'fas fa-globe'
    },
    iconSize: {
      type: Number,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    manifest: {
      type: Object,
      required: false
    }
  },
  methods: {
    async imageError(event) {
      if(event.target.src === this.favicon) {
        this.iconType = 'default';
      } else {
        this.iconType = 'favicon';
      }
    }
  },
  watch: {
    manifest() {
      // this watch appears to be required to trigger loading proper image,
      // `computed` icon is insufficient
      this.iconType = 'manifest';
    }
  }
};
</script>

<style>
</style>
