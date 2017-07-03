'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**

 * You end the turn, ending fortification.
 */
exports.default = function () {
  return {
    guard: function guard() {
      return true;
    },
    reduce: function reduce() {}
  };
};