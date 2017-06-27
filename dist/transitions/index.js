'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _DoesPlayerHaveUndeployedArmies = require('./DoesPlayerHaveUndeployedArmies');

var _DoesPlayerHaveUndeployedArmies2 = _interopRequireDefault(_DoesPlayerHaveUndeployedArmies);

var _NextPlayer = require('./NextPlayer');

var _NextPlayer2 = _interopRequireDefault(_NextPlayer);

var _Else = require('./Else');

var _Else2 = _interopRequireDefault(_Else);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [[_constants.STATES.INITIALIZING, _constants.STATES.SELECTING_FIRST_PLAYER, _StartMatch2.default], [_constants.STATES.SELECTING_FIRST_PLAYER, _constants.PSEUDOSTATES.INITIAL_CHOICE, _SelectFirstPlayer2.default], [_constants.PSEUDOSTATES.INITIAL_CHOICE, _constants.STATES.OCCUPYING, _IsUnoccupiedTerritory2.default], [_constants.PSEUDOSTATES.INITIAL_CHOICE, _constants.STATES.PLACING_ADDITIONAL_ARMY, _Else2.default], [_constants.STATES.OCCUPYING, _constants.PSEUDOSTATES.HAS_PLACED_ARMIES, _OccupyTerritory2.default], [_constants.STATES.PLACING_ADDITIONAL_ARMY, _constants.PSEUDOSTATES.HAS_PLACED_ARMIES, _PlaceAdditionalArmy2.default], [_constants.PSEUDOSTATES.HAS_PLACED_ARMIES, _constants.PSEUDOSTATES.INITIAL_CHOICE, _NextPlayer2.default], [_constants.PSEUDOSTATES.HAS_PLACED_ARMIES, _constants.PSEUDOSTATES.SETUP_NEXT_TURN, _HasPlacedArmies2.default], [_constants.PSEUDOSTATES.SETUP_NEXT_TURN, _constants.PSEUDOSTATES.HAS_CARDS, _SetupNextTurn2.default], [_constants.PSEUDOSTATES.HAS_CARDS, _constants.STATES.TRADING_CARDS, _Else2.default], [_constants.PSEUDOSTATES.HAS_CARDS, _constants.STATES.PLACING_NEW_ARMIES, _HasNoCards2.default], [_constants.STATES.TRADING_CARDS, _constants.PSEUDOSTATES.HAS_CARDS, _TradeCards2.default], [_constants.STATES.TRADING_CARDS, _constants.STATES.PLACING_NEW_ARMIES, _EndTrade2.default], [_constants.STATES.PLACING_NEW_ARMIES, _constants.PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, _PlaceNewArmies2.default], [_constants.PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, _constants.STATES.PLACING_NEW_ARMIES, _DoesPlayerHaveUndeployedArmies2.default], [_constants.PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, _constants.STATES.BATTLING, _Else2.default], [_constants.STATES.BATTLING, _constants.STATES.FORTIFYING, _EndAttack2.default], [_constants.STATES.BATTLING, _constants.STATES.ROLLING_DICE, _Battle2.default], [_constants.STATES.ROLLING_DICE, _constants.PSEUDOSTATES.HAS_DEFEATED_TERRITORY, _RollDice2.default], [_constants.PSEUDOSTATES.HAS_DEFEATED_TERRITORY, _constants.STATES.BATTLING, _Else2.default], [_constants.PSEUDOSTATES.HAS_DEFEATED_TERRITORY, _constants.STATES.CAPTURING, _HasDefeatedTerritory2.default], [_constants.STATES.CAPTURING, _constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, _Capture2.default], [_constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, _constants.STATES.TRADING_CARDS, _HasTooManyCards2.default], [_constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, _constants.PSEUDOSTATES.GAME_OVER, _IsGameOver2.default], [_constants.PSEUDOSTATES.HAS_DEFEATED_OPPONENT, _constants.STATES.BATTLING, _Else2.default], [_constants.STATES.FORTIFYING, _constants.PSEUDOSTATES.HAS_EARNED_CARD, _Fortify2.default], [_constants.STATES.FORTIFYING, _constants.PSEUDOSTATES.HAS_EARNED_CARD, _EndTurn2.default], [_constants.PSEUDOSTATES.HAS_EARNED_CARD, _constants.STATES.DRAWING_RANDOM_CARD, _HasPlayerEarnedCard2.default], [_constants.PSEUDOSTATES.HAS_EARNED_CARD, _constants.PSEUDOSTATES.SETUP_NEXT_TURN, _Else2.default], [_constants.STATES.DRAWING_RANDOM_CARD, _constants.PSEUDOSTATES.SETUP_NEXT_TURN, _DrawRandomCard2.default]];
// import type { TransitionType } from './TransitionType';