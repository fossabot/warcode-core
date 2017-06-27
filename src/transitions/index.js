import { STATES, PSEUDOSTATES } from '../constants';
// import type { TransitionType } from './TransitionType';
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

export default [
  [STATES.INITIALIZING, STATES.SELECTING_FIRST_PLAYER, StartMatch],
  [STATES.SELECTING_FIRST_PLAYER, PSEUDOSTATES.INITIAL_CHOICE, SelectFirstPlayer],
  [PSEUDOSTATES.INITIAL_CHOICE, STATES.OCCUPYING, IsUnoccupiedTerritory],
  [PSEUDOSTATES.INITIAL_CHOICE, STATES.PLACING_ADDITIONAL_ARMY, Else],
  [STATES.OCCUPYING, PSEUDOSTATES.HAS_PLACED_ARMIES, OccupyTerritory],
  [STATES.PLACING_ADDITIONAL_ARMY, PSEUDOSTATES.HAS_PLACED_ARMIES, PlaceAdditionalArmy],
  [PSEUDOSTATES.HAS_PLACED_ARMIES, PSEUDOSTATES.INITIAL_CHOICE, NextPlayer],
  [PSEUDOSTATES.HAS_PLACED_ARMIES, PSEUDOSTATES.SETUP_NEXT_TURN, HasPlacedArmies],
  [PSEUDOSTATES.SETUP_NEXT_TURN, PSEUDOSTATES.HAS_CARDS, SetupNextTurn],
  [PSEUDOSTATES.HAS_CARDS, STATES.TRADING_CARDS, Else],
  [PSEUDOSTATES.HAS_CARDS, STATES.PLACING_NEW_ARMIES, HasNoCards],
  [STATES.TRADING_CARDS, PSEUDOSTATES.HAS_CARDS, TradeCards],
  [STATES.TRADING_CARDS, STATES.PLACING_NEW_ARMIES, EndTrade],
  [STATES.PLACING_NEW_ARMIES, PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, PlaceNewArmies],
  [PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, STATES.PLACING_NEW_ARMIES, DoesPlayerHaveUndeployedArmies],
  [PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, STATES.BATTLING, Else],
  [STATES.BATTLING, STATES.FORTIFYING, EndAttack],
  [STATES.BATTLING, STATES.ROLLING_DICE, Battle],
  [STATES.ROLLING_DICE, PSEUDOSTATES.HAS_DEFEATED_TERRITORY, RollDice],
  [PSEUDOSTATES.HAS_DEFEATED_TERRITORY, STATES.BATTLING, Else],
  [PSEUDOSTATES.HAS_DEFEATED_TERRITORY, STATES.CAPTURING, HasDefeatedTerritory],
  [STATES.CAPTURING, PSEUDOSTATES.HAS_DEFEATED_OPPONENT, Capture],
  [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, STATES.TRADING_CARDS, HasTooManyCards],
  [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, PSEUDOSTATES.GAME_OVER, IsGameOver],
  [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, STATES.BATTLING, Else],
  [STATES.FORTIFYING, PSEUDOSTATES.HAS_EARNED_CARD, Fortify],
  [STATES.FORTIFYING, PSEUDOSTATES.HAS_EARNED_CARD, EndTurn],
  [PSEUDOSTATES.HAS_EARNED_CARD, STATES.DRAWING_RANDOM_CARD, HasPlayerEarnedCard],
  [PSEUDOSTATES.HAS_EARNED_CARD, PSEUDOSTATES.SETUP_NEXT_TURN, Else],
  [STATES.DRAWING_RANDOM_CARD, PSEUDOSTATES.SETUP_NEXT_TURN, DrawRandomCard],
];
