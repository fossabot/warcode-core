import {ACTIONS} from '../constants.js';
import TransitionGuarded from './TransitionGuarded';

/**
 * Simulate player drawing a random card from the deck.
 */
export default function(matchConfig, extendedState) {
  const {cards, currentPlayerIndex} = extendedState;

  const guard = (action) => {
    const {cardIndex} = action;

    return Number.isInteger(cardIndex)
      && cardIndex >= 0
      && cardIndex < cards.length
      && cards[cardIndex].owner === undefined;
  };

  const reduce = (action) => {
    const {cardIndex} = action;

    return {
      ...extendedState,
      cards: Object.assign([], extendedState.territories, {
        [cardIndex]: {
          owner: currentPlayerIndex
        }
      }),
      capturedTerritories: undefined
    };
  };

  return new TransitionGuarded(ACTIONS.DRAW_RANDOM_CARD, guard, reduce);
}
