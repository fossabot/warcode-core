'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _constants = require('../../constants');

var _Battle = require('../Battle');

var _Battle2 = _interopRequireDefault(_Battle);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

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

test('guard checks player and territory', function () {
  var transition = new _Battle2.default(matchConfig, matchExtendedState);

  [[_actionCreators2.default.battle(1, 0, 3), true], [_actionCreators2.default.battle(1, 0, 4), false], [_actionCreators2.default.battle(0, 1, 3), false], [_actionCreators2.default.battle(1, 2, 0), false], [_actionCreators2.default.battle(1, 2, 1), true], [_actionCreators2.default.battle(1, 2, 2), true], [_actionCreators2.default.battle(1, 2, 3), true], [_actionCreators2.default.battle(1, 2, 4), false]].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    return (0, _expect2.default)(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', function () {
  var attackingTerritoryIndex = 1;
  var defendingTerritoryIndex = 0;
  var attackingDiceCount = 3;
  var transition = new _Battle2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.battle(attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.activeBattle).toExist().toInclude({ attackingTerritoryIndex: attackingTerritoryIndex, defendingTerritoryIndex: defendingTerritoryIndex, attackingDiceCount: attackingDiceCount });
  (0, _expect2.default)(n.territories[attackingTerritoryIndex]).toInclude(matchExtendedState.territories[attackingTerritoryIndex]);
  (0, _expect2.default)(n.territories[defendingTerritoryIndex]).toInclude(matchExtendedState.territories[defendingTerritoryIndex]);
});