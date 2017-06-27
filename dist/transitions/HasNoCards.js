'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var cardOwner = extendedState.cardOwner,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    guard: function guard() {
      return cardOwner.every(function (o) {
        return o !== currentPlayerIndex;
      });
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};