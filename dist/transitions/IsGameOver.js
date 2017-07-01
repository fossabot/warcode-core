'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;

  return {
    guard: function guard() {
      return territories.every(function (t) {
        return t.owner === currentPlayerIndex;
      });
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};