'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransition = exports.transitions = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../constants');

var _StartMatch = require('./StartMatch');

var _StartMatch2 = _interopRequireDefault(_StartMatch);

var _SelectFirstPlayer = require('./SelectFirstPlayer');

var _SelectFirstPlayer2 = _interopRequireDefault(_SelectFirstPlayer);

var _OccupyTerritory = require('./OccupyTerritory');

var _OccupyTerritory2 = _interopRequireDefault(_OccupyTerritory);

var _PlaceAdditionalArmy = require('./PlaceAdditionalArmy');

var _PlaceAdditionalArmy2 = _interopRequireDefault(_PlaceAdditionalArmy);

var _SetupNextTurn = require('./SetupNextTurn');

var _SetupNextTurn2 = _interopRequireDefault(_SetupNextTurn);

var _TradeCards = require('./TradeCards');

var _TradeCards2 = _interopRequireDefault(_TradeCards);

var _EndTrade = require('./EndTrade');

var _EndTrade2 = _interopRequireDefault(_EndTrade);

var _PlaceNewArmies = require('./PlaceNewArmies');

var _PlaceNewArmies2 = _interopRequireDefault(_PlaceNewArmies);

var _EndAttack = require('./EndAttack');

var _EndAttack2 = _interopRequireDefault(_EndAttack);

var _Battle = require('./Battle');

var _Battle2 = _interopRequireDefault(_Battle);

var _RollDice = require('./RollDice');

var _RollDice2 = _interopRequireDefault(_RollDice);

var _Capture = require('./Capture');

var _Capture2 = _interopRequireDefault(_Capture);

var _Fortify = require('./Fortify');

var _Fortify2 = _interopRequireDefault(_Fortify);

var _EndTurn = require('./EndTurn');

var _EndTurn2 = _interopRequireDefault(_EndTurn);

var _DrawRandomCard = require('./DrawRandomCard');

var _DrawRandomCard2 = _interopRequireDefault(_DrawRandomCard);

var _HasPlacedArmies = require('./HasPlacedArmies');

var _HasPlacedArmies2 = _interopRequireDefault(_HasPlacedArmies);

var _HasNoCards = require('./HasNoCards');

var _HasNoCards2 = _interopRequireDefault(_HasNoCards);

var _HasDefeatedTerritory = require('./HasDefeatedTerritory');

var _HasDefeatedTerritory2 = _interopRequireDefault(_HasDefeatedTerritory);

var _IsGameOver = require('./IsGameOver');

var _IsGameOver2 = _interopRequireDefault(_IsGameOver);

var _HasPlayerEarnedCard = require('./HasPlayerEarnedCard');

var _HasPlayerEarnedCard2 = _interopRequireDefault(_HasPlayerEarnedCard);

var _HasTooManyCards = require('./HasTooManyCards');

var _HasTooManyCards2 = _interopRequireDefault(_HasTooManyCards);

var _IsUnoccupiedTerritory = require('./IsUnoccupiedTerritory');

var _IsUnoccupiedTerritory2 = _interopRequireDefault(_IsUnoccupiedTerritory);

var _HasUndeployedArmies = require('./HasUndeployedArmies');

var _HasUndeployedArmies2 = _interopRequireDefault(_HasUndeployedArmies);

var _NextPlayer = require('./NextPlayer');

var _NextPlayer2 = _interopRequireDefault(_NextPlayer);

var _Else = require('./Else');

var _Else2 = _interopRequireDefault(_Else);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A = _constants.ACTIONS;
var S = _constants.STATES;
var P = _constants.PSEUDOSTATES;

