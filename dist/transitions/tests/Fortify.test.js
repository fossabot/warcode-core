'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../../constants');

var _Fortify = require('../Fortify');

var _Fortify2 = _interopRequireDefault(_Fortify);

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
    owner: 0,
    armies: 3
  }],
  players: [{
    undeployedArmies: 0
  }, {
    undeployedArmies: 0
  }]
};

test('guard checks capture parameters', function () {
  var transition = new _Fortify2.default(matchConfig, matchExtendedState);
  var actions = [[_actionCreators2.default.fortify(1, 2, 1), true], [_actionCreators2.default.fortify(1, 2, 0), false], [_actionCreators2.default.fortify(1, 2, 6), false], [_actionCreators2.default.fortify(2, 1, 1), true], [_actionCreators2.default.fortify(0, 1, 1), false], [_actionCreators2.default.fortify(1, 0, 1), false]];
  actions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    (0, _expect2.default)(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', function () {
  var transition = new _Fortify2.default(matchConfig, matchExtendedState);
  var armiesToMove = 3;
  var from = 1;
  var to = 2;
  var action = _actionCreators2.default.fortify(from, to, armiesToMove);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.territories[from].armies).toBe(matchExtendedState.territories[from].armies - armiesToMove);
  (0, _expect2.default)(n.territories[to].armies).toBe(matchExtendedState.territories[to].armies + armiesToMove);
});