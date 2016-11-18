import {ACTIONS} from '../constants.js';
import TransitionGuarded from './TransitionGuarded';

/**
 * You may end trading as long as you hold four or fewer cards.
 */
export default function(matchConfig, extendedState) {
  const {cards, currentPlayerIndex} = extendedState;

  const guard = () => {
    const cardsHeldByPlayer = cards.filter(c => {
      return c.owner === currentPlayerIndex;
    }).size();
    return cardsHeldByPlayer < 5;
  };

  const reduce = (action) => {
    return extendedState;
  };

  return new TransitionGuarded(ACTIONS.END_TRADE, guard, reduce);
}