var transitions = exports.transitions = [[S.INITIALIZING, S.SELECTING_FIRST_PLAYER, _StartMatch2.default, A.START_MATCH], [S.SELECTING_FIRST_PLAYER, P.INITIAL_CHOICE, _SelectFirstPlayer2.default, A.SELECT_FIRST_PLAYER], [P.INITIAL_CHOICE, S.OCCUPYING, _IsUnoccupiedTerritory2.default], [P.INITIAL_CHOICE, S.PLACING_ADDITIONAL_ARMY, _Else2.default], [S.OCCUPYING, P.HAS_PLACED_ARMIES, _OccupyTerritory2.default, A.OCCUPY_TERRITORY], [S.PLACING_ADDITIONAL_ARMY, P.HAS_PLACED_ARMIES, _PlaceAdditionalArmy2.default, A.PLACE_ADDITIONAL_ARMY], [P.HAS_PLACED_ARMIES, P.INITIAL_CHOICE, _NextPlayer2.default], [P.HAS_PLACED_ARMIES, P.SETUP_NEXT_TURN, _HasPlacedArmies2.default], [P.SETUP_NEXT_TURN, P.HAS_CARDS, _SetupNextTurn2.default], [P.HAS_CARDS, S.TRADING_CARDS, _Else2.default], [P.HAS_CARDS, S.PLACING_NEW_ARMIES, _HasNoCards2.default], [S.TRADING_CARDS, P.HAS_CARDS, _TradeCards2.default, A.TRADING_CARDS], [S.TRADING_CARDS, S.PLACING_NEW_ARMIES, _EndTrade2.default, A.END_TRADE], [S.PLACING_NEW_ARMIES, P.HAS_UNDEPLOYED_ARMIES, _PlaceNewArmies2.default, A.PLACE_NEW_ARMIES], [P.HAS_UNDEPLOYED_ARMIES, S.PLACING_NEW_ARMIES, _HasUndeployedArmies2.default], [P.HAS_UNDEPLOYED_ARMIES, S.BATTLING, _Else2.default], [S.BATTLING, S.FORTIFYING, _EndAttack2.default, A.END_ATTACK], [S.BATTLING, S.ROLLING_DICE, _Battle2.default, A.BATTLE], [S.ROLLING_DICE, P.HAS_DEFEATED_TERRITORY, _RollDice2.default, A.ROLL_DICE], [P.HAS_DEFEATED_TERRITORY, S.BATTLING, _Else2.default], [P.HAS_DEFEATED_TERRITORY, S.CAPTURING, _HasDefeatedTerritory2.default], [S.CAPTURING, P.HAS_DEFEATED_OPPONENT, _Capture2.default, A.CAPTURE], [P.HAS_DEFEATED_OPPONENT, S.TRADING_CARDS, _HasTooManyCards2.default], [P.HAS_DEFEATED_OPPONENT, P.GAME_OVER, _IsGameOver2.default], [P.HAS_DEFEATED_OPPONENT, S.BATTLING, _Else2.default], [S.FORTIFYING, P.HAS_EARNED_CARD, _Fortify2.default, A.FORTIFY], [S.FORTIFYING, P.HAS_EARNED_CARD, _EndTurn2.default, A.END_TURN], [P.HAS_EARNED_CARD, S.DRAWING_RANDOM_CARD, _HasPlayerEarnedCard2.default], [P.HAS_EARNED_CARD, P.SETUP_NEXT_TURN, _Else2.default], [S.DRAWING_RANDOM_CARD, P.SETUP_NEXT_TURN, _DrawRandomCard2.default, A.DRAW_RANDOM_CARD]];

var getTransition = exports.getTransition = function getTransition(matchConfig, extendedState, action) {
  // get all transitions leaving the current state
  var fromCurrentState = transitions.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        from = _ref2[0];

    return from === extendedState.stateKey;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 4),
        from = _ref4[0],
        to = _ref4[1],
        t = _ref4[2],
        actionType = _ref4[3];

    var _t = t(matchConfig, extendedState, action),
        guard = _t.guard,
        reduce = _t.reduce;

    return { from: from, to: to, actionType: actionType, guard: guard, reduce: reduce };
  });

  // get transitions that match action and satisfy guards
  var guardSatisfied = fromCurrentState.filter(function (_ref5) {
    var actionType = _ref5.actionType,
        guard = _ref5.guard;
    return (actionType === undefined || actionType === action.type) && typeof guard === 'function' && guard(action) === true;
  });

  // return the transition with satisified guard condition
  if (guardSatisfied.length === 1) {
    return guardSatisfied[0];
  }

  if (guardSatisfied.length > 1) {
    // Either the action or the state machine is invalid. The state machine
    // should not allow for a given state and action to
    // satisfy the guards of more than one transition guard.
    return undefined;
  }

  // get transitions without guards
  var elses = fromCurrentState.filter(function (_ref6) {
    var actionType = _ref6.actionType,
        guard = _ref6.guard;
    return actionType === undefined && guard === undefined;
  });

  // return the else transition
  if (elses.length === 1) {
    return elses[0];
  }

  if (elses.length > 1) {
    // The state machine contains more than else transition from this state
    return undefined;
  }

  // No transitions remaining for this state and action
  return undefined;
};