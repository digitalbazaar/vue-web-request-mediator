<template>
  <div class="wrm-flex-row">
    <i
      v-if="iconType === 'default'"
      style="font-size: 48px; padding-right: 10px"
      class="fa fa-globe wrm-flex-item"></i>
    <img
      v-else
      :src="icon"
      style="width: 48px; max-height: 48px; padding-right: 10px"
      class="wrm-flex-item"
      @error="imageError">
    <div class="wrm-flex-item-grow">
      <div style="font-size: 14px">
        <div>
          <slot name="task"></slot>
        </div>
        <strong>{{name}}</strong>
      </div>
      <div class="wrm-flex-row"
        style="justify-content: flex-start; font-weight: bold">
        <i class="fa fa-lock wrm-flex-item wrm-green"
          style="padding-right: 2px"></i>
        <span v-if="domain">
          <span class="wrm-green">https</span><span class="wrm-dark-gray">://{{domain}}</span>
        </span>
        <span v-else>
          <span class="wrm-dark-gray">{{origin}}</span>
        </span>
      </div>
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

import {getWebAppManifestIcon} from './manifest.js';

const ICON_SIZE = 48;

export default {
  name: 'WrmOriginCard',
  computed: {
    domain() {
      // origin should always start with `https://`
      this.iconType = 'manifest';
      if(this.origin.startsWith('https://')) {
        return this.origin.substr(8);
      }
      return null;
    },
    favicon() {
      if(this.iconType === 'default') {
        this.iconType = 'favicon';
      }
      return `${this.origin}/favicon.ico`;
    },
    icon() {
      const {favicon, manifest, origin} = this;
      const icon = getWebAppManifestIcon({manifest, origin, size: ICON_SIZE});
      if(!icon) {
        this.iconType = 'favicon';
        return favicon;
      }
      this.iconType = 'manifest';
      return icon.src;
    },
    name() {
      if(!this.manifest) {
        return this.domain || this.origin;
      }
      const {name, short_name} = this.manifest;
      return name || short_name || this.domain || this.origin;
    }
  },
  data() {
    return {
      iconType: 'manifest'
    };
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
  },
  methods: {
    async imageError(event) {
      if(event.target.src === this.favicon) {
        this.iconType = 'default';
      } else {
        this.iconType = 'favicon';
      }
    }
  }
};
</script>
<style>
</style>
