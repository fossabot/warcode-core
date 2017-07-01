// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './replaceElements';

/**
 * Simulate player drawing a random card from the deck.
 */
export default (
  matchConfig: MatchConfig,
  { cardOwner, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: ({ cardIndex }) =>
    Number.isInteger(cardIndex) &&
    cardIndex >= 0 &&
    cardIndex < cardOwner.length &&
    cardOwner[cardIndex] === undefined,
  reduce: ({ cardIndex }) => ({
    cardOwner: replaceElements(cardOwner, {
      [cardIndex]: currentPlayerIndex,
    }),
    capturedTerritories: undefined,
  }),
});
