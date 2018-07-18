/*!
 * New BSD License (3-clause)
 * Copyright (c) 2018, Digital Bazaar, Inc.
 * All rights reserved.
 */
'use strict';

export async function requestStorageAccess() {
  try {
    if(typeof document.hasStorageAccess === 'function') {
      const result = await document.hasStorageAccess();
      if(!result) {
        await document.requestStorageAccess();
      }
    }
  } catch(e) {
    console.error(e);
  }
}
