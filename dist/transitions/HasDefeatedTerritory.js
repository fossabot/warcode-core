'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var territories = _ref.territories,
      activeBattle = _ref.activeBattle;
  return {
    guard: function guard() {
      return !!activeBattle && territories[activeBattle.defendingTerritoryIndex].armies === 0;
    },
    reduce: function reduce() {}
  };
};