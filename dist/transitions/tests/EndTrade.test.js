'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _constants = require('../../constants');

var _EndTrade = require('../EndTrade');

var _EndTrade2 = _interopRequireDefault(_EndTrade);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = (0, _MatchConfig2.default)(_config2.default);
var currentPlayerIndex = 0;
var matchExtendedState = {
  stateKey: _constants.STATES.BATTLING,
  currentPlayerIndex: currentPlayerIndex,
  territories: [{
    owner: 1,
    armies: 3
  }, {
    owner: 0,
    armies: 6
  }, {
    owner: 0,
    armies: 3
  }],
  players: [{
    undeployedArmies: 0
  }, {
    undeployedArmies: 0
  }],
  cardOwner: Array(5).fill(currentPlayerIndex),
  capturedTerritories: 0,
  tradeCount: 0,
  activeBattle: undefined
};

test('guard checks card count', function () {
  var transition = (0, _EndTrade2.default)(matchConfig, matchExtendedState, _constants.ACTIONS.END_TRADE);
  var action = _actionCreators2.default.endTrade();
  (0, _expect2.default)(transition.guard(action)).toEqual(false);
});

test('reduce updates state', function () {
  var transition = (0, _EndTrade2.default)(matchConfig, matchExtendedState, _constants.ACTIONS.END_TRADE);
  var action = _actionCreators2.default.endTrade();
  var n = Object.assign({}, matchExtendedState, transition.reduce(action));

  (0, _expect2.default)(n.stateKey).toBe(_constants.STATES.BATTLING);
});