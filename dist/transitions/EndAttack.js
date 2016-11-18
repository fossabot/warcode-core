'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var guard = function guard(action) {
    return true;
  };

  var reduce = function reduce(action) {
    return extendedState;
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.END_ATTACK, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }