'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories;


  return {
    guard: function guard(_ref) {
      var type = _ref.type;
      return (type === _constants.ACTIONS.SELECT_FIRST_PLAYER || _constants.ACTIONS.OCCUPY_TERRITORY) && territories.some(function (t) {
        return t.armies === 0;
      });
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};

var _constants = require('../constants');