import { ACTIONS, PSEUDOSTATES, STATES } from '../constants';
import StartMatch from './StartMatch';
import SelectFirstPlayer from './SelectFirstPlayer';
import OccupyTerritory from './OccupyTerritory';
import PlaceAdditionalArmy from './PlaceAdditionalArmy';
import SetupNextTurn from './SetupNextTurn';
import TradeCards from './TradeCards';
import EndTrade from './EndTrade';
import PlaceNewArmies from './PlaceNewArmies';
import EndAttack from './EndAttack';
import Battle from './Battle';
import RollDice from './RollDice';
import Capture from './Capture';
import Fortify from './Fortify';
import EndTurn from './EndTurn';
import DrawRandomCard from './DrawRandomCard';
import HasPlacedArmies from './HasPlacedArmies';
import HasNoCards from './HasNoCards';
import HasDefeatedTerritory from './HasDefeatedTerritory';
import IsGameOver from './IsGameOver';
import HasPlayerEarnedCard from './HasPlayerEarnedCard';
import HasTooManyCards from './HasTooManyCards';
import IsUnoccupiedTerritory from './IsUnoccupiedTerritory';
import DoesPlayerHaveUndeployedArmies from './DoesPlayerHaveUndeployedArmies';
import NextPlayer from './NextPlayer';
import Else from './Else';

const A = ACTIONS;
const S = STATES;
const P = PSEUDOSTATES;

export default [
  [S.INITIALIZING, S.SELECTING_FIRST_PLAYER, StartMatch, A.START_MATCH],
  [S.SELECTING_FIRST_PLAYER, P.INITIAL_CHOICE, SelectFirstPlayer, A.SELECT_FIRST_PLAYER],
  [P.INITIAL_CHOICE, S.OCCUPYING, IsUnoccupiedTerritory],
  [P.INITIAL_CHOICE, S.PLACING_ADDITIONAL_ARMY, Else],
  [S.OCCUPYING, P.HAS_PLACED_ARMIES, OccupyTerritory, A.OCCUPY_TERRITORY],
  [S.PLACING_ADDITIONAL_ARMY, P.HAS_PLACED_ARMIES, PlaceAdditionalArmy, A.PLACE_ADDITIONAL_ARMY],
  [P.HAS_PLACED_ARMIES, P.INITIAL_CHOICE, NextPlayer],
  [P.HAS_PLACED_ARMIES, P.SETUP_NEXT_TURN, HasPlacedArmies],
  [P.SETUP_NEXT_TURN, P.HAS_CARDS, SetupNextTurn],
  [P.HAS_CARDS, S.TRADING_CARDS, Else],
  [P.HAS_CARDS, S.PLACING_NEW_ARMIES, HasNoCards],
  [S.TRADING_CARDS, P.HAS_CARDS, TradeCards, A.TRADING_CARDS],
  [S.TRADING_CARDS, S.PLACING_NEW_ARMIES, EndTrade, A.END_TRADE],
  [S.PLACING_NEW_ARMIES, P.HAS_UNDEPLOYED_ARMIES, PlaceNewArmies, A.PLACE_NEW_ARMIES],
  [P.HAS_UNDEPLOYED_ARMIES, S.PLACING_NEW_ARMIES, DoesPlayerHaveUndeployedArmies],
  [P.HAS_UNDEPLOYED_ARMIES, S.BATTLING, Else],
  [S.BATTLING, S.FORTIFYING, EndAttack, A.END_ATTACK],
  [S.BATTLING, S.ROLLING_DICE, Battle, A.BATTLE],
  [S.ROLLING_DICE, P.HAS_DEFEATED_TERRITORY, RollDice, A.ROLL_DICE],
  [P.HAS_DEFEATED_TERRITORY, S.BATTLING, Else],
  [P.HAS_DEFEATED_TERRITORY, S.CAPTURING, HasDefeatedTerritory],
  [S.CAPTURING, P.HAS_DEFEATED_OPPONENT, Capture, A.CAPTURE],
  [P.HAS_DEFEATED_OPPONENT, S.TRADING_CARDS, HasTooManyCards],
  [P.HAS_DEFEATED_OPPONENT, P.GAME_OVER, IsGameOver],
  [P.HAS_DEFEATED_OPPONENT, S.BATTLING, Else],
  [S.FORTIFYING, P.HAS_EARNED_CARD, Fortify, A.FORTIFY],
  [S.FORTIFYING, P.HAS_EARNED_CARD, EndTurn, A.END_TURN],
  [P.HAS_EARNED_CARD, S.DRAWING_RANDOM_CARD, HasPlayerEarnedCard],
  [P.HAS_EARNED_CARD, P.SETUP_NEXT_TURN, Else],
  [S.DRAWING_RANDOM_CARD, P.SETUP_NEXT_TURN, DrawRandomCard, A.DRAW_RANDOM_CARD],
];
