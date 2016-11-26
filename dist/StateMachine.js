'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('./constants');

var _nextPlayerIndex = require('./transitions/nextPlayerIndex');

var _nextPlayerIndex2 = _interopRequireDefault(_nextPlayerIndex);

var _Transition = require('./transitions/Transition');

var _StartMatch = require('./transitions/StartMatch');

var _StartMatch2 = _interopRequireDefault(_StartMatch);

var _SelectFirstPlayer = require('./transitions/SelectFirstPlayer');

var _SelectFirstPlayer2 = _interopRequireDefault(_SelectFirstPlayer);

var _OccupyTerritory = require('./transitions/OccupyTerritory');

var _OccupyTerritory2 = _interopRequireDefault(_OccupyTerritory);

var _PlaceAdditionalArmy = require('./transitions/PlaceAdditionalArmy');

var _PlaceAdditionalArmy2 = _interopRequireDefault(_PlaceAdditionalArmy);

var _SetupNextTurn = require('./transitions/SetupNextTurn');

var _SetupNextTurn2 = _interopRequireDefault(_SetupNextTurn);

var _TradeCards = require('./transitions/TradeCards');

var _TradeCards2 = _interopRequireDefault(_TradeCards);

var _EndTrade = require('./transitions/EndTrade');

var _EndTrade2 = _interopRequireDefault(_EndTrade);

var _PlaceNewArmies = require('./transitions/PlaceNewArmies');

var _PlaceNewArmies2 = _interopRequireDefault(_PlaceNewArmies);

var _EndAttack = require('./transitions/EndAttack');

var _EndAttack2 = _interopRequireDefault(_EndAttack);

var _Battle = require('./transitions/Battle');

var _Battle2 = _interopRequireDefault(_Battle);

var _RollDice = require('./transitions/RollDice');

var _RollDice2 = _interopRequireDefault(_RollDice);

var _Capture = require('./transitions/Capture');

var _Capture2 = _interopRequireDefault(_Capture);

var _Fortify = require('./transitions/Fortify');

var _Fortify2 = _interopRequireDefault(_Fortify);

var _EndTurn = require('./transitions/EndTurn');

var _EndTurn2 = _interopRequireDefault(_EndTurn);

var _DrawRandomCard = require('./transitions/DrawRandomCard');

