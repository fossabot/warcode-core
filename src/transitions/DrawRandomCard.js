// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';
import replaceElements from './replaceElements';

/**
 * Simulate player drawing a random card from the deck.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { cardOwner, currentPlayerIndex } = extendedState;

  return {
    guard: ({ type, cardIndex }) =>
      type === ACTIONS.DRAW_RANDOM_CARD &&
      Number.isInteger(cardIndex) &&
      cardIndex >= 0 &&
      cardIndex < cardOwner.length &&
      cardOwner[cardIndex] === undefined,
    reduce: ({ cardIndex }) => ({
      ...extendedState,
      cardOwner: replaceElements(extendedState.cardOwner, {
        [cardIndex]: currentPlayerIndex,
      }),
      capturedTerritories: undefined,
    }),
  };
}
