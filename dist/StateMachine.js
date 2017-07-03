'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var _transitions = require('./transitions/');

var intialState = { stateKey: _constants.STATES.INITIALIZING };

// TODO - write reducer with debug
// MyAction: StartState->NextState->NextState

var _reduce = function _reduce(matchConfig) {
  var extendedState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : intialState;
  var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var ttl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

  if (ttl < 1) {
    // console.error(`state machine entered a loop ${extendedState.stateKey}`);
    return extendedState;
  }

  var transition = (0, _transitions.getTransition)(matchConfig, extendedState, action);

  // quit when reached final state / transition for the given action
  if (!transition) {
    return extendedState;
  }

  // return next state to transition to
  var nextState = Object.assign({}, extendedState, transition.reduce(action), { stateKey: transition.to });

  return _reduce(matchConfig, nextState, action, ttl - 1);
};

exports.default = function (matchConfig) {
  return {
    isActionValid: function isActionValid(matchState, action) {
      return !Object.is(matchState, _reduce(matchState, action));
    },
    reduce: function reduce(extendedState, action) {
      return _reduce(matchConfig, extendedState, action);
    }
  };
};