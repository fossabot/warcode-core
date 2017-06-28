'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import testConfig from './config.json';
// import StateMachine from '../../StateMachine';
// import parseMatchConfig from '../../MatchConfig';

// array contiain unqiue entries for each unique state and pseudostate value in game
var stateKeys = Array.from(new Set([].concat(_toConsumableArray(_2.default.map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      from = _ref2[0];

  return from;
})), _toConsumableArray(_2.default.map(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      to = _ref4[1];

  return to;
})))));

test('transition states are valid and cover all states', function () {
  var expectedStateKeys = Array.from(new Set([].concat(_toConsumableArray(Object.values(_constants.STATES)), _toConsumableArray(Object.values(_constants.PSEUDOSTATES)))));

  // Arrays of state keys from graph and contsants should have same values, though order may vary
  expect(stateKeys).toEqual(expect.arrayContaining(expectedStateKeys));
  expect(expectedStateKeys).toEqual(expect.arrayContaining(stateKeys));
});

test('single initial state for state machine', function () {
  var stateHasInbound = new Set(_2.default.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        to = _ref6[1];

    return to;
  }));
  var difference = new Set([].concat(_toConsumableArray(stateKeys)).filter(function (x) {
    return !stateHasInbound.has(x);
  }));
  expect(difference.size).toBe(1);
});

test('single final state', function () {
  // final states no outbound transitions
  var statesWithOutbound = new Set(_2.default.map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 1),
        from = _ref8[0];

    return from;
  })).size;
  var allStates = stateKeys.length;
  expect(allStates - statesWithOutbound).toBe(1);
});

test('actions are string or optional', function () {
  var actions = Object.values(_constants.ACTIONS);
  _2.default.forEach(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 4),
        action = _ref10[3];

    expect(action === undefined || actions.includes(action)).toBe(true);
  });
});

// test('pseudostates have single outbound else, without a guard or action', () => {
//   const config = parseMatchConfig(testConfig);
//   const initState = StateMachine(config).reduce();
//   const transitionsAtInit = transitions.map(([from, to, t]) => [from, to, t(config, initState)]);
//   const PSEUDOSTATES_VALUES = Object.keys(PSEUDOSTATES).map(key => PSEUDOSTATES[key]);
//   const elseTransitionDesitinations = transitionsAtInit
//     .filter(([from, , t]) => PSEUDOSTATES_VALUES.includes(from) && t.guard === undefined)
//     .map(([, to]) => to);
//
//   expect(elseTransitionDesitinations.length).toEqual(new Set(elseTransitionDesitinations).size);
// });