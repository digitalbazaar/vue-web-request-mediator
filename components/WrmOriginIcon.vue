<template>
  <span>
    <i
      v-if="iconType === 'default'"
      style="vertical-align: middle"
      :style="{'font-size': iconPixelSize}"
      :class="defaultIcon" />
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
import {computed, ref, toRef, watch} from 'vue';
import {getWebAppManifestIcon} from '../lib/manifest.js';

export default {
  name: 'WrmOriginIcon',
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
      required: false,
      default: null
    }
  },
  setup(props) {
    const iconType = ref('manifest');
    const iconSize = toRef(props, 'iconSize');
    const origin = toRef(props, 'origin');
    const manifest = toRef(props, 'manifest');

    const favicon = computed(() => {
      if(iconType.value === 'default') {
        iconType.value = 'favicon';
      }
      return `${origin.value}/favicon.ico`;
    });
    const icon = computed(() => {
      const icon = getWebAppManifestIcon({
        manifest: manifest.value,
        origin: origin.value,
        size: iconSize.value
      });
      if(!icon) {
        iconType.value = 'favicon';
        return favicon.value;
      }
      iconType.value = 'manifest';
      return icon.value.src;
    });
    const iconPixelSize = computed(() => iconSize.value + 'px');

    const imageError = event => {
      iconType.value = event.target.src === favicon.value ?
        'default' : 'favicon';
    };

    // FIXME: this comment is from the vue 2 implementation; check in vue 3:
    // this watch appears to be required to trigger loading proper image,
    // `computed` icon is insufficient
    watch(manifest, () => iconType.value = 'manifest');

    return {icon, iconPixelSize, imageError};
  }
};
</script>

<style>
</style>
