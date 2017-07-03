'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var territories = _ref.territories;
  return {
    guard: function guard() {
      return territories.some(function (t) {
        return t.armies === 0;
      });
    },
    reduce: function reduce() {}
  };
};