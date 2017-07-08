// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import nextPlayerIndex from './utils/nextPlayerIndex';

/**
 * Select the next player. Updates currentPlayerIndex to the index to the
 * index of the next active player.
 */
export default function NextPlayer(config: MatchConfig, extendedState: MatchState): TransitionType {
  return {
    guard: undefined,
    reduce: () => ({
      currentPlayerIndex: nextPlayerIndex(extendedState),
    }),
  };
}
