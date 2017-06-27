'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle;

  return {
    guard: function guard(_ref) {
      var type = _ref.type;
      return type === _constants.ACTIONS.ROLL_DICE && !!activeBattle && territories[activeBattle.defendingTerritoryIndex].armies === 0;
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};

var _constants = require('../constants');