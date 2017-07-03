'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var cardOwner = _ref.cardOwner,
      capturedTerritories = _ref.capturedTerritories;
  return {
    guard: function guard() {
      return capturedTerritories > 0 && cardOwner.some(function (owner) {
        return owner !== undefined;
      });
    },
    reduce: function reduce() {}
  };
};