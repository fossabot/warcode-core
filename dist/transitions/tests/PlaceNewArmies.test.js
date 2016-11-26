'use strict';

var _constants = require('../../constants');

var _PlaceNewArmies = require('../PlaceNewArmies');

var _PlaceNewArmies2 = _interopRequireDefault(_PlaceNewArmies);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = (0, _MatchConfig.parseMatchConfig)();
var matchExtendedState = {
  stateKey: _constants.STATES.PLACING_NEW_ARMIES,
  currentPlayerIndex: 0,
  territories: [{
    owner: 1,
    armies: 1
  }, {
    owner: 0,
    armies: 1
  }, {
    owner: 1,
    armies: 1
  }],
  players: [{
    undeployedArmies: 3
  }, {
    undeployedArmies: 0
  }]
};

test('guard checks player and territory', function () {
  var tryValue = function tryValue(territoryIndex) {
    var transition = new _PlaceNewArmies2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.placeNewArmies(territoryIndex, 3);
    return transition.guard(action);
  };

  (0, _expect2.default)(tryValue(undefined)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(-1)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(0)).toBe(false, 'must be occupied by current player');
  (0, _expect2.default)(tryValue(1)).toBe(true);
  (0, _expect2.default)(tryValue(2)).toBe(false, 'must be occupied by current player');
  (0, _expect2.default)(tryValue(3)).toBe(false, 'must be in range');
});

test('reduce updates player and territory', function () {
  var territoryIndex = 0;
  var armies = 3;
  var transition = new _PlaceNewArmies2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.placeNewArmies(territoryIndex, armies);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.territories[territoryIndex].armies).toBe(matchExtendedState.territories[territoryIndex].armies + armies);
  (0, _expect2.default)(n.players[matchExtendedState.currentPlayerIndex].undeployedArmies).toBe(matchExtendedState.players[matchExtendedState.currentPlayerIndex].undeployedArmies - armies);
  (0, _expect2.default)(n.players[1].undeployedArmies).toBe(matchExtendedState.players[1].undeployedArmies);
});