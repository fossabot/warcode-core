'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _constants = require('../../constants');

var _SelectFirstPlayer = require('../SelectFirstPlayer');

var _SelectFirstPlayer2 = _interopRequireDefault(_SelectFirstPlayer);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = (0, _MatchConfig2.default)();

var matchExtendedState = {
  stateKey: _constants.STATES.SELECT_FIRST_PLAYER,
  players: [{
    undeployedArmies: 1
  }, {
    undeployedArmies: 0
  }]
};

test('guard validates first player index', function () {
  var tryValue = function tryValue(firstPlayerIndex) {
    var transition = new _SelectFirstPlayer2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.selectFirstPlayer(firstPlayerIndex);
    return transition.guard(action);
  };

  var maxPlayerIndex = matchConfig.maxPlayers - matchConfig.minPlayers - 1;

  (0, _expect2.default)(tryValue(undefined)).toBe(false);
  (0, _expect2.default)(tryValue(-1)).toBe(false);
  (0, _expect2.default)(tryValue(0)).toBe(true);
  (0, _expect2.default)(tryValue(maxPlayerIndex - 1)).toBe(true);
  (0, _expect2.default)(tryValue(maxPlayerIndex)).toBe(false);
});

test('reduce creates valid initial state', function () {
  var transition = new _SelectFirstPlayer2.default(matchConfig, matchExtendedState);
  var firstPlayerIndex = 0;
  var action = _actionCreators2.default.selectFirstPlayer(firstPlayerIndex);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.currentPlayerIndex).toBe(firstPlayerIndex);
});