// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import nextPlayerIndex from './nextPlayerIndex';
import { Transition } from './Transition';
import replaceElements from './replaceElements';

function calcTerrtitoryAward(extendedState, matchConfig, playerIndex) {
  const territoryOwnedCount = extendedState.territories.filter(t => t.owner === playerIndex).length;
  return Math.max(3, Math.floor(territoryOwnedCount / 3));
}

function calcContinentAward(extendedState, matchConfig, playerIndex) {
  const isContinentOwned = Array(matchConfig.continents.length).fill(true);
  const territoriesNotOwned = matchConfig.territories.filter(t => t.owner !== playerIndex);

  territoriesNotOwned.forEach(([, continentIndex]) => {
    isContinentOwned[continentIndex] = false;
  });

  // return total reward for all continents
  return matchConfig.continents
    .filter((continent, index) => isContinentOwned[index])
    .reduce((reward, continent) => reward + continent[1], 0);
}

function countUndeployedArmies(matchConfig, extendedState, playerIndex) {
  const currentArmies = extendedState.players[playerIndex].undeployedArmies;
  const territoryAward = calcTerrtitoryAward(extendedState, matchConfig, playerIndex);
  const continentAward = calcContinentAward(extendedState, matchConfig, playerIndex);
  return currentArmies + territoryAward + continentAward;
}

/**
 * At the beginning of your turn, you are awarded armies based on occupied
 * territories and continents.
 *
 * The number of new armies is the sum of the following
 * * The greater of 3 or ⅓ of an army for each territory owned
 * * The sum of armies awarded for each continent the player controls
 *
 * The match configuration defines the awards for each continent. For example,
 * the traditional rules use the following awards.
 *
 * | Continent      | Award |
 * |----------------|-------|
 * | Asia           | 7     |
 * | North America  | 5     |
 * | Europe         | 5     |
 * | Africa         | 3     |
 * | Australia      | 2     |
 * | South America  | 2     |
 *
 */
export default function (matchConfig: MatchConfig, extendedState: MatchState): Transition {
  const guard = () => undefined;

  const reduce = () => {
    // SETUP TURN
    const nextPlayer = nextPlayerIndex(extendedState);

    return {
      ...extendedState,
      currentPlayerIndex: nextPlayer,
      players: replaceElements(extendedState.players, { [nextPlayer]: {
        undeployedArmies: countUndeployedArmies(matchConfig, extendedState, nextPlayer),
      } }),
      capturedTerritories: 0,
    };
  };

  return new Transition(guard, reduce);
}
