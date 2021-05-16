<template>
  <div class="wrm-checkbox"
    :class="checkboxClass"
    :style="checkboxStyle">
    <label>
      <input type="checkbox" :checked="value" :disabled="disabled"
        :style="checkboxStyle" @input="toggle">
      <span class="wrm-label" :class="labelClass"
        :style="labelStyle">{{label}}</span>
    </label>
  </div>
</template>
<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018-2021, Digital Bazaar, Inc.
 * All rights reserved.
 */
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
    disabled: {
      type: Boolean,
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
    labelStyle: {
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
