// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import { ACTIONS } from '../constants';
import TransitionGuarded from './TransitionGuarded';
import replaceElements from './replaceElements';

/**
 * Simulate player drawing a random card from the deck.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const { cardOwner, currentPlayerIndex } = extendedState;

  const guard = ({ cardIndex }) =>
    Number.isInteger(cardIndex) &&
    cardIndex >= 0 &&
    cardIndex < cardOwner.length &&
    cardOwner[cardIndex] === undefined;

  const reduce = ({ cardIndex }) => ({
    ...extendedState,
    cardOwner: replaceElements(extendedState.cardOwner, {
      [cardIndex]: currentPlayerIndex,
    }),
    capturedTerritories: undefined,
  });

  return new TransitionGuarded(ACTIONS.DRAW_RANDOM_CARD, guard, reduce);
}
