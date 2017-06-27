'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;

  var isGameOver = function isGameOver() {
    return territories.every(function (t) {
      return t.owner === currentPlayerIndex;
    });
  };

  return {
    guard: function guard(_ref) {
      var type = _ref.type;
      return type === _constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT && territories.filter(function (c) {
        return c.owner === currentPlayerIndex;
      }).length > 5 && !isGameOver();
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};

var _constants = require('../constants');