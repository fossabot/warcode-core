'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionCreators = require('./actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _constants = require('./constants');

var _MatchConfig = require('./MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _StateMachine = require('./StateMachine');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default();
var stateMachine = new _StateMachine2.default(matchConfig);

exports.default = {
  actionCreators: _actionCreators2.default,
  isActionValid: stateMachine.isActionValid,
  reduce: stateMachine.reduce,
  ACTIONS: _constants.ACTIONS,
  STATES: _constants.STATES,
  PSEUDOSTATES: _constants.PSEUDOSTATES
};