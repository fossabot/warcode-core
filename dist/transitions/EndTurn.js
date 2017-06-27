'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  return {
    guard: function guard(_ref) {
      var type = _ref.type;
      return type === _constants.ACTIONS.END_TURN;
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};

var _constants = require('../constants');