<template>
  <div :class="buttonClass">
    <div>
      <svg :class="disabled ? 'wrm-disabled' : ''">
        <circle cx="14" cy="14" r="14" />
        <!-- 0xf1f8 == fa-trash -->
        <text x="8" y="19">&#xf1f8;</text>
      </svg>
    </div>
  </div>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2021, Digital Bazaar, Inc.
 * All rights reserved.
 */
export default {
  name: 'WrmRemoveButton',
  props: {
    disabled: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    buttonClass() {
      const classes = ['wrm-remove-button'];
      if(this.disabled) {
        classes.push('wrm-disabled');
      }
      return classes.join(' ');
    }
  }
};
</script>

<style>
</style>
