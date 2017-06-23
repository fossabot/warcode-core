'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _constants = require('../constants');

var _actionCreators = require('../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _StateMachine = require('../StateMachine');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _MatchConfig = require('../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var matchConfig = (0, _MatchConfig2.default)(_config2.default);
var stateMachine = new _StateMachine2.default(matchConfig);
var transitions = stateMachine.getTransitions(stateMachine.reduce());
var setOfAllStateKeys = new Set([].concat(_toConsumableArray(transitions.map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      from = _ref2[0];

  return from;
})), _toConsumableArray(transitions.map(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      to = _ref4[1];

  return to;
}))));
var PSEUDOSTATES_VALUES = Object.keys(_constants.PSEUDOSTATES).map(function (key) {
  return _constants.PSEUDOSTATES[key];
});
var isPseudoState = function isPseudoState(stateValue) {
  return PSEUDOSTATES_VALUES.includes(stateValue);
};

test('transition states are valid and cover all states', function () {
  var expectedStateKeys = new Set([].concat(_toConsumableArray(_constants.STATES), _toConsumableArray(_constants.PSEUDOSTATES)));
  (0, _expect2.default)(setOfAllStateKeys).toMatch(expectedStateKeys);
});

test('pseudostates have single outbound else, without a guard or action', function () {
  var elseTransitionDesitinations = transitions.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 3),
        from = _ref6[0],
        t = _ref6[2];

    return isPseudoState(from) && t.guard === undefined && t.action === undefined;
  }).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        to = _ref8[1];

    return to;
  });

  (0, _expect2.default)(elseTransitionDesitinations.length).toEqual(new Set(elseTransitionDesitinations).size);
});

test('single initial state for state machine', function () {
  var stateHasInbound = new Set(transitions.map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        to = _ref10[1];

    return to;
  }));
  var difference = new Set([].concat(_toConsumableArray(setOfAllStateKeys)).filter(function (x) {
    return !stateHasInbound.has(x);
  }));
  (0, _expect2.default)(difference.size).toBe(1);
});

test('single final state', function () {
  var stateHasOutbound = new Set(transitions.map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 1),
        from = _ref12[0];

    return from;
  }));
  var difference = new Set([].concat(_toConsumableArray(setOfAllStateKeys)).filter(function (x) {
    return !stateHasOutbound.has(x);
  }));
  (0, _expect2.default)(difference.size).toBe(1);
});

test('test transitions through initial games setup moves', function () {
  var actionsAndExpectations = [[_actionCreators2.default.startMatch(2), _constants.STATES.SELECTING_FIRST_PLAYER], [_actionCreators2.default.selectFirstPlayer(0), _constants.STATES.OCCUPYING, 0], [_actionCreators2.default.occupyTerritory(0), _constants.STATES.OCCUPYING], [_actionCreators2.default.occupyTerritory(1), _constants.STATES.OCCUPYING], [_actionCreators2.default.occupyTerritory(2), _constants.STATES.OCCUPYING], [_actionCreators2.default.occupyTerritory(3), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(0), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(1), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(2), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(3), _constants.STATES.PLACING_NEW_ARMIES], [_actionCreators2.default.placeNewArmies(0, 3), _constants.STATES.BATTLING], [_actionCreators2.default.endAttack(), _constants.STATES.FORTIFYING], [_actionCreators2.default.endTurn(), _constants.STATES.PLACING_NEW_ARMIES]];

  actionsAndExpectations.reduce(function (state, _ref13) {
    var _ref14 = _slicedToArray(_ref13, 3),
        action = _ref14[0],
        expectedStateKey = _ref14[1],
        currentPlayerIndex = _ref14[2];

    var nextState = stateMachine.reduce(state, action);
    (0, _expect2.default)(nextState.stateKey).toEqual(expectedStateKey);
    if (Number.isInteger(currentPlayerIndex)) {
      (0, _expect2.default)(nextState.currentPlayerIndex).toEqual(currentPlayerIndex);
    }
    return nextState;
  }, stateMachine.reduce());
});

test('reducer ignores invalid actions', function () {
  var actionsAndExpectations = [[_actionCreators2.default.startMatch(matchConfig.minPlayers - 1), _constants.STATES.INITIALIZING], [_actionCreators2.default.startMatch(matchConfig.maxPlayers + 1), _constants.STATES.INITIALIZING]];

  actionsAndExpectations.reduce(function (state, _ref15) {
    var _ref16 = _slicedToArray(_ref15, 2),
        action = _ref16[0],
        expectedStateKey = _ref16[1];

    var nextState = stateMachine.reduce(state, action);
    (0, _expect2.default)(nextState.stateKey).toEqual(expectedStateKey);
    return nextState;
  }, stateMachine.reduce());
});