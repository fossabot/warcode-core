'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _constants = require('../../constants');

var _StartMatch = require('../StartMatch');

var _StartMatch2 = _interopRequireDefault(_StartMatch);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = (0, _MatchConfig2.default)();
var matchExtendedState = {
  stateKey: _constants.STATES.INITIALIZING
};

test('guard validates player count', function () {
  var tryValue = function tryValue(playerCount) {
    var transition = new _StartMatch2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.startMatch(playerCount);
    return transition.guard(action);
  };

  (0, _expect2.default)(tryValue(undefined)).toBe(false);
  (0, _expect2.default)(tryValue(matchConfig.minPlayers - 1)).toBe(false);
  (0, _expect2.default)(tryValue(matchConfig.maxPlayers + 1)).toBe(false);
  (0, _expect2.default)(tryValue(matchConfig.minPlayers)).toBe(true);
  (0, _expect2.default)(tryValue(matchConfig.maxPlayers)).toBe(true);
});

test('reduce creates valid initial state', function () {
  var playerCount = 5;
  var transtion = new _StartMatch2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.startMatch(playerCount);
  var n = transtion.reduce(action);

  (0, _expect2.default)(n.territories.length).toBe(matchConfig.territories.length);
  (0, _expect2.default)(n.territories[0].owner).toNotExist('territory not unoccupied');
  (0, _expect2.default)(n.territories[0].armies).toBe(0, 'territory armies should be zero');

  (0, _expect2.default)(n.cardOwner.length).toBe(matchConfig.cards.length, 'card length should match');
  (0, _expect2.default)(n.cardOwner[0]).toNotExist('card should be unowned');

  (0, _expect2.default)(n.players.length).toBe(playerCount);
  (0, _expect2.default)(n.players[0].undeployedArmies).toBe(matchConfig.startingArmiesByPlayers[playerCount]);

  (0, _expect2.default)(n.currentPlayerIndex).toBe(-1);
  (0, _expect2.default)(n.tradeCount).toBe(0);
  (0, _expect2.default)(n.capturedTerritories).toBe(0);
});