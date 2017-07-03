'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var territories = _ref.territories,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard() {
      return territories.every(function (t) {
        return t.owner === currentPlayerIndex;
      });
    },
    reduce: function reduce() {}
  };
};