import {ACTIONS} from '../constants.js';
import TransitionGuarded from './TransitionGuarded';

/**
 * Trade three cards for armies. The award increases
 * after each trade made by any player during the match.
 *
 * | Trade | Award |                 |
 * |-------|-------|-----------------|
 * | 1     | 4     | (trade + 1) * 2 |
 * | 2     | 6     | (trade + 1) * 2 |
 * | 3     | 8     | (trade + 1) * 2 |
 * | 4     | 10    | (trade + 1) * 2 |
 * | 5     | 12    | (trade + 1) * 2 |
 * | 6     | 15    | (trade - 3) * 5 |
 * | 7     | 20    | (trade - 3) * 5 |
 * | 8     | 25    | (trade - 3) * 5 |
 * | 9     | 30    | (trade - 3) * 5 |
 *
 * An additional two armies may be awarded when one of the traded cards matches a territory the player occupies. These two armies are immediately placed on the territory itself. The award only applies to a single card.
 *
 * The three cards must meet one of the following
 * * types match: cards[i].type === cards[j].type AND cards[j].type == cards[k].type
 * * types are unique: cards[i].type != cards[j].type AND cards[i].type != cards[k].type AND cards[j].type != cards[k].type
 * * one is wild: cards[i].type == WILD OR cards[j].type == WILD OR cards[k].type == WILD
 */
export default function(matchConfig, extendedState) {
  const {cards, cardOccupiedTerritoryReward, cardTypeNames} = matchConfig;
  const {cardOwner, territories, currentPlayerIndex, tradeCount} = extendedState;

  const guard = (action) => {
    const isValidIndices = (x) => {
      return x >= 0 && x < cards.length;
    }
    const {i, j, k} = action;
    const areValidIndices = isValidIndices(i) && isValidIndices(j) && isValidIndices(k);
    const areUniqueCards = i !== j && j !== k && i !== k;
    const isOwner = cardOwner[i] === currentPlayerIndex &&
      cardOwner[j] === currentPlayerIndex &&
      cardOwner[k] === currentPlayerIndex;
    if (!areValidIndices || !areUniqueCards || !isOwner) {
      return false;
    }
    const isWild = (index) => {
      return cards[index][1] === null;
    };
    const containsWildCard = isWild(i) || isWild(j) || isWild(k);
    const a = cards[i][0];
    const b = cards[j][0];
    const c = cards[k][0];
    const isSameType = a === b && b === c;
    const areDifferentTypes = a !== b && a !== c && b !== c;
    return isSameType || areDifferentTypes || containsWildCard;
  };

  const reduce = (action) => {
    const {i, j, k} = action;
    const count = tradeCount + 1;
    const tradeAward = (count <= 5) ? (count + 1) * 2 : (count - 3) * 5;
    let firstTerritoryAward = 0;
    if (cards[i].territoryID && territories[cards[i].territoryID].owner === currentPlayerIndex) {
      firstTerritoryAward = extendedState.territories[cards[i].territoryID].armies + cardOccupiedTerritoryReward;
    }

    return {
      ...extendedState,
      tradeCount: count,
      players: Object.assign([], extendedState.players, { [currentPlayerIndex]: {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies + tradeAward
      }}),
      cardOwner: Object.assign([], extendedState.cardOwner, {
        [i]: null,
        [j]: null,
        [k]: null
      }),
      territories: Object.assign([], extendedState.territories, { [firstTerritory]: {
        armies: extendedState.territories[firstTerritory].armies + firstTerritoryAward
      }})
    };
  };

  return new TransitionGuarded(ACTIONS.TRADE_CARDS, guard, reduce);
}
