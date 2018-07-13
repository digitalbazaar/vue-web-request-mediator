/*!
 * Vue Web Request Mediator Components.
 *
 * New BSD License (3-clause)
 * Copyright (c) 2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

import WrmHintChooser from './WrmHintChooser.vue';
import WrmPermissionDialog from './WrmPermissionDialog.vue';
export {requestStorageAccess} from './storageAccess.js';

export function install(Vue, options) {
  Vue.component('wrm-hint-chooser', WrmHintChooser);
  Vue.component('wrm-permission-dialog', WrmPermissionDialog);
}
