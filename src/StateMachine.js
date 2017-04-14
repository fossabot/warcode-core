import { STATES, PSEUDOSTATES } from './constants';
import nextPlayerIndex from './transitions/nextPlayerIndex';
import Transition from './transitions/Transition';
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
  const getTransitions = extendedState => {
    const {
      territories,
      cardOwner,
      players,
      currentPlayerIndex,
      capturedTerritories,
    } = extendedState;

    const simpleGuard = (guard: ?boolean) => new Transition(guard, () => extendedState);

    const elseTransition = () => new Transition(() => undefined, () => extendedState);

    const elseTransitionWithReducer = reducer => new Transition(() => undefined, reducer);

    const reduceNextPlayer = () => ({
      ...extendedState,
      currentPlayerIndex: nextPlayerIndex(extendedState),
    });

    const IsUnoccupiedTerritory = () =>
      new Transition(() => territories.some(t => t.armies === 0), () => extendedState);

    const areAllArmiesDeployed = () => players.every(p => p.undeployedArmies === 0);

    const DoesCurrentPlayerHaveUndeployedArmies = () =>
      new Transition(() => players[currentPlayerIndex].undeployedArmies >= 1, () => extendedState);

    const doesCurrentPlayerHaveNoCards = () => cardOwner.every(o => o !== currentPlayerIndex);

    const isGameOver = () => territories.every(t => t.owner === currentPlayerIndex);

    const isTerritoryDefeated = () =>
      territories[extendedState.activeBattle.defendingTerritoryIndex].armies === 0;

    const hasPlayerEarnedCard = () =>
      capturedTerritories > 0 && cardOwner.some(owner => owner !== undefined);

    const hasTooManyCardsFromDefeat = () => {
      const cardsHeld = territories.filter(c => c.owner === currentPlayerIndex);
      return !isGameOver() && cardsHeld > 5;
    };

    // todo - refactor third constructor/function to be consistent and short, like ", StartMatch],"
    return [
      [STATES.INITIALIZING, STATES.SELECTING_FIRST_PLAYER, StartMatch(matchConfig, extendedState)],
      [
        STATES.SELECTING_FIRST_PLAYER,
        PSEUDOSTATES.INITIAL_CHOICE,
        SelectFirstPlayer(matchConfig, extendedState),
      ],
      [PSEUDOSTATES.INITIAL_CHOICE, STATES.OCCUPYING, IsUnoccupiedTerritory()],
      [PSEUDOSTATES.INITIAL_CHOICE, STATES.PLACING_ADDITIONAL_ARMY, elseTransition()],
      [
        STATES.OCCUPYING,
        PSEUDOSTATES.HAS_PLACED_ARMIES,
        OccupyTerritory(matchConfig, extendedState),
      ],
      [
        STATES.PLACING_ADDITIONAL_ARMY,
        PSEUDOSTATES.HAS_PLACED_ARMIES,
        PlaceAdditionalArmy(matchConfig, extendedState),
      ],
      [
        PSEUDOSTATES.HAS_PLACED_ARMIES,
        PSEUDOSTATES.INITIAL_CHOICE,
        elseTransitionWithReducer(reduceNextPlayer),
      ],
      [
        PSEUDOSTATES.HAS_PLACED_ARMIES,
        PSEUDOSTATES.SETUP_NEXT_TURN,
        simpleGuard(areAllArmiesDeployed),
      ],
      [
        PSEUDOSTATES.SETUP_NEXT_TURN,
        PSEUDOSTATES.HAS_CARDS,
        SetupNextTurn(matchConfig, extendedState),
      ],
      [PSEUDOSTATES.HAS_CARDS, STATES.TRADING_CARDS, elseTransition()],
      [
        PSEUDOSTATES.HAS_CARDS,
        STATES.PLACING_NEW_ARMIES,
        simpleGuard(doesCurrentPlayerHaveNoCards),
      ],
      [STATES.TRADING_CARDS, PSEUDOSTATES.HAS_CARDS, TradeCards(matchConfig, extendedState)],
      [STATES.TRADING_CARDS, STATES.PLACING_NEW_ARMIES, EndTrade(matchConfig, extendedState)],
      [
        STATES.PLACING_NEW_ARMIES,
        PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES,
        PlaceNewArmies(matchConfig, extendedState),
      ],
      [
        PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES,
        STATES.PLACING_NEW_ARMIES,
        DoesCurrentPlayerHaveUndeployedArmies(),
      ],
      [PSEUDOSTATES.HAS_UNDEPLOYED_ARMIES, STATES.BATTLING, elseTransition()],
      [STATES.BATTLING, STATES.FORTIFYING, EndAttack(matchConfig, extendedState)],
      [STATES.BATTLING, STATES.ROLLING_DICE, Battle(matchConfig, extendedState)],
      [
        STATES.ROLLING_DICE,
        PSEUDOSTATES.HAS_DEFEATED_TERRITORY,
        RollDice(matchConfig, extendedState),
      ],
      [PSEUDOSTATES.HAS_DEFEATED_TERRITORY, STATES.BATTLING, elseTransition()],
      [PSEUDOSTATES.HAS_DEFEATED_TERRITORY, STATES.CAPTURING, simpleGuard(isTerritoryDefeated)],
      [STATES.CAPTURING, PSEUDOSTATES.HAS_DEFEATED_OPPONENT, Capture(matchConfig, extendedState)],
      [
        PSEUDOSTATES.HAS_DEFEATED_OPPONENT,
        STATES.TRADING_CARDS,
        simpleGuard(hasTooManyCardsFromDefeat),
      ],
      [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, PSEUDOSTATES.GAME_OVER, simpleGuard(isGameOver)],
      [PSEUDOSTATES.HAS_DEFEATED_OPPONENT, STATES.BATTLING, elseTransition()],
      [STATES.FORTIFYING, PSEUDOSTATES.HAS_EARNED_CARD, Fortify(matchConfig, extendedState)],
      [STATES.FORTIFYING, PSEUDOSTATES.HAS_EARNED_CARD, EndTurn(matchConfig, extendedState)],
      [PSEUDOSTATES.HAS_EARNED_CARD, STATES.DRAWING_RANDOM_CARD, simpleGuard(hasPlayerEarnedCard)],
      [PSEUDOSTATES.HAS_EARNED_CARD, PSEUDOSTATES.SETUP_NEXT_TURN, elseTransition()],
      [
        STATES.DRAWING_RANDOM_CARD,
        PSEUDOSTATES.SETUP_NEXT_TURN,
        DrawRandomCard(matchConfig, extendedState),
      ],
    ];
  };

  // @return {{nextStateKey: string, reduce: Function}} transition object, may to pseudostate
  const getTransition = (extendedState, action) => {
    const allTransitions = getTransitions(extendedState);

    const fromCurrentState = allTransitions.filter(([from]) => from === extendedState.stateKey);

    // throw exception for invalid states
    fromCurrentState.forEach(([, , t]) => {
      if (!t || typeof t.guard !== 'function' || typeof t.reduce !== 'function') {
        // TODO log error
        throw { message: 'invalid state state' };
      }
    });

    // get transitions that could be followed from the current state
    const guardSatisfied = fromCurrentState.filter(([, , t]) => t.guard(action) === true);
    const elses = fromCurrentState.filter(([, , t]) => t.guard(action) === undefined);

    // quit when there path is indeterminant, meaning there are multiple transitions
    if (guardSatisfied.length > 1 && elses.length > 1) {
      // TODO log error
      throw { message: 'nondeterministic state' };
    }

    // stop when blocked by transition guards
    if (guardSatisfied.length === 0 && elses.length === 0) {
      return undefined;
    }

    const [, to, t] = guardSatisfied.length === 1 ? guardSatisfied[0] : elses[0];

    return {
      nextStateKey: to,
      reduce: () => t.reduce.apply(t, [action]), // bind transition action method
    };
  };

  // Similar to Redux reduce and a transition in UML State Machine in response to an event.
  // const reduce = (extendedState = { stateKey: STATES.INITIALIZING }, action = {}) => {
  //   const MAX_TRANSITIONS = 10;
  //
  //   let newState = Object.assign({}, extendedState);
  //
  //   for (let i = 0; i < MAX_TRANSITIONS; i += 1) {
  //     // assertStateInvariants(newState);
  //
  //     const transition = getTransition(newState, action);
  //     if (!transition) {
  //       return newState;
  //     }
  //
  //     // apply new action to compute the updated state
  //     if (typeof transition.reduce === 'function') {
  //       newState = transition.reduce(action);
  //     }
  //     newState.stateKey = transition.nextStateKey;
  //   }
  //   // TODO - log error
  //   throw { message: `stuck in loop leaving ${extendedState.stateKey}` };
  // };

  const reduce = (extendedState = { stateKey: STATES.INITIALIZING }, action = {}, ttl = 10) => {
    if (ttl < 1) {
      // TODO - log error
      throw { message: `state machine entered a loop ${extendedState.stateKey}` };
    }

    const transition = getTransition(extendedState, action);

    // quit when reached final state / transition for the given action
    if (!transition) {
      return extendedState;
    }

    // return next state to transition to
    const nextState = Object.assign(
      {},
      typeof transition.reduce === 'function' ? transition.reduce(action) : extendedState,
      { stateKey: transition.nextStateKey }
    );

    return reduce(nextState, action, ttl - 1);
  };

  /**
   * Returns true when action is valid
   * @param {MatchConfig} matchConfig
   * @param {MatchState} matchState
   * @param {Object} action
   *
   * @returns {boolean} true if action is valid and has an effect on the state
   */
  const isActionValid = (matchState, action) => !Object.is(matchState, reduce(matchState, action));

  return {
    getTransitions,
    isActionValid,
    reduce(extendedState, action) {
      return reduce(extendedState, action);
    },
  };
}

StateMachine.getEdges = () => {
  const stateMachine = new StateMachine({});
  const transitions = stateMachine.getTransitions({}, {});
  return transitions.map(([from, to, transition]) => {
    const label = transition.action ? transition.action : '';
    return [from, to, label];
  });
};

export default StateMachine;
