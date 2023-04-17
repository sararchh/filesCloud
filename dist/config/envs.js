"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _dotenvexpand = require('dotenv-expand'); var _dotenvexpand2 = _interopRequireDefault(_dotenvexpand);

function loadEnv() {
  const path =
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : process.env.NODE_ENV === "development"
        ? ".env.development"
        : ".env";

  const currentEnvs = _dotenv2.default.config({ path });
  _dotenvexpand2.default.expand(currentEnvs);
}

module.exports = loadEnv;