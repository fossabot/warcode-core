'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../../constants');

var _RollDice = require('../RollDice');

var _RollDice2 = _interopRequireDefault(_RollDice);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default(_config2.default);
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
  }],
  activeBattle: {
    attackingTerritoryIndex: 1,
    defendingTerritoryIndex: 0,
    attackingDiceCount: 3
  }
};

test('guard checks player and territory', function () {
  var transition = new _RollDice2.default(matchConfig, matchExtendedState);
  var actions = [[_actionCreators2.default.rollDice([1, 2, 3], [1]), true], [_actionCreators2.default.rollDice([1, 2, 3], [1, 2]), true], [_actionCreators2.default.rollDice([0, 2, 3], [1, 2]), false], [_actionCreators2.default.rollDice([1, 2, 7], [1, 2]), false], [_actionCreators2.default.rollDice([1, 2, 3], [0, 2]), false], [_actionCreators2.default.rollDice([1, 2, 3], [1, 7]), false], [_actionCreators2.default.rollDice([1, 2, 3], [1, 2, 3]), false], [_actionCreators2.default.rollDice([1, 2, 3, 4], [1, 2]), false], [_actionCreators2.default.rollDice([1, 2], [1, 2]), false]];
  actions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    (0, _expect2.default)(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', function () {
  var _matchExtendedState$a = matchExtendedState.activeBattle,
      attackingTerritoryIndex = _matchExtendedState$a.attackingTerritoryIndex,
      defendingTerritoryIndex = _matchExtendedState$a.defendingTerritoryIndex;

  var transition = new _RollDice2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.rollDice([1, 2, 3], [1, 4]);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.activeBattle).toInclude(matchExtendedState.activeBattle);
  (0, _expect2.default)(n.territories[attackingTerritoryIndex].armies).toBe(matchExtendedState.territories[attackingTerritoryIndex].armies - 1);
  (0, _expect2.default)(n.territories[defendingTerritoryIndex].armies).toBe(matchExtendedState.territories[defendingTerritoryIndex].armies - 1);
});