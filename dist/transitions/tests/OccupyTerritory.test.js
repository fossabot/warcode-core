'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _constants = require('../../constants');

var _OccupyTerritory = require('../OccupyTerritory');

var _OccupyTerritory2 = _interopRequireDefault(_OccupyTerritory);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = (0, _MatchConfig2.default)();

var matchExtendedState = {
  stateKey: _constants.STATES.OCCUPYING,
  currentPlayerIndex: 0,
  territories: [{
    owner: undefined,
    armies: 0
  }, {
    owner: 0,
    armies: 1
  }, {
    owner: 1,
    armies: 1
  }],
  players: [{
    undeployedArmies: 1
  }, {
    undeployedArmies: 0
  }]
};

test('guard validates territory index', function () {
  var tryValue = function tryValue(territoryIndex) {
    var transition = new _OccupyTerritory2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.occupyTerritory(territoryIndex);
    return transition.guard(action);
  };

  (0, _expect2.default)(tryValue(undefined)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(-1)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(0)).toBe(true);
  (0, _expect2.default)(tryValue(1)).toBe(false, 'must be unoccupied');
  (0, _expect2.default)(tryValue(2)).toBe(false, 'must be unoccupied');
  (0, _expect2.default)(tryValue(3)).toBe(false, 'must be in range');
});

test('reduce updates player and territory', function () {
  var territoryIndex = 0;
  var transition = new _OccupyTerritory2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.occupyTerritory(territoryIndex);
  var n = transition.reduce(action);
  // console.log('matchExtendedState', JSON.stringify(matchExtendedState));
  // console.log('n', JSON.stringify(n));

  (0, _expect2.default)(n.territories[territoryIndex].owner).toBe(matchExtendedState.currentPlayerIndex);
  (0, _expect2.default)(n.territories[territoryIndex].armies).toBe(1);
  (0, _expect2.default)(n.players[matchExtendedState.currentPlayerIndex].undeployedArmies).toBe(matchExtendedState.players[matchExtendedState.currentPlayerIndex].undeployedArmies - 1);
  (0, _expect2.default)(n.players[1].undeployedArmies).toBe(matchExtendedState.players[1].undeployedArmies);
});