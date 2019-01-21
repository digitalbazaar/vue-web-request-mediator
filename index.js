/*!
 * Vue Web Request Mediator Components.
 *
 * New BSD License (3-clause)
 * Copyright (c) 2018-2019, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

export {getWebAppManifestIcon} from './manifest.js';

export function install(Vue, options) {
  Vue.component(
    'wrm-checkbox', () => import('./WrmCheckbox.vue'));
  Vue.component(
    'wrm-header-back-button', () => import('./WrmHeaderBackButton.vue'));
  Vue.component(
    'wrm-header-close-button', () => import('./WrmHeaderCloseButton.vue'));
  Vue.component(
    'wrm-hint-chooser', () => import('./WrmHintChooser.vue'));
  Vue.component(
    'wrm-origin', () => import('./WrmOrigin.vue'));
  Vue.component(
    'wrm-origin-card', () => import('./WrmOriginCard.vue'));
  Vue.component(
    'wrm-origin-icon', () => import('./WrmOriginIcon.vue'));
  Vue.component(
    'wrm-origin-name', () => import('./WrmOriginName.vue'));
  Vue.component(
    'wrm-permission-dialog', () => import('./WrmPermissionDialog.vue'));
  Vue.component(
    'wrm-wizard-dialog', () => import('./WrmWizardDialog.vue'));
}
