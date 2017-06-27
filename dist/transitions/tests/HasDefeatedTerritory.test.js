'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _HasDefeatedTerritory = require('../HasDefeatedTerritory');

var _HasDefeatedTerritory2 = _interopRequireDefault(_HasDefeatedTerritory);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = (0, _MatchConfig2.default)(_config2.default);
var matchExtendedState = {
  stateKey: _constants.STATES.BATTLING,
  currentPlayerIndex: 0,
  territories: [{
    owner: 1,
    armies: 3
  }, {
    owner: 0,
    armies: 6
  }, {
    owner: 1,
    armies: 3
  }],
  players: [{
    undeployedArmies: 0
  }, {
    undeployedArmies: 0
  }]
};
// TODO - try handling of incorrect action with deployed armies
// TODO - try 0 undeployed armiesS
// TODO - try correct type and stateS

test('guard checks action', function () {
  var transition = new _HasDefeatedTerritory2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.startMatch(5);
  (0, _expect2.default)(transition.guard(action)).toEqual(false);
});

test('guard checks that player has deployed all their armies', function () {
  var transition = new _HasDefeatedTerritory2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.rollDice(2, 2);
  (0, _expect2.default)(transition.guard(action)).toEqual(false);
});