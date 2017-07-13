// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player has earned a card from capturing territories and is one or more card
 * that can be drawn.
 */
export default function HasEarnedCard(
  config: MatchConfig,
  { cardOwner, captured }: MatchState
): TransitionType {
  return {
    guard: () => captured > 0 && cardOwner.some(owner => owner !== undefined),
    reduce: () => {},
  };
}
