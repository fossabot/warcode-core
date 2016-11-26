//@flow
import type {MatchConfig} from '../MatchConfig';
import type {MatchState} from '../MatchState';
import {ACTIONS} from '../constants';
import TransitionGuarded from './TransitionGuarded';

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
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const {edges} = matchConfig;
  const {territories, currentPlayerIndex} = extendedState;

  const guard = (action) => {
    const {attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount} = action;
    return Number.isInteger(attackingTerritoryIndex)
      && attackingTerritoryIndex >= 0
      && attackingTerritoryIndex < territories.length
      && territories[attackingTerritoryIndex].owner === currentPlayerIndex
      && territories[attackingTerritoryIndex].armies > 1
      && Number.isInteger(defendingTerritoryIndex)
      && defendingTerritoryIndex >= 0
      && defendingTerritoryIndex < territories.length
      && territories[defendingTerritoryIndex].owner !== currentPlayerIndex
      && edges.some(([a, d]) => a === attackingTerritoryIndex && d === defendingTerritoryIndex)
      && attackingDiceCount >= 1
      && attackingDiceCount <= Math.min(3, territories[attackingTerritoryIndex].armies - 1);
  };

  const reduce = (action) => {
    const {attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount} = action;
    return {
      ...extendedState,
      activeBattle: {
        attackingTerritoryIndex,
        defendingTerritoryIndex,
        attackingDiceCount
      }
    };
  };

  return new TransitionGuarded(ACTIONS.BATTLE, guard, reduce);
}
