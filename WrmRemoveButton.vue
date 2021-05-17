<template>
  <div
    :class="buttonClass"
    @click="!disabled && clicked()">
    <div>
      <svg :class="anyDisabled ? 'wrm-disabled' : ''">
        <circle cx="14" cy="14" r="14" />
        <text x="7" y="19">{{icon}}</text>
      </svg>
    </div>
    <div style="float: none; font-size: 10px; text-align: center">
      {{iconText}}
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
      default: false
    },
    cancelTimeout: {
      type: Number,
      // 5 seconds to cancel `remove` by default
      default: 5000
    },
    removeText: {
      type: String,
      default: ''
    },
    undoText: {
      type: String,
      default: 'Undo'
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
      // f0e2 == fa-undo
      // f056 == fa-minus-circle
      return this.removing ? '\uf0e2' : '\uf056';
    },
    iconText() {
      return this.removing ? this.undoText : this.removeText;
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
        this.resolveRemove = resolve;
        this.timeoutId = setTimeout(resolve, this.cancelTimeout);
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
