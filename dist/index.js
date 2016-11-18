'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _traditional = require('../data/traditional.json');

var _traditional2 = _interopRequireDefault(_traditional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MatchConfig = function () {
  function MatchConfig() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _traditional2.default,
        name = _ref.name,
        version = _ref.version,
        territories = _ref.territories,
        continents = _ref.continents,
        cards = _ref.cards,
        cardTypes = _ref.cardTypes,
        cardTypeNames = _ref.cardTypeNames,
        minPlayers = _ref.minPlayers,
        maxPlayers = _ref.maxPlayers,
        startingArmiesByPlayers = _ref.startingArmiesByPlayers,
        cardOccupiedTerritoryReward = _ref.cardOccupiedTerritoryReward;

    _classCallCheck(this, MatchConfig);

    this.name = name;
    this.verison = version;
    this.territories = territories;
    this.continents = continents;
    this.cards = cards; // [type, territoryIndex]
    this.cardTypeNames = cardTypeNames; // "cardTypeNames": ["Infantry","Cavalry","Artillery","Wild"]
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.startingArmiesByPlayers = startingArmiesByPlayers;
    this.cardOccupiedTerritoryReward = cardOccupiedTerritoryReward;
  }

  /** adjacency list for undirected graph */


  _createClass(MatchConfig, [{
    key: 'edges',
    get: function get() {
      var edges = [];
      this.territories.forEach(function (t, i) {
        t[2].forEach(function (j) {
          edges.push([i, j]);
        });
      });
      return edges;
    }
  }]);

  return MatchConfig;
}();

exports.default = MatchConfig;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('./constants.js');

var _nextPlayerIndex = require('./transitions/nextPlayerIndex.js');

var _nextPlayerIndex2 = _interopRequireDefault(_nextPlayerIndex);