var _DrawRandomCard2 = _interopRequireDefault(_DrawRandomCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StateMachine(matchConfig) {
  // @return {{nextStateKey: string, reduce: Function}} transition object, may to pseudostate
  var getTransition = function getTransition(extendedState, action) {
    var allTransitions = getTransitions(extendedState);

    var fromCurrentState = allTransitions.filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          from = _ref2[0];

      return from === extendedState.stateKey;
    });

    var guardSatisfied = [];
    var guardUnsatisfied = [];
    var elses = [];

    fromCurrentState.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 3),
          from = _ref4[0],
          to = _ref4[1],
          t = _ref4[2];

      if (!t || typeof t.guard !== 'function' || typeof t.reduce !== 'function') {
        console.error(from, to, t);
      }
      var evaluated = t.guard(action);
      var result = {
        nextStateKey: to,
        reduce: function reduce(action) {
          return t.reduce.apply(t, [action]);
        } // bind method to object
      };

      if (evaluated === true) {
        guardSatisfied.push(result);
      } else if (evaluated === undefined) {
        elses.push(result);
      } else {
        guardUnsatisfied.push(result);
      }
    });

    // quit when there path is indeterminant, meaning there are multiple transitions
    if (guardSatisfied.length > 1 && elses.length > 1) {
      throw { message: 'nondeterministic state' };
    }

    // stop when blocked
    if (guardSatisfied.length === 0 && elses.length === 0) {
      return;
    }

    return guardSatisfied.length === 1 ? guardSatisfied[0] : elses[0];
  };

  var getTransitions = function getTransitions(extendedState) {
    var territories = extendedState.territories,
        cardOwner = extendedState.cardOwner,
        players = extendedState.players,
        currentPlayerIndex = extendedState.currentPlayerIndex,
        capturedTerritories = extendedState.capturedTerritories;


    var simpleGuard = function simpleGuard(guard) {
      return new _Transition.Transition(guard, function () {
        return extendedState;
      });
    };

    var elseTransition = function elseTransition() {
      return new _Transition.Transition(function () {
        return undefined;
      }, function () {
        return extendedState;
      });
    };

    var elseTransitionWithReducer = function elseTransitionWithReducer(reducer) {
      return new _Transition.Transition(function () {
        return undefined;
      }, reducer);
    };

    var reduceNextPlayer = function reduceNextPlayer() {
      return _extends({}, extendedState, {
        currentPlayerIndex: (0, _nextPlayerIndex2.default)(extendedState)
      });
    };

    var isUnoccupiedTerritory = function isUnoccupiedTerritory() {
      return territories.some(function (t) {
        return t.armies === 0;
      });
    };
    var areAllArmiesDeployed = function areAllArmiesDeployed() {
      return players.every(function (p) {
        return p.undeployedArmies === 0;
      });
    };
    var doesCurrentPlayerHaveUndeployedArmies = function doesCurrentPlayerHaveUndeployedArmies() {
      return players[currentPlayerIndex].undeployedArmies >= 1;
    };
    var doesCurrentPlayerHaveNoCards = function doesCurrentPlayerHaveNoCards() {
      return cardOwner.every(function (o) {
        return o !== currentPlayerIndex;
      });
    };
    var isGameOver = function isGameOver() {
      return territories.every(function (t) {
        return t.owner === currentPlayerIndex;
      });
    };
    var isTerritoryDefeated = function isTerritoryDefeated() {
      return territories[extendedState.activeBattle.defendingTerritoryIndex].armies === 0;
    };
    var hasPlayerEarnedCard = function hasPlayerEarnedCard() {
      return capturedTerritories > 0 && cards.some(function (c) {
        return c.owner !== undefined;
      });
    };
    var hasTooManyCardsFromDefeat = function hasTooManyCardsFromDefeat() {
      var cardsHeld = territories.filter(function (c) {
        return c.owner === currentPlayerIndex;
      });
      return !isGameOver() && cardsHeld > 5;
    };

    // todo - refactor third constructor/function to be consistent and short, like ", StartMatch],"
    return [[_constants.STATES.INITIALIZING, _constants.STATES.SELECTING_FIRST_PLAYER, (0, _StartMatch2.default)(matchConfig, extendedState)], [_constants.STATES.SELECTING_FIRST_PLAYER, _constants.PSEUDOSTATES.INITIAL_CHOICE, (0, _SelectFirstPlayer2.default)(matchConfig, extendedState)], [_constants.PSEUDOSTATES.INITIAL_CHOICE, _constants.STATES.OCCUPYING, simpleGuard(isUnoccupiedTerritory)], [_constants.PSEUDOSTATES.INITIAL_CHOICE, _constants.STATES.PLACING_ADDITIONAL_ARMY, elseTransition()], [_constants.STATES.OCCUPYING, _constants.PSEUDOSTATES.HAS_PLACED_ARMIES, (0, _OccupyTerritory2.default)(matchConfig, extendedState)], [_constants.STATES.PLACING_ADDITIONAL_ARMY, _constants.PSEUDOSTATES.HAS_PLACED_ARMIES, (0, _PlaceAdditionalArmy2.default)(matchConfig, extendedState)], [_constants.PSEUDOSTATES.HAS_PLACED_ARMIES, _constants.PSEUDOSTATES.INITIAL_CHOICE, elseTransitionWithReducer(reduceNextPlayer)], [_constants.PSEUDOSTATES.HAS_PLACED_ARMIES, _constants.PSEUDOSTATES.SETUP_NEXT_TURN, simpleGuard(areAllArmiesDeployed)], [_constants.PSEUDOSTATES.SETUP_NEXT_TURN, _constants.PSEUDOSTATES.HAS_CARDS, (0, _SetupNextTurn2.default)(matchConfig, extendedState)], [_constants.PSEUDOSTATES.HAS_CARDS, _constants.STATES.TRADING_CARDS, elseTransition()], [_constants.PSEUDOSTATES.HAS_CARDS, _constants.STATES.PLACING_NEW_ARMIES, simpleGuard(doesCurrentPlayerHaveNoCards)], [_constants.STATES.TRADING_CARDS, _constants.PSEUDOSTATES.HAS_CARDS, (0, _TradeCards2.default)(matchConfig, extendedState)], [_constants.STATES.TRADING_CARDS, _constants.STATES.PLACING_NEW_ARMIES, (0, _EndTrade2.default)(matchConfig, extendedState)], [_constants.STATES.PLACING_NEW_ARMIES, _constants.PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, (0, _PlaceNewArmies2.default)(matchConfig, extendedState)], [_constants.PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, _constants.STATES.PLACING_NEW_ARMIES, simpleGuard(doesCurrentPlayerHaveUndeployedArmies)], [_constants.PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, _constants.STATES.BATTLING, elseTransition()], [_constants.STATES.BATTLING, _constants.STATES.FORTIFYING, (0, _EndAttack2.default)(matchConfig, extendedState)], [_constants.STATES.BATTLING, _constants.STATES.ROLLING_DICE, (0, _Battle2.default)(matchConfig, extendedState)], [_constants.STATES.ROLLING_DICE, _constants.PSEUDOSTATES.HAS_DEFEATED_TERRITORY, (0, _RollDice2.default)(matchConfig, extendedState)], [_constants.PSEUDOSTATES.HAS_DEFEATED_TERRITORY, _constants.STATES.BATTLING, elseTransition()], [_constants.PSEUDOSTATES.HAS_DEFEATED_TERRITORY, _constants.STATES.CAPTURING, simpleGuard(isTerritoryDefeated)], [_constants.STATES.CAPTURING, _constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, (0, _Capture2.default)(matchConfig, extendedState)], [_constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, _constants.STATES.TRADING_CARDS, simpleGuard(hasTooManyCardsFromDefeat)], [_constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, _constants.PSEUDOSTATES.GAME_OVER, simpleGuard(isGameOver)], [_constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, _constants.STATES.BATTLING, elseTransition()], [_constants.STATES.FORTIFYING, _constants.PSEUDOSTATES.HAS_EARNED_CARD, (0, _Fortify2.default)(matchConfig, extendedState)], [_constants.STATES.FORTIFYING, _constants.PSEUDOSTATES.HAS_EARNED_CARD, (0, _EndTurn2.default)(matchConfig, extendedState)], [_constants.PSEUDOSTATES.HAS_EARNED_CARD, _constants.STATES.DRAWING_RANDOM_CARD, simpleGuard(hasPlayerEarnedCard)], [_constants.PSEUDOSTATES.HAS_EARNED_CARD, _constants.PSEUDOSTATES.SETUP_NEXT_TURN, elseTransition()], [_constants.STATES.DRAWING_RANDOM_CARD, _constants.PSEUDOSTATES.SETUP_NEXT_TURN, (0, _DrawRandomCard2.default)(matchConfig, extendedState)]];
  };

  // Similar to Redux reduce and a transition in UML State Machine in response to an event.
  var reduce = function reduce() {
    var extendedState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { stateKey: _constants.STATES.INITIALIZING };
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var MAX_TRANSITIONS = 10;

    var newState = Object.assign({}, extendedState);

    for (var i = 0; i < MAX_TRANSITIONS; i++) {
      //assertStateInvariants(newState);

      var transition = getTransition(newState, action);

      // apply new action to compute the updated state
      if (transition) {
        if (typeof transition.reduce === 'function') {
          newState = transition.reduce(action);
        }
        newState.stateKey = transition.nextStateKey;
      } else {
        // stop when appropriate
        return newState;
      }
    }
    throw { message: 'stuck in loop leaving ' + extendedState.stateKey };
  };

  /**
   * Returns true when action is valid
   * @param {MatchConfig} matchConfig
   * @param {MatchState} matchState
   * @param {Object} action
   *
   * @returns {boolean} true if action is valid and has an effect on the state
   */
  var isActionValid = function isActionValid(matchState, action) {
    var newState = reduce(matchState, action);
    return !Object.is(matchState, newState);
  };

  return {
    getTransitions: getTransitions,
    isActionValid: isActionValid,
    reduce: reduce
  };
}

StateMachine.getEdges = function () {
  var stateMachine = new StateMachine({});
  var transitions = stateMachine.getTransitions({}, {});
  return transitions.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 3),
        from = _ref6[0],
        to = _ref6[1],
        transition = _ref6[2];

    var label = transition.action ? transition.action : '';
    return [from, to, label];
  });
};

exports.default = StateMachine;