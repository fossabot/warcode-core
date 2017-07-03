'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var cardOwner = _ref.cardOwner,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard() {
      return cardOwner.every(function (o) {
        return o !== currentPlayerIndex;
      });
    },
    reduce: function reduce() {}
  };
};