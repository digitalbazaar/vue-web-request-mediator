<template>
  <div
    class="wrm-checkbox"
    :class="checkboxClass"
    :style="checkboxStyle">
    <label>
      <input
        type="checkbox"
        :checked="value"
        :disabled="disabled"
        :style="checkboxStyle"
        @input="toggle">
      <span
        class="wrm-label"
        :class="labelClass"
        :style="labelStyle">{{label}}</span>
    </label>
  </div>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
export default {
  name: 'WrmCheckbox',
  props: {
    checkboxClass: {
      type: String,
      required: false,
      default: ''
    },
    checkboxStyle: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    labelClass: {
      type: String,
      required: false,
      default: ''
    },
    labelStyle: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  emits: ['input'],
  setup(props, {emit}) {
    const toggle = event => {
      emit('input', event.target.checked);
    };
    return {toggle};
  }
};
</script>

<style>
</style>
