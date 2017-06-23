'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _constants = require('../../constants');

var _DrawRandomCard = require('../DrawRandomCard');

var _DrawRandomCard2 = _interopRequireDefault(_DrawRandomCard);

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
  cardOwner: Array(6).fill(undefined)
};

test('guard checks capture parameters', function () {
  var transition = new _DrawRandomCard2.default(matchConfig, matchExtendedState);
  var actions = [[_actionCreators2.default.drawRandomCard(-1), false], [_actionCreators2.default.drawRandomCard(0), true], [_actionCreators2.default.drawRandomCard(1), true], [_actionCreators2.default.drawRandomCard(2), true], [_actionCreators2.default.drawRandomCard(3), true], [_actionCreators2.default.drawRandomCard(4), true], [_actionCreators2.default.drawRandomCard(5), true], [_actionCreators2.default.drawRandomCard(6), false]];
  actions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    (0, _expect2.default)(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', function () {
  var transition = new _DrawRandomCard2.default(matchConfig, matchExtendedState);
  var cardIndex = 1;
  var action = _actionCreators2.default.drawRandomCard(cardIndex);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.cardOwner[cardIndex]).toBe(matchExtendedState.currentPlayerIndex);
  (0, _expect2.default)(n.cardOwner[0]).toBe(undefined);
});