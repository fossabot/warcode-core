// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (config: MatchConfig, { cardOwner, currentPlayer }: MatchState): TransitionType => ({
  guard: ({ cardIndex }) =>
    Number.isInteger(cardIndex) &&
    cardIndex >= 0 &&
    cardIndex < cardOwner.length &&
    cardOwner[cardIndex] === undefined,
  reduce: ({ cardIndex }) => ({
    cardOwner: replaceElements(cardOwner, {
      [cardIndex]: currentPlayer,
    }),
    capturedTerritories: undefined,
  }),
});
