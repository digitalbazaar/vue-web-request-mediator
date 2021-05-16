<template>
  <div
    :class="buttonClass"
    @click="!disabled && clicked()">
    <div>
      <svg :class="anyDisabled ? 'wrm-disabled' : ''">
        <circle cx="14" cy="14" r="14" />
        <text x="8" y="19">{{icon}}</text>
      </svg>
    </div>
    <div
      v-if="removing"
      style="float: none; font-size: 10px; text-align: center">Undo</div>
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
      if(this.anyDisabled) {
        classes.push('wrm-disabled');
      }
      return classes.join(' ');
    },
    icon() {
      // f829 == fa-trash-restore
      // f1f8 == fa-trash
      return this.removing ? '\uf829' : '\uf1f8';
    },
    anyDisabled() {
      return this.disabled || this.canceling;
    }
  },
  data() {
    return {
      canceling: false,
      removing: false,
      timeoutId: null,
      resolveRemove: null
    };
  },
  methods: {
    async clicked() {
      // already removing, cancel
      if(this.removing) {
        this.removing = false;
        clearTimeout(this.timeoutId);
        this.resolveRemove();

        this.canceling = true;
        try {
          await this.onCancel();
        } catch(e) {
          console.error(e);
        } finally {
          this.removing = false;
          this.canceling = false;
        }
        return;
      }

      this.removing = true;

      // indicate confirmation period as started
      try {
        await this.onConfirm();
      } catch(e) {
        console.error(e);
        // return early, remove confirmation event failed
        this.removing = false;
        return;
      }

      await new Promise(resolve => {
        // 5 seconds to cancel `remove`; could make a `prop` in the future
        this.resolveRemove = resolve;
        this.timeoutId = setTimeout(resolve, 5000);
      });

      // if not canceled during waitin period, proceed
      if(this.removing) {
        this.localDisabled = true;
        try {
          await this.onRemove();
        } catch(e) {
          console.error(e);
        } finally {
          this.removing = false;
          this.localDisabled = false;
        }
      }
    },
    async onConfirm() {
      let promise = Promise.resolve();
      this.$emit('confirm', {
        waitUntil: p => promise = p
      });
      return promise;
    },
    async onCancel() {
      let promise = Promise.resolve();
      this.$emit('cancel', {
        waitUntil: p => promise = p
      });
      return promise;
    },
    async onRemove() {
      let promise = Promise.resolve();
      this.$emit('remove', {
        waitUntil: p => promise = p
      });
      return promise;
    }
  }
};
</script>

<style>
</style>
