<template>
  <div class="wrm-flex-column-stretch">
    <div class="wrm-flex-column-stretch wrm-flex-item-grow">
      <div class="wrm-flex-item" v-for="hint in hints"
        @click="!selectedHint && select(hint)">
        <wrm-hint
          :hint="hint"
          :default-icon="defaultHintIcon"
          :active="activateOnSelect && selectedHint === hint"
          :selected="selectedHint === hint"
          :selectable="true"
          :disabled="selectedHint && selectedHint !== hint">
        </wrm-hint>
      </div>
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

import WrmHint from './WrmHint.vue';

export default {
  name: 'WrmHintList',
  components: {WrmHint},
  props: {
    hints: {
      type: Array,
      required: true
    },
    defaultHintIcon: {
      type: String,
      required: true
    },
    activateOnSelect: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      selectedHint: null
    };
  },
  methods: {
    async select(hint) {
      this.selectedHint = hint;
      try {
        // wait for selection to be handled
        await this.onSelect({hint});
      } catch(e) {
        console.error(e);
      }
      this.selectedHint = null;
    }
  }
};
</script>
<style>
</style>
