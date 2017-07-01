'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var cardOwner = extendedState.cardOwner,
      capturedTerritories = extendedState.capturedTerritories;

  return {
    guard: function guard(_ref) {
      var type = _ref.type;
      return (type === _constants.ACTIONS.FORTIFY || type === _constants.ACTIONS.END_TURN) && capturedTerritories > 0 && cardOwner.some(function (owner) {
        return owner !== undefined;
      });
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};

var _constants = require('../constants');