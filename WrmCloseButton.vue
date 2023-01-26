<template>
  <div class="wrm-close-button">
    <div>
      <svg>
        <circle cx="9.5" cy="9.5" r="12" />
        <path d="M5, 5, 14, 14" />
        <path d="M5, 14, 14, 5" />
      </svg>
    </div>
  </div>
</template>

<script>
/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018-2023, Digital Bazaar, Inc.
 * All rights reserved.
 */
export default {
  name: 'WrmCloseButton',
  emits: ['click']
};
</script>

<style>
</style>
