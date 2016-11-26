'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = exports.isActionValid = exports.matchConfig = exports.actionCreators = exports.PSEUDOSTATES = exports.STATES = exports.ACTIONS = undefined;

var _constants = require('./constants');

Object.defineProperty(exports, 'ACTIONS', {
  enumerable: true,
  get: function get() {
    return _constants.ACTIONS;
  }
});
Object.defineProperty(exports, 'STATES', {
  enumerable: true,
  get: function get() {
    return _constants.STATES;
  }
});
Object.defineProperty(exports, 'PSEUDOSTATES', {
  enumerable: true,
  get: function get() {
    return _constants.PSEUDOSTATES;
  }
});

var _MatchConfig = require('./MatchConfig');

var _StateMachine = require('./StateMachine');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

var _actionCreators = require('./actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = (0, _MatchConfig.parseMatchConfig)();
var stateMachine = new _StateMachine2.default(matchConfig);

exports.actionCreators = _actionCreators2.default;
exports.matchConfig = matchConfig;
var isActionValid = exports.isActionValid = stateMachine.isActionValid;
var reduce = exports.reduce = stateMachine.reduce;