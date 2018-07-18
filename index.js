/*!
 * Vue Web Request Mediator Components.
 *
 * New BSD License (3-clause)
 * Copyright (c) 2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

export {requestStorageAccess} from './storageAccess.js';

export function install(Vue, options) {
  Vue.component(
    'wrm-hint-chooser', () => import('./WrmHintChooser.vue'));
  Vue.component(
    'wrm-permission-dialog', () => import('./WrmPermissionDialog.vue'));
}
