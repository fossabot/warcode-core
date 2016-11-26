'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../constants');

var _actionCreators = require('../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _StateMachine = require('../StateMachine');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _MatchConfig = require('../MatchConfig');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var transitions = _StateMachine2.default.getEdges();
var foundStateKeys = function () {
  var keys = new Set();
  transitions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        from = _ref2[0],
        to = _ref2[1],
        label = _ref2[2];

    keys.add(from);
    keys.add(to);
  });
  return keys;
}();
var isPseudoState = function isPseudoState(stateValue) {
  var pseudostates = new Set();
  for (var k in _constants.PSEUDOSTATES) {
    pseudostates.add(_constants.PSEUDOSTATES[k]);
  }
  return function () {
    pseudostates.has(stateValue);
  };
};

test('transition states are valid and cover all states', function () {
  var expectedStateKeys = new Set([].concat(_toConsumableArray(_constants.STATES), _toConsumableArray(_constants.PSEUDOSTATES)));
  (0, _expect2.default)(foundStateKeys).toMatch(expectedStateKeys);
});

// test('states have outbound transition(s) with action', () => {
//   for (const from in STATES) {
//     const transition = transitions[STATES[from]];
//     for (const to in transition) {
//       expect(transition[to].action).toExist(`${STATES[from]} outbound transitions must have an action defined`);
//     }
//   }
// });

test('pseudostates have single outbound else, without a guard or action', function () {
  var elseCount = {};
  transitions.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 3),
        from = _ref4[0],
        to = _ref4[1],
        t = _ref4[2];

    if (isPseudoState(from) && t.guard === undefined && t.action === undefined) {
      elseCount[to] = elseCount[to] ? elseCount[to]++ : 1;
    }
  });

  var containsDuplicateElse = !!Object.keys(elseCount).find(function (k) {
    return elseCount[k] > 1;
  });

  (0, _expect2.default)(containsDuplicateElse).toBe(false);
});

test('single initial state', function () {
  var stateHasInbound = new Set(transitions.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        from = _ref6[0],
        to = _ref6[1];

    return to;
  }));
  var difference = new Set([].concat(_toConsumableArray(foundStateKeys)).filter(function (x) {
    return !stateHasInbound.has(x);
  }));
  (0, _expect2.default)(difference.size).toBe(1);
});

test('single final state', function () {
  var stateHasOutbound = new Set(transitions.map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        from = _ref8[0],
        to = _ref8[1];

    return from;
  }));
  var difference = new Set([].concat(_toConsumableArray(foundStateKeys)).filter(function (x) {
    return !stateHasOutbound.has(x);
  }));
  (0, _expect2.default)(difference.size).toBe(1);
});

test('test transitions through initial games setup moves', function () {
  var matchConfig = (0, _MatchConfig.parseMatchConfig)(_config2.default);
  var stateMachine = new _StateMachine2.default(matchConfig);
  var state = void 0;

  state = stateMachine.reduce();
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.INITIALIZING);

  state = stateMachine.reduce(state, _actionCreators2.default.startMatch(2));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.SELECTING_FIRST_PLAYER);

  state = stateMachine.reduce(state, _actionCreators2.default.selectFirstPlayer(0));
  (0, _expect2.default)(state.currentPlayerIndex).toEqual(0);
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.OCCUPYING);

  state = stateMachine.reduce(state, _actionCreators2.default.occupyTerritory(0));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.OCCUPYING);
  state = stateMachine.reduce(state, _actionCreators2.default.occupyTerritory(1));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.OCCUPYING);
  state = stateMachine.reduce(state, _actionCreators2.default.occupyTerritory(2));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.OCCUPYING);
  state = stateMachine.reduce(state, _actionCreators2.default.occupyTerritory(3));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.PLACING_ADDITIONAL_ARMY);

  state = stateMachine.reduce(state, _actionCreators2.default.placeAdditionalArmy(0));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.PLACING_ADDITIONAL_ARMY);
  state = stateMachine.reduce(state, _actionCreators2.default.placeAdditionalArmy(1));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.PLACING_ADDITIONAL_ARMY);
  state = stateMachine.reduce(state, _actionCreators2.default.placeAdditionalArmy(2));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.PLACING_ADDITIONAL_ARMY);
  state = stateMachine.reduce(state, _actionCreators2.default.placeAdditionalArmy(3));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.PLACING_NEW_ARMIES);

  var undeployedArmies = state.players[state.currentPlayerIndex].undeployedArmies;
  state = stateMachine.reduce(state, _actionCreators2.default.placeNewArmies(0, undeployedArmies));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.BATTLING);
  state = stateMachine.reduce(state, _actionCreators2.default.endAttack());
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.FORTIFYING);
  state = stateMachine.reduce(state, _actionCreators2.default.endTurn());
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.PLACING_NEW_ARMIES);

  // todo - battle
  // todo - roll dice
  // todo - foritify
});

test('reducer ignores invalid actions', function () {
  var matchConfig = (0, _MatchConfig.parseMatchConfig)(_config2.default);
  var stateMachine = new _StateMachine2.default(matchConfig);
  var state = void 0;

  state = stateMachine.reduce();
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.INITIALIZING);

  state = stateMachine.reduce(state, _actionCreators2.default.startMatch(matchConfig.minPlayers - 1));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.INITIALIZING);

  state = stateMachine.reduce(state, _actionCreators2.default.startMatch(matchConfig.maxPlayers + 1));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.INITIALIZING);
});