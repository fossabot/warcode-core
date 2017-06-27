'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  return {
    guard: undefined,
    reduce: function reduce() {
      return extendedState;
    }
  };
};