var _Transition = require('./transitions/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

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
      return new _Transition2.default(guard, function () {
        return extendedState;
      });
    };

    var elseTransition = function elseTransition() {
      return new _Transition2.default(function () {
        return undefined;
      }, function () {
        return extendedState;
      });
    };

    var elseTransitionWithReducer = function elseTransitionWithReducer(reducer) {
      return new _Transition2.default(function () {
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

/**
 * @typedef {Object} MatchConfig
 * @property {number} minPlayers - Maximum number of players
 * @property {number} maxPlayers - Minimum number of players
 *
 * @typedef {MatchState} MatchConfig
 * @property {number} currentPlayerIndex - index of current player; undefined until selected
 * @property {Territory[]} territories
 * @property {Card[]} cards
 * @property {Player[]} players
 * @property {number} tradeCount - number of times any player has traded a card during this match
 * @property {number} capturedTerritories - number of territories the current player has conquered this turn
 *
 * @typedef {Object} Territory
 * @property {number} owner - index of player occupying this territory; undfined when unoccupied
 * @property {number} armies - count of armies occupying territory
 *
 * @typedef {Object} Card
 * @property {number} owner - index of player holding this card
 *
 * @typedef {Object} Player
 * @property {number} undeployedArmies - number of armies the player has yet to deploy
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

/**
 * Start the match.
 *
 * @param playerCount {number} - Number of players. The match settings determine the minimum and maximum number of players.
 * @return {{ type: string; playerCount; }}
 */
function startMatch(playerCount) {
  return {
    type: _constants.ACTIONS.START_MATCH,
    playerCount: playerCount
  };
}

/**
 * Select player to take first move, similarly to each player rolling a die
 * to begin the game.
 *
 * @param firstPlayerIndex {number} - Index of the first player.
 * @return {{ type: string; firstPlayerIndex; }}
 */
function selectFirstPlayer(firstPlayerIndex) {
  return {
    type: _constants.ACTIONS.SELECT_FIRST_PLAYER,
    firstPlayerIndex: firstPlayerIndex
  };
}

/**
 * Select territory to occupy.
 *
 * @param territoryIndex {number} - Index of territory to occupy. It must be unoccupied.
 * @return {{ type: string; territoryIndex; }}
 */
function occupyTerritory(territoryIndex) {
  return {
    type: _constants.ACTIONS.OCCUPY_TERRITORY,
    territoryIndex: territoryIndex
  };
}

/**
 * Select a territory you own to place an additional army.
 *
 * @param territoryIndex {number} - Index of territory to place an additional army. You must occupy it.
 * @return {{ type: string; territoryIndex; } }
 */
function placeAdditionalArmy(territoryIndex) {
  return {
    type: _constants.ACTIONS.PLACE_ADDITIONAL_ARMY,
    territoryIndex: territoryIndex
  };
}

/**
 * Select three cards to trade for armies.
 *
 * @param i {number}  - Index of first card to trade. This card will receive a territory bonus.
 * @param j {number}  - Index of card to trade
 * @param k {number}  - Index of card to trade
 */
function tradeCards(i, j, k) {
  return {
    type: _constants.ACTIONS.TRADE_CARDS,
    i: i,
    j: j,
    k: k
  };
}

/**
 * End trading and begin the attacking phase of the turn.
 * You must continue trading when you hold five or six cards.
 */
function endTrade() {
  return {
    type: _constants.ACTIONS.END_TRADE
  };
}

/**
 * Place some undeployed armies on an occupied territory to start the turn
 * @param territoryIndex {number}  - index of territory to place new armies
 * @param armies {number}  - number of armies to place
 */
function placeNewArmies(territoryIndex, armies) {
  return {
    type: _constants.ACTIONS.PLACE_NEW_ARMIES,
    territoryIndex: territoryIndex,
    armies: armies
  };
}

/**
 * Select a territory to attack, neighboring defending territory, and dice to roll
 * @param attackingTerritoryIndex {number}  - index of attacking territory
 * @param defendingTerritoryIndex {number}  - index of defending territory
 * @param attackingDiceCount {number} - number of dice to be rolled by attacker
 */
function battle(attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount) {
  return {
    type: _constants.ACTIONS.BATTLE,
    attackingTerritoryIndex: attackingTerritoryIndex,
    defendingTerritoryIndex: defendingTerritoryIndex,
    attackingDiceCount: attackingDiceCount
  };
}

/**
 * Simulate attacker and defender rolling dice.
 * @param attackerDice {Array.number} - dice rolled by attacker
 * @param defenderDice {Array.number} - dice rolled by defender
 */
function rollDice(attackerDice, defenderDice) {
  return {
    type: _constants.ACTIONS.ROLL_DICE,
    attackerDice: attackerDice,
    defenderDice: defenderDice
  };
}

/** End attack and begin fortifying */
function endAttack() {
  return {
    type: _constants.ACTIONS.END_ATTACK
  };
}

/**
 * Capture the defeated territory by moving armies into it
 * @param armies {number} - number of armies to move
 */
function capture(armies) {
  return {
    type: _constants.ACTIONS.CAPTURE,
    armies: armies
  };
}

/**
 * Move armies between two of your adjacent territories before ending your turn.
 *
 * @param fromTerritoryIndex - Index of territory to move armies from. Must be owned by you, have more than one army, and be adjacent to toTerritoryIndex.
 * @param toTerritoryIndex - Index of territory to move armies to. Must be owned by you and adjacent to fromTerritoryIndex.
 * @param armies - Number of armies to move. You must leave one army behind, so the number may between one and the number of the armies on fromTerritoryIndex.
 */
function fortify(fromTerritoryIndex, toTerritoryIndex, armies) {
  return {
    type: _constants.ACTIONS.FORTIFY,
    fromTerritoryIndex: fromTerritoryIndex,
    toTerritoryIndex: toTerritoryIndex,
    armies: armies
  };
}

/** End turn without fortifying. */
function endTurn() {
  return {
    type: _constants.ACTIONS.END_TURN
  };
}

/**
 * Select "random" card for player to draw from the deck.
 *
 * @param cardIndex {number} - Index of the card to assign. Card owner must be currently undefined.
 */
function drawRandomCard(cardIndex) {
  return {
    type: _constants.ACTIONS.DRAW_RANDOM_CARD,
    cardIndex: cardIndex
  };
};

exports.default = {
  startMatch: startMatch,
  selectFirstPlayer: selectFirstPlayer,
  occupyTerritory: occupyTerritory,
  placeAdditionalArmy: placeAdditionalArmy,
  tradeCards: tradeCards,
  endTrade: endTrade,
  placeNewArmies: placeNewArmies,
  battle: battle,
  rollDice: rollDice,
  endAttack: endAttack,
  capture: capture,
  fortify: fortify,
  endTurn: endTurn,
  drawRandomCard: drawRandomCard
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Actions are similar to UML state machine events and Redux actions
var ACTIONS = exports.ACTIONS = Object.freeze({
  START_MATCH: 'StartMatch',
  SELECT_FIRST_PLAYER: 'SelectFirstPlayer',
  OCCUPY_TERRITORY: 'OccupyTerritory',
  PLACE_ADDITIONAL_ARMY: 'PlaceAddtionalArmy',
  TRADE_CARDS: 'TradeCards',
  END_TRADE: 'EndTrade',
  PLACE_NEW_ARMIES: 'PlaceNewArmies',
  BATTLE: 'Battle',
  ROLL_DICE: 'RollDice',
  END_ATTACK: 'EndAttack',
  CAPTURE: 'Capture',
  FORTIFY: 'Fortify',
  END_TURN: 'EndTurn',
  DRAW_RANDOM_CARD: 'DrawRandomCard'
});

// State constants
var STATES = exports.STATES = Object.freeze({
  INITIALIZING: 'Initializing',
  SELECTING_FIRST_PLAYER: 'SelectingFirstPlayer',
  OCCUPYING: 'OccupyingTerritory',
  PLACING_ADDITIONAL_ARMY: 'PlacingAdditionalArmy',
  TRADING_CARDS: 'TradingCards',
  PLACING_NEW_ARMIES: 'PlacingNewArmies',
  BATTLING: 'Battling',
  ROLLING_DICE: 'RollingDice',
  FORTIFYING: 'Fortifying',
  DRAWING_RANDOM_CARD: 'DrawingRandomCard',
  CAPTURING: 'Capturing'
});

// Pseudostate constants, which may be hidden by this module
var PSEUDOSTATES = exports.PSEUDOSTATES = Object.freeze({
  INITIAL_CHOICE: 'InitialChoice',
  SETUP_NEXT_TURN: 'SetupNextTurn',
  HAS_PLACED_ARMIES: 'HasPlacedArmies',
  HAS_CARDS: 'HasCards',
  HAS_UNDEPLOYED_ARMIES: 'HasUndeployedArmies',
  HAS_DEFEATED_TERRITORY: 'HasDefeatedTerritory',
  HAS_DEFEATED_OPPONENT: 'HasDefeatedOpponent',
  HAS_EARNED_CARD: 'HasEarnedCard',
  GAME_OVER: 'GameOver'
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionCreators = require('./actionCreators.js');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _constants = require('./constants.js');

var _MatchConfig = require('./MatchConfig.js');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _StateMachine = require('./StateMachine.js');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default();
var stateMachine = new _StateMachine2.default(matchConfig);

exports.default = {
  actionCreators: _actionCreators2.default,
  isActionValid: stateMachine.isActionValid,
  reduce: stateMachine.reduce,
  ACTIONS: _constants.ACTIONS,
  STATES: _constants.STATES,
  PSEUDOSTATES: _constants.PSEUDOSTATES
};
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../constants.js');

var _actionCreators = require('../actionCreators.js');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _StateMachine = require('../StateMachine.js');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _MatchConfig = require('../MatchConfig.js');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

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
  var matchConfig = new _MatchConfig2.default(_config2.default);
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
  var matchConfig = new _MatchConfig2.default(_config2.default);
  var stateMachine = new _StateMachine2.default(matchConfig);
  var state = void 0;

  state = stateMachine.reduce();
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.INITIALIZING);

  state = stateMachine.reduce(state, _actionCreators2.default.startMatch(matchConfig.minPlayers - 1));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.INITIALIZING);

  state = stateMachine.reduce(state, _actionCreators2.default.startMatch(matchConfig.maxPlayers + 1));
  (0, _expect2.default)(state.stateKey).toEqual(_constants.STATES.INITIALIZING);
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * The objective of battling is to capture an opponent's territory by defeating all of its armies.
 *
 * To attack, you must select an attacking territory that
 * * you own
 * * has more than one army
 * * is adjacent to the defending territory
 *
 * When you attack, you must decide to roll 1, 2, or 3 dice. You can roll no
 * more dice than one more than the number of armies on the attacking territory.
 * For example, if you are attacking from a territory with three armies, you
 * may only roll two dice.
 */


exports.default = function (matchConfig, extendedState) {
  var edges = matchConfig.edges;
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var attackingTerritoryIndex = action.attackingTerritoryIndex,
        defendingTerritoryIndex = action.defendingTerritoryIndex,
        attackingDiceCount = action.attackingDiceCount;

    return Number.isInteger(attackingTerritoryIndex) && attackingTerritoryIndex >= 0 && attackingTerritoryIndex < territories.length && territories[attackingTerritoryIndex].owner === currentPlayerIndex && territories[attackingTerritoryIndex].armies > 1 && Number.isInteger(defendingTerritoryIndex) && defendingTerritoryIndex >= 0 && defendingTerritoryIndex < territories.length && territories[defendingTerritoryIndex].owner !== currentPlayerIndex && edges.some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          a = _ref2[0],
          d = _ref2[1];

      return a === attackingTerritoryIndex && d === defendingTerritoryIndex;
    }) && attackingDiceCount >= 1 && attackingDiceCount <= Math.min(3, territories[attackingTerritoryIndex].armies - 1);
  };

  var reduce = function reduce(action) {
    var attackingTerritoryIndex = action.attackingTerritoryIndex,
        defendingTerritoryIndex = action.defendingTerritoryIndex,
        attackingDiceCount = action.attackingDiceCount;

    return _extends({}, extendedState, {
      activeBattle: {
        attackingTerritoryIndex: attackingTerritoryIndex,
        defendingTerritoryIndex: defendingTerritoryIndex,
        attackingDiceCount: attackingDiceCount
      }
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.BATTLE, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var armies = action.armies;
    var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
        attackingDiceCount = activeBattle.attackingDiceCount;

    return Number.isInteger(armies) && armies >= attackingDiceCount && armies < territories[attackingTerritoryIndex].armies;
  };

  var reduce = function reduce(action) {
    var _Object$assign;

    var armies = action.armies;
    var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
        defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, (_Object$assign = {}, _defineProperty(_Object$assign, attackingTerritoryIndex, {
        owner: extendedState.territories[attackingTerritoryIndex].owner,
        armies: extendedState.territories[attackingTerritoryIndex].armies - armies
      }), _defineProperty(_Object$assign, defendingTerritoryIndex, {
        owner: currentPlayerIndex,
        armies: armies
      }), _Object$assign)),
      capturedTerritories: extendedState.capturedTerritories + 1,
      activeBattle: undefined
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.CAPTURE, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Simulate player drawing a random card from the deck.
 */


exports.default = function (matchConfig, extendedState) {
  var cards = extendedState.cards,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var cardIndex = action.cardIndex;


    return Number.isInteger(cardIndex) && cardIndex >= 0 && cardIndex < cards.length && cards[cardIndex].owner === undefined;
  };

  var reduce = function reduce(action) {
    var cardIndex = action.cardIndex;


    return _extends({}, extendedState, {
      cards: Object.assign([], extendedState.territories, _defineProperty({}, cardIndex, {
        owner: currentPlayerIndex
      })),
      capturedTerritories: undefined
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.DRAW_RANDOM_CARD, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var guard = function guard(action) {
    return true;
  };

  var reduce = function reduce(action) {
    return extendedState;
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.END_ATTACK, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var cards = extendedState.cards,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard() {
    var cardsHeldByPlayer = cards.filter(function (c) {
      return c.owner === currentPlayerIndex;
    }).size();
    return cardsHeldByPlayer < 5;
  };

  var reduce = function reduce(action) {
    return extendedState;
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.END_TRADE, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {

  var guard = function guard(action) {
    return true;
  };

  var reduce = function reduce(action) {
    return extendedState;
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.END_TURN, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * During fortification, you may move armies between two of your adjacent
 * territories before ending your turn.
 *
 * Fortification has a few requirements
 * * you own territory to move armies from
 * * you own territory to move armies to
 * * territories are share and adjacent border
 * * armies to move are less than armies on source territory
 *
 *  You may end your turn, skipping fortification.
 */


exports.default = function (matchConfig, extendedState) {
  var edges = matchConfig.edges;
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var fromTerritoryIndex = action.fromTerritoryIndex,
        toTerritoryIndex = action.toTerritoryIndex,
        armies = action.armies;

    return Number.isInteger(fromTerritoryIndex) && fromTerritoryIndex >= 0 && fromTerritoryIndex < territories.length && territories[fromTerritoryIndex].owner === currentPlayerIndex && territories[fromTerritoryIndex].armies > 1 && Number.isInteger(toTerritoryIndex) && toTerritoryIndex >= 0 && toTerritoryIndex < territories.length && territories[toTerritoryIndex].owner === currentPlayerIndex && edges.some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          a = _ref2[0],
          b = _ref2[1];

      return a === fromTerritoryIndex && b === toTerritoryIndex;
    }) && armies >= 1 && armies < territories[fromTerritoryIndex].armies;
  };

  var reduce = function reduce(action) {
    var _Object$assign;

    var fromTerritoryIndex = action.fromTerritoryIndex,
        toTerritoryIndex = action.toTerritoryIndex,
        armies = action.armies;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, (_Object$assign = {}, _defineProperty(_Object$assign, fromTerritoryIndex, {
        owner: extendedState.territories[fromTerritoryIndex].owner,
        armies: extendedState.territories[fromTerritoryIndex].armies - armies
      }), _defineProperty(_Object$assign, toTerritoryIndex, {
        owner: extendedState.territories[toTerritoryIndex].owner,
        armies: extendedState.territories[toTerritoryIndex].armies + armies
      }), _Object$assign))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.FORTIFY, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * At the start of the game, each player takes turns placing a single army
 * on an unoccupied territory.
 *
 * To occupy the territory, you must place an army on an unoccupied territory.
 * An unoccupied territory must have no owner or occupying armies.
 *
 * Upon occupying the territory
 * * The current player's undeployed armies are decremented
 * * The territory owner is updated to the current layer
 * * The territory armies are set to one
 * * Turn is passed to the next player
 *
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var territoryIndex = action.territoryIndex;

    return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === undefined && territories[territoryIndex].armies === 0;
  };

  var reduce = function reduce(action) {
    var territoryIndex = action.territoryIndex;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, _defineProperty({}, territoryIndex, {
        owner: currentPlayerIndex,
        armies: 1
      })),
      players: Object.assign([], extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.OCCUPY_TERRITORY, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * After players claim all territories, players take turns placing one
 * of their undeployed armies on territory they occupy each turn.
 *
 * When a player places an additional army,
 * * The current player looses one undeployed army
 * * The territory armies are incremented
 *
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var territoryIndex = action.territoryIndex;

    return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && territories[territoryIndex].armies >= 1;
  };

  var reduce = function reduce(action) {
    var territoryIndex = action.territoryIndex;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, _defineProperty({}, territoryIndex, {
        owner: currentPlayerIndex,
        armies: extendedState.territories[territoryIndex].armies + 1
      })),
      players: Object.assign([], extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.PLACE_ADDITIONAL_ARMY, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * You must place all new armies earned during the beginning of the turn
 * and from trading cards.and
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      players = extendedState.players,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var territoryIndex = action.territoryIndex,
        armies = action.armies;


    return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && players[currentPlayerIndex].undeployedArmies >= armies;
  };

  var reduce = function reduce(action) {
    var territoryIndex = action.territoryIndex,
        armies = action.armies;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, _defineProperty({}, territoryIndex, {
        owner: currentPlayerIndex,
        armies: extendedState.territories[territoryIndex].armies + armies
      })),
      players: Object.assign([], extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - armies
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.PLACE_NEW_ARMIES, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Simulate players rolling dice.
 *
 * The attacker and defender may loose armies based on the random outcome of the
 * dice rolled. Compare the highest die rolled by the attacker and defender -
 * if the attacker's die is higher the defending territory looses an army,
 * otherwise the attacker looses an army. If the attacker and defender rolled
 * two or more dice, compare the second highest pair. If the attacker's die is
 * higher the defending territory looses an army, otherwise the attacker looses
 * an army.
 *
 * The owner of the defending territory may roll a single die when the defending
 * territory contains a single army. When the territory contains multiple
 * armies, the defender may roll either one or two dice.
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle;


  var guard = function guard(action) {
    var attackerDice = action.attackerDice,
        defenderDice = action.defenderDice;
    var attackingDiceCount = activeBattle.attackingDiceCount,
        defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;

    var maxDefenderDice = Math.min(2, territories[defendingTerritoryIndex].armies);

    return Array.isArray(attackerDice) && attackerDice.length === attackingDiceCount && attackerDice.every(function (d) {
      return d >= 1 && d <= 6;
    }) && Array.isArray(defenderDice) && defenderDice.length >= 1 && defenderDice.length <= maxDefenderDice && defenderDice.every(function (d) {
      return d >= 1 && d <= 6;
    });
  };

  var reduce = function reduce(action) {
    var _Object$assign;

    var attackerDice = action.attackerDice,
        defenderDice = action.defenderDice;
    var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
        defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;

    var loses = getLoses(attackerDice, defenderDice);

    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, (_Object$assign = {}, _defineProperty(_Object$assign, attackingTerritoryIndex, {
        owner: extendedState.territories[attackingTerritoryIndex].owner,
        armies: extendedState.territories[attackingTerritoryIndex].armies - loses.attacker
      }), _defineProperty(_Object$assign, defendingTerritoryIndex, {
        owner: extendedState.territories[defendingTerritoryIndex].owner,
        armies: extendedState.territories[defendingTerritoryIndex].armies - loses.defender
      }), _Object$assign))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.ROLL_DICE, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getLoses(attackerDice, defenderDice) {
  var diceToCompare = Math.min(attackerDice.length, defenderDice.length);
  var sortDecending = function sortDecending(a, b) {
    return a < b;
  };
  var attackerDiceSorted = [].concat(_toConsumableArray(attackerDice)).sort(sortDecending);
  var defenderDiceSorted = [].concat(_toConsumableArray(defenderDice)).sort(sortDecending);
  var loses = {
    defender: 0,
    attacker: 0
  };
  for (var i = 0; i < diceToCompare; i++) {
    if (attackerDiceSorted[i] > defenderDiceSorted[i]) {
      loses.defender++;
    } else {
      loses.attacker++;
    }
  }
  return loses;
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Select player to take first move, similarly to each player rolling
 * a die to determine the first player at the beginning the game.
 */


exports.default = function (matchConfig, extendedState) {
  var players = extendedState.players;


  var guard = function guard(action) {
    var firstPlayerIndex = action.firstPlayerIndex;

    return Number.isInteger(firstPlayerIndex) && firstPlayerIndex >= 0 && firstPlayerIndex < players.length;
  };

  var reduce = function reduce(action) {
    return _extends({}, extendedState, {
      currentPlayerIndex: action.firstPlayerIndex
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.SELECT_FIRST_PLAYER, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * At the beginning of your turn, you are awarded armies based on occupied
 * territories and continents.
 *
 * The number of new armies is the sum of the following
 * * The greater of 3 or ⅓ of an army for each territory owned
 * * The sum of armies awarded for each continent the player controls
 *
 * The match configuration defines the awards for each continent. For example,
 * the traditional rules use the following awards.
 *
 * | Continent      | Award |
 * |----------------|-------|
 * | Asia           | 7     |
 * | North America  | 5     |
 * | Europe         | 5     |
 * | Africa         | 3     |
 * | Australia      | 2     |
 * | South America  | 2     |
 *
 */


exports.default = function (matchConfig, extendedState) {
  var guard = function guard() {
    return undefined;
  };

  var reduce = function reduce(action) {
    // SETUP TURN
    var nextPlayer = (0, _nextPlayerIndex2.default)(extendedState);

    return _extends({}, extendedState, {
      currentPlayerIndex: nextPlayer,
      players: Object.assign([], extendedState.players, _defineProperty({}, nextPlayer, {
        undeployedArmies: countUndeployedArmies(matchConfig, extendedState, nextPlayer)
      })),
      capturedTerritories: 0
    });
  };

  return new _Transition2.default(guard, reduce);
};

var _nextPlayerIndex = require('./nextPlayerIndex.js');

var _nextPlayerIndex2 = _interopRequireDefault(_nextPlayerIndex);

var _Transition = require('./Transition.js');

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function countUndeployedArmies(matchConfig, extendedState, playerIndex) {
  var currentArmies = extendedState.players[playerIndex].undeployedArmies;
  var territoryAward = calcTerrtitoryAward(extendedState, matchConfig, playerIndex);
  var continentAward = calcContinentAward(extendedState, matchConfig, playerIndex);
  return currentArmies + territoryAward + continentAward;
}

function calcTerrtitoryAward(extendedState, matchConfig, playerIndex) {
  var territoryOwnedCount = extendedState.territories.filter(function (t) {
    return t.owner === playerIndex;
  }).length;
  return Math.max(3, Math.floor(territoryOwnedCount / 3));
}

function calcContinentAward(extendedState, matchConfig, playerIndex) {
  var isContinentOwned = Array(matchConfig.continents.length).fill(true);

  var continentIndex = void 0;
  for (var i = 0; i < matchConfig.territories; i++) {
    if (extendedState.territories[i].owner !== playerIndex) {
      continentIndex = matchConfig.territories[i][1];
      isContinentOwned[continentIndex] = false;
    }
  }

  var reward = 0;
  for (var _i = 0; _i < matchConfig.continents; _i++) {
    if (isContinentOwned[_i]) {
      reward += matchConfig.continents[_i][1];
    }
  }
  return reward;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var minPlayers = matchConfig.minPlayers,
      maxPlayers = matchConfig.maxPlayers,
      territories = matchConfig.territories,
      cards = matchConfig.cards,
      startingArmiesByPlayers = matchConfig.startingArmiesByPlayers;


  var guard = function guard(action) {
    var playerCount = action.playerCount;

    return Number.isInteger(playerCount) && playerCount >= minPlayers && playerCount <= maxPlayers;
  };

  var reduce = function reduce(action) {
    var playerCount = action.playerCount;

    return {
      territories: Array(territories.length).fill({
        owner: undefined,
        armies: 0
      }),
      cardOwner: Array(cards.length).fill(undefined),
      players: Array(playerCount).fill({
        undeployedArmies: startingArmiesByPlayers[playerCount]
      }),
      currentPlayerIndex: undefined,
      tradeCount: 0,
      capturedTerritories: 0
    };
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.START_MATCH, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Trade three cards for armies. The award increases
 * after each trade made by any player during the match.
 *
 * | Trade | Award |                 |
 * |-------|-------|-----------------|
 * | 1     | 4     | (trade + 1) * 2 |
 * | 2     | 6     | (trade + 1) * 2 |
 * | 3     | 8     | (trade + 1) * 2 |
 * | 4     | 10    | (trade + 1) * 2 |
 * | 5     | 12    | (trade + 1) * 2 |
 * | 6     | 15    | (trade - 3) * 5 |
 * | 7     | 20    | (trade - 3) * 5 |
 * | 8     | 25    | (trade - 3) * 5 |
 * | 9     | 30    | (trade - 3) * 5 |
 *
 * An additional two armies may be awarded when one of the traded cards matches a territory the player occupies. These two armies are immediately placed on the territory itself. The award only applies to a single card.
 *
 * The three cards must meet one of the following
 * * types match: cards[i].type === cards[j].type AND cards[j].type == cards[k].type
 * * types are unique: cards[i].type != cards[j].type AND cards[i].type != cards[k].type AND cards[j].type != cards[k].type
 * * one is wild: cards[i].type == WILD OR cards[j].type == WILD OR cards[k].type == WILD
 */


exports.default = function (matchConfig, extendedState) {
  var cards = matchConfig.cards,
      cardOccupiedTerritoryReward = matchConfig.cardOccupiedTerritoryReward,
      cardTypeNames = matchConfig.cardTypeNames;
  var cardOwner = extendedState.cardOwner,
      territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex,
      tradeCount = extendedState.tradeCount;


  var guard = function guard(action) {
    var isValidIndices = function isValidIndices(x) {
      return x >= 0 && x < cards.length;
    };
    var i = action.i,
        j = action.j,
        k = action.k;

    var areValidIndices = isValidIndices(i) && isValidIndices(j) && isValidIndices(k);
    var areUniqueCards = i !== j && j !== k && i !== k;
    var isOwner = cardOwner[i] === currentPlayerIndex && cardOwner[j] === currentPlayerIndex && cardOwner[k] === currentPlayerIndex;
    if (!areValidIndices || !areUniqueCards || !isOwner) {
      return false;
    }
    var isWild = function isWild(index) {
      return cards[index][1] === null;
    };
    var containsWildCard = isWild(i) || isWild(j) || isWild(k);
    var a = cards[i][0];
    var b = cards[j][0];
    var c = cards[k][0];
    var isSameType = a === b && b === c;
    var areDifferentTypes = a !== b && a !== c && b !== c;
    return isSameType || areDifferentTypes || containsWildCard;
  };

  var reduce = function reduce(action) {
    var _Object$assign2;

    var i = action.i,
        j = action.j,
        k = action.k;

    var count = tradeCount + 1;
    var tradeAward = count <= 5 ? (count + 1) * 2 : (count - 3) * 5;
    var firstTerritoryAward = 0;
    if (cards[i].territoryID && territories[cards[i].territoryID].owner === currentPlayerIndex) {
      firstTerritoryAward = extendedState.territories[cards[i].territoryID].armies + cardOccupiedTerritoryReward;
    }

    return _extends({}, extendedState, {
      tradeCount: count,
      players: Object.assign([], extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies + tradeAward
      })),
      cardOwner: Object.assign([], extendedState.cardOwner, (_Object$assign2 = {}, _defineProperty(_Object$assign2, i, null), _defineProperty(_Object$assign2, j, null), _defineProperty(_Object$assign2, k, null), _Object$assign2)),
      territories: Object.assign([], extendedState.territories, _defineProperty({}, firstTerritory, {
        armies: extendedState.territories[firstTerritory].armies + firstTerritoryAward
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.TRADE_CARDS, guard, reduce);
};

var _constants = require('../constants.js');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Transition with guard or reduce, leaving a pseudostate */
var Transition = function () {
  function Transition(guard, reduce) {
    _classCallCheck(this, Transition);

    this._guard = guard;
    this._reduce = reduce;
  }

  _createClass(Transition, [{
    key: "guard",


    /** @returns true, false, or undefined when there is no guard */
    value: function guard(action) {
      return this._guard(action);
    }
  }, {
    key: "reduce",
    value: function reduce(action) {
      if (typeof this._reduce === 'function') {
        return this._reduce(action);
      }
    }
  }, {
    key: "action",
    get: function get() {
      return undefined;
    }
  }]);

  return Transition;
}();

exports.default = Transition;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Transition2 = require("./Transition");

var _Transition3 = _interopRequireDefault(_Transition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Transition out of a state triggered by player interaction */
var TransitionGuarded = function (_Transition) {
  _inherits(TransitionGuarded, _Transition);

  function TransitionGuarded(expectedActionType, guard, reduce) {
    _classCallCheck(this, TransitionGuarded);

    var _this = _possibleConstructorReturn(this, (TransitionGuarded.__proto__ || Object.getPrototypeOf(TransitionGuarded)).call(this, guard, reduce));

    _this.expectedActionType = expectedActionType;
    return _this;
  }

  _createClass(TransitionGuarded, [{
    key: "guard",


    /** @returns true or false */
    value: function guard(action) {
      return this.expectedActionType === action.type && _get(TransitionGuarded.prototype.__proto__ || Object.getPrototypeOf(TransitionGuarded.prototype), "guard", this).call(this, action);
    }
  }, {
    key: "action",
    get: function get() {
      return this.expectedActionType;
    }
  }]);

  return TransitionGuarded;
}(_Transition3.default);

exports.default = TransitionGuarded;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextPlayerIndex;
// MUST BE RUN AT END OF TURN, USING EXTENDED STATE TO BE RETURNED BY REDUCER
function nextPlayerIndex(_ref) {
  var players = _ref.players,
      territories = _ref.territories,
      currentPlayerIndex = _ref.currentPlayerIndex;

  var activePlayers = activePlayerIndicies({ players: players, territories: territories });

  var i = activePlayers.indexOf(currentPlayerIndex);
  if (i + 1 < activePlayers.length) {
    return activePlayers[i + 1];
  }

  return activePlayers[0];
}

function activePlayerIndicies(_ref2) {
  var players = _ref2.players,
      territories = _ref2.territories;

  var indicies = new Set();

  // set players with undeployed armies
  if (Array.isArray(players)) {
    players.forEach(function (player, i) {
      if (player.undeployedArmies >= 1) {
        indicies.add(i);
      }
    });
  }

  // set players occupying territories
  if (Array.isArray(territories)) {
    territories.forEach(function (territory) {
      if (Number.isInteger(territory.owner)) {
        indicies.add(territory.owner);
      }
    });
  }

  return Array.from(indicies).sort();
}
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../../constants.js');

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

  var actions = [[_actionCreators2.default.battle(1, 0, 3), true], [_actionCreators2.default.battle(1, 0, 4), false], [_actionCreators2.default.battle(0, 1, 3), false], [_actionCreators2.default.battle(1, 2, 0), false], [_actionCreators2.default.battle(1, 2, 1), true], [_actionCreators2.default.battle(1, 2, 2), true], [_actionCreators2.default.battle(1, 2, 3), true], [_actionCreators2.default.battle(1, 2, 4), false]];

  actions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    (0, _expect2.default)(transition.guard(action)).toEqual(expected);
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
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../../constants.js');

var _Capture = require('../Capture');

var _Capture2 = _interopRequireDefault(_Capture);

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
    owner: 1,
    armies: 3
  }],
  players: [{
    undeployedArmies: 0
  }, {
    undeployedArmies: 0
  }],
  activeBattle: {
    attackingTerritoryIndex: 1,
    defendingTerritoryIndex: 0,
    attackingDiceCount: 3
  }
};

test('guard checks capture parameters', function () {
  var transition = new _Capture2.default(matchConfig, matchExtendedState);
  var actions = [[_actionCreators2.default.capture(0), false], [_actionCreators2.default.capture(1), false], [_actionCreators2.default.capture(2), false], [_actionCreators2.default.capture(3), true], [_actionCreators2.default.capture(4), true], [_actionCreators2.default.capture(5), true], [_actionCreators2.default.capture(6), false]];
  actions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    (0, _expect2.default)(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', function () {
  var _matchExtendedState$a = matchExtendedState.activeBattle,
      attackingTerritoryIndex = _matchExtendedState$a.attackingTerritoryIndex,
      defendingTerritoryIndex = _matchExtendedState$a.defendingTerritoryIndex;

  var transition = new _Capture2.default(matchConfig, matchExtendedState);
  var armiesToMove = 3;
  var action = _actionCreators2.default.capture(armiesToMove);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.activeBattle).toNotExist();
  (0, _expect2.default)(n.territories[attackingTerritoryIndex].armies).toBe(matchExtendedState.territories[attackingTerritoryIndex].armies - armiesToMove);
  (0, _expect2.default)(n.territories[defendingTerritoryIndex].armies).toBe(armiesToMove);
});
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../../constants.js');

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
'use strict';

var _constants = require('../../constants.js');

var _OccupyTerritory = require('../OccupyTerritory');

var _OccupyTerritory2 = _interopRequireDefault(_OccupyTerritory);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default();
var matchExtendedState = {
  stateKey: _constants.STATES.OCCUPYING,
  currentPlayerIndex: 0,
  territories: [{
    owner: undefined,
    armies: 0
  }, {
    owner: 0,
    armies: 1
  }, {
    owner: 1,
    armies: 1
  }],
  players: [{
    undeployedArmies: 1
  }, {
    undeployedArmies: 0
  }]
};

test('guard validates territory index', function () {
  var tryValue = function tryValue(territoryIndex) {
    var transition = new _OccupyTerritory2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.occupyTerritory(territoryIndex);
    return transition.guard(action);
  };

  (0, _expect2.default)(tryValue(undefined)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(-1)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(0)).toBe(true);
  (0, _expect2.default)(tryValue(1)).toBe(false, 'must be unoccupied');
  (0, _expect2.default)(tryValue(2)).toBe(false, 'must be unoccupied');
  (0, _expect2.default)(tryValue(3)).toBe(false, 'must be in range');
});

test('reduce updates player and territory', function () {
  var territoryIndex = 0;
  var transition = new _OccupyTerritory2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.occupyTerritory(territoryIndex);
  var n = transition.reduce(action);
  // console.log('matchExtendedState', JSON.stringify(matchExtendedState));
  // console.log('n', JSON.stringify(n));

  (0, _expect2.default)(n.territories[territoryIndex].owner).toBe(matchExtendedState.currentPlayerIndex);
  (0, _expect2.default)(n.territories[territoryIndex].armies).toBe(1);
  (0, _expect2.default)(n.players[matchExtendedState.currentPlayerIndex].undeployedArmies).toBe(matchExtendedState.players[matchExtendedState.currentPlayerIndex].undeployedArmies - 1);
  (0, _expect2.default)(n.players[1].undeployedArmies).toBe(matchExtendedState.players[1].undeployedArmies);
});
'use strict';

var _constants = require('../../constants.js');

var _PlaceAdditionalArmy = require('../PlaceAdditionalArmy');

var _PlaceAdditionalArmy2 = _interopRequireDefault(_PlaceAdditionalArmy);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default();
var matchExtendedState = {
  stateKey: _constants.STATES.PLACING_ADDITIONAL_ARMY,
  currentPlayerIndex: 0,
  territories: [{
    owner: undefined,
    armies: 0
  }, {
    owner: 0,
    armies: 1
  }, {
    owner: 1,
    armies: 1
  }],
  players: [{
    undeployedArmies: 1
  }, {
    undeployedArmies: 0
  }]
};

test('guard validates player and territory', function () {
  var tryValue = function tryValue(territoryIndex) {
    var transition = new _PlaceAdditionalArmy2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.placeAdditionalArmy(territoryIndex);
    return transition.guard(action);
  };

  (0, _expect2.default)(tryValue(undefined)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(-1)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(0)).toBe(false, 'must be occupied by current player');
  (0, _expect2.default)(tryValue(1)).toBe(true);
  (0, _expect2.default)(tryValue(2)).toBe(false, 'must be occupied by current player');
  (0, _expect2.default)(tryValue(3)).toBe(false, 'must be in range');
});

test('reduce updates player and territory', function () {
  var territoryIndex = 0;
  var transition = new _PlaceAdditionalArmy2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.placeAdditionalArmy(territoryIndex);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.territories[territoryIndex].armies).toBe(matchExtendedState.territories[territoryIndex].armies + 1);
  (0, _expect2.default)(n.players[matchExtendedState.currentPlayerIndex].undeployedArmies).toBe(matchExtendedState.players[matchExtendedState.currentPlayerIndex].undeployedArmies - 1);
  (0, _expect2.default)(n.players[1].undeployedArmies).toBe(matchExtendedState.players[1].undeployedArmies);
});
'use strict';

var _constants = require('../../constants.js');

var _PlaceNewArmies = require('../PlaceNewArmies');

var _PlaceNewArmies2 = _interopRequireDefault(_PlaceNewArmies);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default();
var matchExtendedState = {
  stateKey: _constants.STATES.PLACING_NEW_ARMIES,
  currentPlayerIndex: 0,
  territories: [{
    owner: 1,
    armies: 1
  }, {
    owner: 0,
    armies: 1
  }, {
    owner: 1,
    armies: 1
  }],
  players: [{
    undeployedArmies: 3
  }, {
    undeployedArmies: 0
  }]
};

test('guard checks player and territory', function () {
  var tryValue = function tryValue(territoryIndex) {
    var transition = new _PlaceNewArmies2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.placeNewArmies(territoryIndex, 3);
    return transition.guard(action);
  };

  (0, _expect2.default)(tryValue(undefined)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(-1)).toBe(false, 'must be in range');
  (0, _expect2.default)(tryValue(0)).toBe(false, 'must be occupied by current player');
  (0, _expect2.default)(tryValue(1)).toBe(true);
  (0, _expect2.default)(tryValue(2)).toBe(false, 'must be occupied by current player');
  (0, _expect2.default)(tryValue(3)).toBe(false, 'must be in range');
});

test('reduce updates player and territory', function () {
  var territoryIndex = 0;
  var armies = 3;
  var transition = new _PlaceNewArmies2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.placeNewArmies(territoryIndex, armies);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.territories[territoryIndex].armies).toBe(matchExtendedState.territories[territoryIndex].armies + armies);
  (0, _expect2.default)(n.players[matchExtendedState.currentPlayerIndex].undeployedArmies).toBe(matchExtendedState.players[matchExtendedState.currentPlayerIndex].undeployedArmies - armies);
  (0, _expect2.default)(n.players[1].undeployedArmies).toBe(matchExtendedState.players[1].undeployedArmies);
});
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../../constants.js');

var _RollDice = require('../RollDice');

var _RollDice2 = _interopRequireDefault(_RollDice);

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
    owner: 1,
    armies: 3
  }],
  players: [{
    undeployedArmies: 0
  }, {
    undeployedArmies: 0
  }],
  activeBattle: {
    attackingTerritoryIndex: 1,
    defendingTerritoryIndex: 0,
    attackingDiceCount: 3
  }
};

test('guard checks player and territory', function () {
  var transition = new _RollDice2.default(matchConfig, matchExtendedState);
  var actions = [[_actionCreators2.default.rollDice([1, 2, 3], [1]), true], [_actionCreators2.default.rollDice([1, 2, 3], [1, 2]), true], [_actionCreators2.default.rollDice([0, 2, 3], [1, 2]), false], [_actionCreators2.default.rollDice([1, 2, 7], [1, 2]), false], [_actionCreators2.default.rollDice([1, 2, 3], [0, 2]), false], [_actionCreators2.default.rollDice([1, 2, 3], [1, 7]), false], [_actionCreators2.default.rollDice([1, 2, 3], [1, 2, 3]), false], [_actionCreators2.default.rollDice([1, 2, 3, 4], [1, 2]), false], [_actionCreators2.default.rollDice([1, 2], [1, 2]), false]];
  actions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    (0, _expect2.default)(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', function () {
  var _matchExtendedState$a = matchExtendedState.activeBattle,
      attackingTerritoryIndex = _matchExtendedState$a.attackingTerritoryIndex,
      defendingTerritoryIndex = _matchExtendedState$a.defendingTerritoryIndex;

  var transition = new _RollDice2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.rollDice([1, 2, 3], [1, 4]);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.activeBattle).toInclude(matchExtendedState.activeBattle);
  (0, _expect2.default)(n.territories[attackingTerritoryIndex].armies).toBe(matchExtendedState.territories[attackingTerritoryIndex].armies - 1);
  (0, _expect2.default)(n.territories[defendingTerritoryIndex].armies).toBe(matchExtendedState.territories[defendingTerritoryIndex].armies - 1);
});
'use strict';

var _constants = require('../../constants.js');

var _SelectFirstPlayer = require('../SelectFirstPlayer');

var _SelectFirstPlayer2 = _interopRequireDefault(_SelectFirstPlayer);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default();
var matchExtendedState = {
  stateKey: _constants.STATES.SELECT_FIRST_PLAYER,
  players: [{
    undeployedArmies: 1
  }, {
    undeployedArmies: 0
  }]
};

test('guard validates first player index', function () {
  var tryValue = function tryValue(firstPlayerIndex) {
    var transition = new _SelectFirstPlayer2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.selectFirstPlayer(firstPlayerIndex);
    return transition.guard(action);
  };

  var maxPlayerIndex = matchConfig.maxPlayers - matchConfig.minPlayers - 1;

  (0, _expect2.default)(tryValue(undefined)).toBe(false);
  (0, _expect2.default)(tryValue(-1)).toBe(false);
  (0, _expect2.default)(tryValue(0)).toBe(true);
  (0, _expect2.default)(tryValue(maxPlayerIndex - 1)).toBe(true);
  (0, _expect2.default)(tryValue(maxPlayerIndex)).toBe(false);
});

test('reduce creates valid initial state', function () {
  var transition = new _SelectFirstPlayer2.default(matchConfig, matchExtendedState);
  var firstPlayerIndex = 0;
  var action = _actionCreators2.default.selectFirstPlayer(firstPlayerIndex);
  var n = transition.reduce(action);

  (0, _expect2.default)(n.currentPlayerIndex).toBe(firstPlayerIndex);
});
'use strict';

var _constants = require('../../constants.js');

var _StartMatch = require('../StartMatch');

var _StartMatch2 = _interopRequireDefault(_StartMatch);

var _TransitionGuarded = require('../TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _MatchConfig = require('../../MatchConfig');

var _MatchConfig2 = _interopRequireDefault(_MatchConfig);

var _actionCreators = require('../../actionCreators');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = new _MatchConfig2.default();
var matchExtendedState = {
  stateKey: _constants.STATES.INITIALIZING
};

test('guard validates player count', function () {
  var tryValue = function tryValue(playerCount) {
    var transition = new _StartMatch2.default(matchConfig, matchExtendedState);
    var action = _actionCreators2.default.startMatch(playerCount);
    return transition.guard(action);
  };

  (0, _expect2.default)(tryValue(undefined)).toBe(false);
  (0, _expect2.default)(tryValue(matchConfig.minPlayers - 1)).toBe(false);
  (0, _expect2.default)(tryValue(matchConfig.maxPlayers + 1)).toBe(false);
  (0, _expect2.default)(tryValue(matchConfig.minPlayers)).toBe(true);
  (0, _expect2.default)(tryValue(matchConfig.maxPlayers)).toBe(true);
});

test('reduce creates valid initial state', function () {
  var playerCount = 5;
  var transtion = new _StartMatch2.default(matchConfig, matchExtendedState);
  var action = _actionCreators2.default.startMatch(playerCount);
  var n = transtion.reduce(action);

  (0, _expect2.default)(n.territories.length).toBe(matchConfig.territories.length);
  (0, _expect2.default)(n.territories[0].owner).toNotExist('territory not unoccupied');
  (0, _expect2.default)(n.territories[0].armies).toBe(0, 'territory armies should be zero');

  (0, _expect2.default)(n.cardOwner.length).toBe(matchConfig.cards.length, 'card length should match');
  (0, _expect2.default)(n.cardOwner[0]).toNotExist('card should be unowned');

  (0, _expect2.default)(n.players.length).toBe(playerCount);
  (0, _expect2.default)(n.players[0].undeployedArmies).toBe(matchConfig.startingArmiesByPlayers[playerCount]);

  (0, _expect2.default)(n.currentPlayerIndex).toNotExist();
  (0, _expect2.default)(n.tradeCount).toBe(0);
  (0, _expect2.default)(n.capturedTerritories).toBe(0);
});
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../../constants.js');

var _TradeCards = require('../TradeCards');

var _TradeCards2 = _interopRequireDefault(_TradeCards);

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
  cardOwner: Array(6).fill(currentPlayerIndex)
};

test('guard checks capture parameters', function () {
  var transition = new _TradeCards2.default(matchConfig, matchExtendedState);
  var actions = [[_actionCreators2.default.tradeCards(0, 1, 2), true], [_actionCreators2.default.tradeCards(0, 1, 4), true], [_actionCreators2.default.tradeCards(4, 1, 5), true], [_actionCreators2.default.tradeCards(-1, 0, 2), false], [_actionCreators2.default.tradeCards(0, 1, 10), false], [_actionCreators2.default.tradeCards(0, 0, 2), false], [_actionCreators2.default.tradeCards(0, 2, 3), false]];
  actions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        action = _ref2[0],
        expected = _ref2[1];

    (0, _expect2.default)(transition.guard(action)).toEqual(expected);
  });
});

// test('reduce updates state', () => {
//   const transition: TransitionGuarded = new Fortify(matchConfig, matchExtendedState);
//   const armiesToMove = 3;
//   const from = 1;
//   const to = 2;
//   const action = actionCreators.fortify(from, to, armiesToMove);
//   const n = transition.reduce(action);
//
//   expect(n.territories[from].armies).toBe(matchExtendedState.territories[from].armies - armiesToMove);
//   expect(n.territories[to].armies).toBe(matchExtendedState.territories[to].armies + armiesToMove);
// });
