'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var cardOwner = _ref.cardOwner,
      territories = _ref.territories,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard() {
      return cardOwner.filter(function (c) {
        return c === currentPlayerIndex;
      }).length > 5 && territories.some(function (t) {
        return t.owner !== currentPlayerIndex;
      });
    }, // hasn't won
    reduce: function reduce() {}
  };
};