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
import HasEarnedCard from './HasEarnedCard';
import HasTooManyCards from './HasTooManyCards';
import IsUnoccupiedTerritory from './IsUnoccupiedTerritory';
import HasUndeployedArmies from './HasUndeployedArmies';
import NextPlayer from './NextPlayer';
import Else from './Else';

const A = ACTIONS;
const S = STATES;
const P = PSEUDOSTATES;

export const transitions = [
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
  [S.TRADING_CARDS, P.HAS_CARDS, TradeCards, A.TRADE_CARDS],
  [S.TRADING_CARDS, S.PLACING_NEW_ARMIES, EndTrade, A.END_TRADE],
  [S.PLACING_NEW_ARMIES, P.HAS_UNDEPLOYED_ARMIES, PlaceNewArmies, A.PLACE_NEW_ARMIES],
  [P.HAS_UNDEPLOYED_ARMIES, S.PLACING_NEW_ARMIES, HasUndeployedArmies],
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
  [P.HAS_EARNED_CARD, S.DRAWING_RANDOM_CARD, HasEarnedCard],
  [P.HAS_EARNED_CARD, P.SETUP_NEXT_TURN, Else],
  [S.DRAWING_RANDOM_CARD, P.SETUP_NEXT_TURN, DrawRandomCard, A.DRAW_RANDOM_CARD],
];

export const getTransition = (config, extendedState, action) => {
  // get all transitions leaving the current state
  const fromCurrentState = transitions
    .filter(([from]) => from === extendedState.state)
    .map(([from, to, t, actionType]) => {
      const { guard, reduce } = t(config, extendedState, action);
      return { from, to, actionType, guard, reduce };
    });

  // get transitions that match action and satisfy guards
  const guardSatisfied = fromCurrentState.filter(
    ({ actionType, guard }) =>
      (actionType === undefined || actionType === action.type) &&
      typeof guard === 'function' &&
      guard(action) === true
  );

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
  const elses = fromCurrentState.filter(
    ({ actionType, guard }) => actionType === undefined && guard === undefined
  );

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
