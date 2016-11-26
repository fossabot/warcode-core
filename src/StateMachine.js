import {ACTIONS, STATES, PSEUDOSTATES} from './constants';
import nextPlayerIndex from './transitions/nextPlayerIndex';
import {Transition} from './transitions/Transition';
import StartMatch from './transitions/StartMatch';
import SelectFirstPlayer from './transitions/SelectFirstPlayer';
import OccupyTerritory from './transitions/OccupyTerritory';
import PlaceAdditionalArmy from './transitions/PlaceAdditionalArmy';
import SetupNextTurn from './transitions/SetupNextTurn';
import TradeCards from './transitions/TradeCards';
import EndTrade from './transitions/EndTrade';
import PlaceNewArmies from './transitions/PlaceNewArmies';
import EndAttack from './transitions/EndAttack';
import Battle from './transitions/Battle';
import RollDice from './transitions/RollDice';
import Capture from './transitions/Capture';
import Fortify from './transitions/Fortify';
import EndTurn from './transitions/EndTurn';
import DrawRandomCard from './transitions/DrawRandomCard';

function StateMachine(matchConfig) {
  // @return {{nextStateKey: string, reduce: Function}} transition object, may to pseudostate
  const getTransition = function(extendedState, action) {
    const allTransitions = getTransitions(extendedState);

    const fromCurrentState = allTransitions.filter(([from]) => {
      return from === extendedState.stateKey;
    });

    const guardSatisfied = [];
    const guardUnsatisfied = [];
    const elses = [];

    fromCurrentState.forEach(([from, to, t]) => {
      if (!t || typeof t.guard !== 'function' || typeof t.reduce !== 'function') {
        console.error(from, to, t);
      }
      const evaluated = t.guard(action);
      const result = {
        nextStateKey: to,
        reduce: (action) => t.reduce.apply(t, [action]) // bind method to object
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

    return (guardSatisfied.length === 1) ? guardSatisfied[0] : elses[0];
  };

  const getTransitions = function(extendedState) {
    const {territories, cardOwner, players, currentPlayerIndex, capturedTerritories} = extendedState;

    const simpleGuard = function(guard: ?boolean) {
      return new Transition(guard, () => { return extendedState; });
    };

    const elseTransition = function() {
      return new Transition(() => { return undefined; }, () => { return extendedState; });
    };

    const elseTransitionWithReducer = function(reducer) {
      return new Transition(() => { return undefined; }, reducer);
    };

    const reduceNextPlayer = function() {
      return {
        ...extendedState,
        currentPlayerIndex: nextPlayerIndex(extendedState)
      };
    };

    const isUnoccupiedTerritory = function() {
      return territories.some((t) => { return t.armies === 0; });
    };
    const areAllArmiesDeployed = function() {
      return players.every((p) => { return p.undeployedArmies === 0; });
    };
    const doesCurrentPlayerHaveUndeployedArmies = function() {
      return players[currentPlayerIndex].undeployedArmies >= 1;
    };
    const doesCurrentPlayerHaveNoCards = function() {
      return cardOwner.every(o => { return o !== currentPlayerIndex; });
    };
    const isGameOver = function() {
      return territories.every(t => { return t.owner === currentPlayerIndex; });
    };
    const isTerritoryDefeated = function() {
      return territories[extendedState.activeBattle.defendingTerritoryIndex].armies === 0;
    };
    const hasPlayerEarnedCard = function() {
      return capturedTerritories > 0 && cardOwner.some(owner => owner !== undefined);
    };
    const hasTooManyCardsFromDefeat = function() {
      const cardsHeld = territories.filter(c => { return c.owner === currentPlayerIndex; });
      return !isGameOver() && cardsHeld > 5;
    };

    // todo - refactor third constructor/function to be consistent and short, like ", StartMatch],"
    return [
      [STATES.INITIALIZING, STATES.SELECTING_FIRST_PLAYER, StartMatch(matchConfig, extendedState)],
      [STATES.SELECTING_FIRST_PLAYER, PSEUDOSTATES.INITIAL_CHOICE, SelectFirstPlayer(matchConfig, extendedState)],
      [PSEUDOSTATES.INITIAL_CHOICE, STATES.OCCUPYING, simpleGuard(isUnoccupiedTerritory)],
      [PSEUDOSTATES.INITIAL_CHOICE, STATES.PLACING_ADDITIONAL_ARMY, elseTransition()],
      [STATES.OCCUPYING, PSEUDOSTATES.HAS_PLACED_ARMIES, OccupyTerritory(matchConfig, extendedState)],
      [STATES.PLACING_ADDITIONAL_ARMY, PSEUDOSTATES.HAS_PLACED_ARMIES, PlaceAdditionalArmy(matchConfig, extendedState)],
      [PSEUDOSTATES.HAS_PLACED_ARMIES, PSEUDOSTATES.INITIAL_CHOICE, elseTransitionWithReducer(reduceNextPlayer)],
      [PSEUDOSTATES.HAS_PLACED_ARMIES, PSEUDOSTATES.SETUP_NEXT_TURN, simpleGuard(areAllArmiesDeployed)],
      [PSEUDOSTATES.SETUP_NEXT_TURN, PSEUDOSTATES.HAS_CARDS, SetupNextTurn(matchConfig, extendedState)],
      [PSEUDOSTATES.HAS_CARDS, STATES.TRADING_CARDS, elseTransition()],
      [PSEUDOSTATES.HAS_CARDS, STATES.PLACING_NEW_ARMIES, simpleGuard(doesCurrentPlayerHaveNoCards)],
      [STATES.TRADING_CARDS, PSEUDOSTATES.HAS_CARDS, TradeCards(matchConfig, extendedState)],
      [STATES.TRADING_CARDS, STATES.PLACING_NEW_ARMIES, EndTrade(matchConfig, extendedState)],
      [STATES.PLACING_NEW_ARMIES, PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, PlaceNewArmies(matchConfig, extendedState)],
      [PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, STATES.PLACING_NEW_ARMIES, simpleGuard(doesCurrentPlayerHaveUndeployedArmies)],
      [PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, STATES.BATTLING, elseTransition()],
      [STATES.BATTLING, STATES.FORTIFYING, EndAttack(matchConfig, extendedState)],
      [STATES.BATTLING, STATES.ROLLING_DICE, Battle(matchConfig, extendedState)],
      [STATES.ROLLING_DICE, PSEUDOSTATES.HAS_DEFEATED_TERRITORY, RollDice(matchConfig, extendedState)],
      [PSEUDOSTATES.HAS_DEFEATED_TERRITORY, STATES.BATTLING, elseTransition()],
      [PSEUDOSTATES.HAS_DEFEATED_TERRITORY, STATES.CAPTURING, simpleGuard(isTerritoryDefeated)],
      [STATES.CAPTURING, PSEUDOSTATES.HAS_DEFEATED_OPPONENT, Capture(matchConfig, extendedState)],
      [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, STATES.TRADING_CARDS, simpleGuard(hasTooManyCardsFromDefeat)],
      [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, PSEUDOSTATES.GAME_OVER, simpleGuard(isGameOver)],
      [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, STATES.BATTLING, elseTransition()],
      [STATES.FORTIFYING, PSEUDOSTATES.HAS_EARNED_CARD, Fortify(matchConfig, extendedState)],
      [STATES.FORTIFYING, PSEUDOSTATES.HAS_EARNED_CARD, EndTurn(matchConfig, extendedState)],
      [PSEUDOSTATES.HAS_EARNED_CARD, STATES.DRAWING_RANDOM_CARD, simpleGuard(hasPlayerEarnedCard)],
      [PSEUDOSTATES.HAS_EARNED_CARD, PSEUDOSTATES.SETUP_NEXT_TURN, elseTransition()],
      [STATES.DRAWING_RANDOM_CARD, PSEUDOSTATES.SETUP_NEXT_TURN, DrawRandomCard(matchConfig, extendedState)]
    ];
  };

  // Similar to Redux reduce and a transition in UML State Machine in response to an event.
  const reduce = function(extendedState = { stateKey: STATES.INITIALIZING }, action = {}) {
    const MAX_TRANSITIONS = 10;

    let newState = Object.assign({}, extendedState);

    for (let i = 0; i < MAX_TRANSITIONS; i++) {
      //assertStateInvariants(newState);

      const transition = getTransition(newState, action);

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
    throw { message: `stuck in loop leaving ${extendedState.stateKey}` };
  };

  /**
   * Returns true when action is valid
   * @param {MatchConfig} matchConfig
   * @param {MatchState} matchState
   * @param {Object} action
   *
   * @returns {boolean} true if action is valid and has an effect on the state
   */
  const isActionValid = function(matchState, action) {
    const newState = reduce(matchState, action);
    return !Object.is(matchState, newState);
  };

  return {
    getTransitions,
    isActionValid,
    reduce
  };
}

StateMachine.getEdges = function() {
  const stateMachine = new StateMachine({});
  const transitions = stateMachine.getTransitions({}, {});
  return transitions.map(([from, to, transition]) => {
    const label = (transition.action) ? transition.action : '';
    return [from, to, label];
  });
};

export default StateMachine;
