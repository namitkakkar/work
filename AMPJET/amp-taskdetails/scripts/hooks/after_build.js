/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
    console.log("Running after_build hook.");

    try {
      console.log("Removing jet-composite directory");
      const compositeDir = path.join(__dirname, "../../src/ts/jet-composites");
      fs.removeSync(compositeDir);

      /*
      console.log("Replcaing service base URLs");
      const options = configObj.userOptions;
      let SOA_BASE_URL = "http://localhost:8010/proxy";
      let OSB_BASE_URL = "http://localhost:8010/proxy";
      let OHS_BASE_URL = "http://localhost:8010/proxy";
      let ORDS_BASE_URL = "http://localhost:8010/proxy";

      if (options) {
        const baseUrls = options.split("-$$-");
        SOA_BASE_URL = baseUrls[0];
        OSB_BASE_URL = baseUrls[1];
        OHS_BASE_URL = baseUrls[2];
      }
      const configPath = path.join(__dirname, "../../web/js/Configure.js");
      let config = fs.readFileSync(configPath).toString();
      config = config.replace("$$SERVICE_SOA_BASE_URL$$", SOA_BASE_URL);
      config = config.replace("$$SERVICE_OSB_BASE_URL$$", OSB_BASE_URL);
      config = config.replace("$$SERVICE_OHS_BASE_URL$$", OHS_BASE_URL);
      fs.writeFileSync(configPath, config);
      */

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
