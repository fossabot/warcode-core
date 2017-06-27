'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var players = extendedState.players,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    guard: function guard(_ref) {
      var type = _ref.type;
      return type === _constants.ACTIONS.PLACE_NEW_ARMIES && players[currentPlayerIndex].undeployedArmies >= 1;
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};

var _constants = require('../constants');