/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = function (configObj) {
  return new Promise((resolve, reject) => {

    try {
      console.log("Running before_build hook.");

      console.log("copying CCA components from amp-shared-components");
      const destDir = path.join(__dirname, "../../src/ts/jet-composites");
      const srcDir = path.join(__dirname, "../../../amp-shared-components/src/ts/jet-composites");
      fs.copySync(srcDir, destDir, { overwrite: true, errorOnExist: false });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
