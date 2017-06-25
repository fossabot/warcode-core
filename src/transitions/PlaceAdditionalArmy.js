// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import { ACTIONS } from '../constants';
import TransitionGuarded from './TransitionGuarded';
import replaceElements from './replaceElements';

/**
 * After players claim all territories, players take turns placing one
 * of their undeployed armies on territory they occupy each turn.
 *
 * When a player places an additional army,
 * * The current player looses one undeployed army
 * * The territory armies are incremented
 *
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const { territories, currentPlayerIndex } = extendedState;

  const guard = ({ territoryIndex }) =>
    Number.isInteger(territoryIndex) &&
    territoryIndex >= 0 &&
    territoryIndex < territories.length &&
    territories[territoryIndex].owner === currentPlayerIndex &&
    territories[territoryIndex].armies >= 1;

  const reduce = ({ territoryIndex }) => ({
    ...extendedState,
    territories: replaceElements(extendedState.territories, {
      [territoryIndex]: {
        owner: currentPlayerIndex,
        armies: extendedState.territories[territoryIndex].armies + 1,
      },
    }),
    players: replaceElements(extendedState.players, {
      [currentPlayerIndex]: {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1,
      },
    }),
  });

  return new TransitionGuarded(ACTIONS.PLACE_ADDITIONAL_ARMY, guard, reduce);
}
