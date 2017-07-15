// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (config: MatchConfig, { cardOwner, currentPlayer }: MatchState): TransitionType => ({
  guard: ({ card }) =>
    Number.isInteger(card) && card >= 0 && card < cardOwner.length && cardOwner[card] === undefined,
  reduce: ({ card }) => ({
    cardOwner: replaceElements(cardOwner, {
      [card]: currentPlayer,
    }),
    captured: undefined,
  }),
});
