// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { PSEUDOSTATES } from '../constants';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories, currentPlayerIndex } = extendedState;
  const isGameOver = () => territories.every(t => t.owner === currentPlayerIndex);

  return {
    guard: ({ type }) =>
      type === PSEUDOSTATES.HAS_DEFEATED_OPPONENT &&
      territories.filter(c => c.owner === currentPlayerIndex).length > 5 &&
      !isGameOver(),
    reduce: () => extendedState,
  };
}
