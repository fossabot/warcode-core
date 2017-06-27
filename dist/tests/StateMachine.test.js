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

var matchConfig = (0, _MatchConfig2.default)(_config2.default);
var stateMachine = new _StateMachine2.default(matchConfig);

test('test transitions through initial games setup moves', function () {
  var actionsAndExpectations = [[_actionCreators2.default.startMatch(2), _constants.STATES.SELECTING_FIRST_PLAYER], [_actionCreators2.default.selectFirstPlayer(0), _constants.STATES.OCCUPYING, 0], [_actionCreators2.default.occupyTerritory(0), _constants.STATES.OCCUPYING], [_actionCreators2.default.occupyTerritory(1), _constants.STATES.OCCUPYING], [_actionCreators2.default.occupyTerritory(2), _constants.STATES.OCCUPYING], [_actionCreators2.default.occupyTerritory(3), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(0), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(1), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(2), _constants.STATES.PLACING_ADDITIONAL_ARMY], [_actionCreators2.default.placeAdditionalArmy(3), _constants.STATES.PLACING_NEW_ARMIES], [_actionCreators2.default.placeNewArmies(0, 3), _constants.STATES.BATTLING], [_actionCreators2.default.endAttack(), _constants.STATES.FORTIFYING], [_actionCreators2.default.endTurn(), _constants.STATES.PLACING_NEW_ARMIES]];

  actionsAndExpectations.reduce(function (state, _ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        action = _ref2[0],
        expectedStateKey = _ref2[1],
        currentPlayerIndex = _ref2[2];

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

  actionsAndExpectations.reduce(function (state, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        action = _ref4[0],
        expectedStateKey = _ref4[1];

    var nextState = stateMachine.reduce(state, action);
    (0, _expect2.default)(nextState.stateKey).toEqual(expectedStateKey);
    return nextState;
  }, stateMachine.reduce());
});