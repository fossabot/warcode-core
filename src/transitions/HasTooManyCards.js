// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default (
  matchConfig: MatchConfig,
  { cards, territories, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: () =>
    cards.filter(c => c.owner === currentPlayerIndex).length > 5 &&
    territories.some(t => t.owner !== currentPlayerIndex), // hasn't won
  reduce: () => {},
});
