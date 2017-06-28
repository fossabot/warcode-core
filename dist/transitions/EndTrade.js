'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState, action) {
  var cardOwner = extendedState.cardOwner,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    action: action,
    guard: function guard(_ref) {
      var type = _ref.type;
      return type === action && cardOwner.filter(function (c) {
        return c === currentPlayerIndex;
      }).length < 5;
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};