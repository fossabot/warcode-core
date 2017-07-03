'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * You may stop attacking opponent's territories at anytime.
 */
exports.default = function () {
  return {
    guard: function guard() {
      return true;
    },
    reduce: function reduce() {}
  };
};