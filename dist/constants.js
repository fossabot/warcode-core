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