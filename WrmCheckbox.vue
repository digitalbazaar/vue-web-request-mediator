<template>
  <div class="wrm-checkbox"
    v-bind:class="checkboxClass"
    v-bind:style="checkboxStyle">
    <label>
      <input type="checkbox" :value="value" @input="toggle">
      <span class="wrm-label" v-bind:class="labelClass">{{label}}</span>
    </label>
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

export default {
  name: 'WrmCheckbox',
  props: {
    checkboxClass: {
      type: String,
      required: false
    },
    checkboxStyle: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    labelClass: {
      type: String,
      required: false
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggle(event) {
      this.$emit('input', event.target.checked);
    }
  }
};
</script>
<style>
</style>
