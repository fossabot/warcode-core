'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * You may end trading as long as you hold four or fewer cards.
 */
exports.default = function (matchConfig, _ref) {
  var cardOwner = _ref.cardOwner,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard() {
      return cardOwner.filter(function (c) {
        return c === currentPlayerIndex;
      }).length < 5;
    },
    reduce: function reduce() {}
  };
};