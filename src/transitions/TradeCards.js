// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  { cards, cardOccupiedTerritoryReward }: MatchConfig,
  { cardOwner, territories, currentPlayer, playersUndeployedArmies, trades }: MatchState
): TransitionType => ({
  guard: ({ i, j, k }) => {
    const isValidIndices = x => x >= 0 && x < cards.length;
    const areValidIndices = isValidIndices(i) && isValidIndices(j) && isValidIndices(k);
    const areUniqueCards = i !== j && j !== k && i !== k;
    const isOwner =
      cardOwner[i] === currentPlayer &&
      cardOwner[j] === currentPlayer &&
      cardOwner[k] === currentPlayer;
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
    const count = trades + 1;
    const tradeAward = count <= 5 ? (count + 1) * 2 : (count - 3) * 5;

    const territoryUpdate = (() => {
      if (cards[i][1] === undefined || cards[i][1] < 0) {
        return {};
      }

      const firstCardTerritoryIndex: number = cards[i][1];
      if (territories[firstCardTerritoryIndex].owner !== currentPlayer) {
        return {};
      }

      const card = territories[firstCardTerritoryIndex];
      return {
        [firstCardTerritoryIndex]: {
          owner: card.owner,
          armies: card.armies + cardOccupiedTerritoryReward,
        },
      };
    })();

    return {
      trades: count,
      playersUndeployedArmies: replaceElements(playersUndeployedArmies, {
        [currentPlayer]: playersUndeployedArmies[currentPlayer] + tradeAward,
      }),
      cardOwner: replaceElements(cardOwner, {
        [i]: null,
        [j]: null,
        [k]: null,
      }),
      territories: replaceElements(territories, territoryUpdate),
    };
  },
});
