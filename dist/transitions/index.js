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

var A = _constants.ACTIONS;
var S = _constants.STATES;
var P = _constants.PSEUDOSTATES;

exports.default = [[S.INITIALIZING, S.SELECTING_FIRST_PLAYER, _StartMatch2.default, A.START_MATCH], [S.SELECTING_FIRST_PLAYER, P.INITIAL_CHOICE, _SelectFirstPlayer2.default, A.SELECT_FIRST_PLAYER], [P.INITIAL_CHOICE, S.OCCUPYING, _IsUnoccupiedTerritory2.default], [P.INITIAL_CHOICE, S.PLACING_ADDITIONAL_ARMY, _Else2.default], [S.OCCUPYING, P.HAS_PLACED_ARMIES, _OccupyTerritory2.default, A.OCCUPY_TERRITORY], [S.PLACING_ADDITIONAL_ARMY, P.HAS_PLACED_ARMIES, _PlaceAdditionalArmy2.default, A.PLACE_ADDITIONAL_ARMY], [P.HAS_PLACED_ARMIES, P.INITIAL_CHOICE, _NextPlayer2.default], [P.HAS_PLACED_ARMIES, P.SETUP_NEXT_TURN, _HasPlacedArmies2.default], [P.SETUP_NEXT_TURN, P.HAS_CARDS, _SetupNextTurn2.default], [P.HAS_CARDS, S.TRADING_CARDS, _Else2.default], [P.HAS_CARDS, S.PLACING_NEW_ARMIES, _HasNoCards2.default], [S.TRADING_CARDS, P.HAS_CARDS, _TradeCards2.default, A.TRADING_CARDS], [S.TRADING_CARDS, S.PLACING_NEW_ARMIES, _EndTrade2.default, A.END_TRADE], [S.PLACING_NEW_ARMIES, P.HAS_UNDEPLOYED_ARMIES, _PlaceNewArmies2.default, A.PLACE_NEW_ARMIES], [P.HAS_UNDEPLOYED_ARMIES, S.PLACING_NEW_ARMIES, _DoesPlayerHaveUndeployedArmies2.default], [P.HAS_UNDEPLOYED_ARMIES, S.BATTLING, _Else2.default], [S.BATTLING, S.FORTIFYING, _EndAttack2.default, A.END_ATTACK], [S.BATTLING, S.ROLLING_DICE, _Battle2.default, A.BATTLE], [S.ROLLING_DICE, P.HAS_DEFEATED_TERRITORY, _RollDice2.default, A.ROLL_DICE], [P.HAS_DEFEATED_TERRITORY, S.BATTLING, _Else2.default], [P.HAS_DEFEATED_TERRITORY, S.CAPTURING, _HasDefeatedTerritory2.default], [S.CAPTURING, P.HAS_DEFEATED_OPPONENT, _Capture2.default, A.CAPTURE], [P.HAS_DEFEATED_OPPONENT, S.TRADING_CARDS, _HasTooManyCards2.default], [P.HAS_DEFEATED_OPPONENT, P.GAME_OVER, _IsGameOver2.default], [P.HAS_DEFEATED_OPPONENT, S.BATTLING, _Else2.default], [S.FORTIFYING, P.HAS_EARNED_CARD, _Fortify2.default, A.FORTIFY], [S.FORTIFYING, P.HAS_EARNED_CARD, _EndTurn2.default, A.END_TURN], [P.HAS_EARNED_CARD, S.DRAWING_RANDOM_CARD, _HasPlayerEarnedCard2.default], [P.HAS_EARNED_CARD, P.SETUP_NEXT_TURN, _Else2.default], [S.DRAWING_RANDOM_CARD, P.SETUP_NEXT_TURN, _DrawRandomCard2.default, A.DRAW_RANDOM_CARD]];