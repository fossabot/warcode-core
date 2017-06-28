// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './replaceElements';

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
 * An additional two armies may be awarded when one of the traded cards matches
 * a territory the player occupies. These two armies are immediately placed on
 * the territory itself. The award only applies to a single card.
 *
 * The three cards must meet one of the following
 * * types match: cards[i].type === cards[j].type AND cards[j].type == cards[k].type
 * * types are unique: cards[i].type != cards[j].type AND
 *   cards[i].type != cards[k].type AND cards[j].type != cards[k].type
 * * one is wild: cards[i].type == WILD OR cards[j].type == WILD OR cards[k].type == WILD
 */
export default function(
  { cards, cardOccupiedTerritoryReward }: MatchConfig,
  extendedState: MatchState,
  action: string
): TransitionType {
  const { cardOwner, territories, currentPlayerIndex, tradeCount } = extendedState;

  return {
    action,
    guard: ({ type, i, j, k }) => {
      if (type !== action) {
        return false;
      }
      const isValidIndices = x => x >= 0 && x < cards.length;
      const areValidIndices = isValidIndices(i) && isValidIndices(j) && isValidIndices(k);
      const areUniqueCards = i !== j && j !== k && i !== k;
      const isOwner =
        cardOwner[i] === currentPlayerIndex &&
        cardOwner[j] === currentPlayerIndex &&
        cardOwner[k] === currentPlayerIndex;
      if (!areValidIndices || !areUniqueCards || !isOwner) {
        return false;
      }
      const isWild = index => cards[index][1] === null;
      const containsWildCard = isWild(i) || isWild(j) || isWild(k);
      const a = cards[i][0];
      const b = cards[j][0];
      const c = cards[k][0];
      const isSameType = a === b && b === c;
      const areDifferentTypes = a !== b && a !== c && b !== c;
      return isSameType || areDifferentTypes || containsWildCard;
    },
    reduce: ({ i, j, k }) => {
      const count = tradeCount + 1;
      const tradeAward = count <= 5 ? (count + 1) * 2 : (count - 3) * 5;

      const territoryUpdate = (() => {
        if (cards[i][1] === undefined || cards[i][1] < 0) {
          return {};
        }

        const firstCardTerritoryIndex: number = cards[i][1];
        if (territories[firstCardTerritoryIndex].owner !== currentPlayerIndex) {
          return {};
        }

        const card = extendedState.territories[firstCardTerritoryIndex];
        return {
          [firstCardTerritoryIndex]: {
            owner: card.owner,
            armies: card.armies + cardOccupiedTerritoryReward,
          },
        };
      })();

      return {
        ...extendedState,
        tradeCount: count,
        players: replaceElements(extendedState.players, {
          [currentPlayerIndex]: {
            undeployedArmies:
              extendedState.players[currentPlayerIndex].undeployedArmies + tradeAward,
          },
        }),
        cardOwner: replaceElements(extendedState.cardOwner, {
          [i]: null,
          [j]: null,
          [k]: null,
        }),
        territories: replaceElements(extendedState.territories, territoryUpdate),
      };
    },
  };
}
