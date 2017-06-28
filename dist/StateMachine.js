'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('./constants');

var _transitions = require('./transitions/');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @return {{nextStateKey: string, reduce: Function}} transition object, may to pseudostate
var getTransition = function getTransition(matchConfig, extendedState, action) {
  var fromCurrentState = _transitions2.default.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        from = _ref2[0];

    return from === extendedState.stateKey;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 4),
        from = _ref4[0],
        to = _ref4[1],
        t = _ref4[2],
        a = _ref4[3];

    return [from, to, t(matchConfig, extendedState, a)];
  });

  // get transitions that could be followed from the current state
  var guardSatisfied = fromCurrentState.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 3),
        guard = _ref6[2].guard;

    return typeof guard === 'function' && guard(action) === true;
  });

  var elses = fromCurrentState.filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 3),
        guard = _ref8[2].guard;

    return guard === undefined;
  });

  // quit when there path is indeterminant, meaning there are multiple transitions
  if (guardSatisfied.length > 1 || elses.length > 1) {
    // there is an error in the state machine
    // console.error(`nondeterministic state`);
    return undefined;
  }

  // stop when blocked by transition guards
  var nextTranstion = guardSatisfied[0] || elses[0];

  if (nextTranstion) {
    var _nextTranstion = _slicedToArray(nextTranstion, 3),
        nextStateKey = _nextTranstion[1],
        _reduce = _nextTranstion[2].reduce;

    return { nextStateKey: nextStateKey, reduce: function reduce() {
        return _reduce(action);
      } };
  }

  return undefined;
};

var intialState = { stateKey: _constants.STATES.INITIALIZING };

var _reduce2 = function _reduce2(matchConfig) {
  var extendedState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : intialState;
  var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var ttl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

  if (ttl < 1) {
    // console.error(`state machine entered a loop ${extendedState.stateKey}`);
    return extendedState;
  }

  var transition = getTransition(matchConfig, extendedState, action);

  // quit when reached final state / transition for the given action
  if (!transition) {
    return extendedState;
  }

  // return next state to transition to
  var nextState = Object.assign({}, transition.reduce(), { stateKey: transition.nextStateKey });

  return _reduce2(matchConfig, nextState, action, ttl - 1);
};

exports.default = function (matchConfig) {
  return {
    // TODO - note that the final, game winning action may be invalid
    isActionValid: function isActionValid(matchState, action) {
      return !Object.is(matchState, _reduce2(matchState, action));
    },
    reduce: function reduce(extendedState, action) {
      return _reduce2(matchConfig, extendedState, action);
    }
  };
};