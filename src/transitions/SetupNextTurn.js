// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import nextPlayerIndex from './utils/nextPlayerIndex';
import replaceElements from './utils/replaceElements';

function calcTerrtitoryAward(extendedState, config, playerIndex) {
  const territoryOwnedCount = extendedState.territories.filter(t => t.owner === playerIndex).length;
  return Math.max(3, Math.floor(territoryOwnedCount / 3));
}

function calcContinentAward(extendedState, config, playerIndex) {
  // find indexes of all continents where the player does not occupy
  // one or more territories
  const continentsWithTerritoryNotOwnedByCurrentPlayer = new Set(
    config.territories
      .filter((t, index) => extendedState.territories[index].owner !== playerIndex)
      .map(([, continentIndex]) => continentIndex)
  );

  // total reward for each continent where the player owns all of the territories
  return config.continents
    .filter((continent, index) => !continentsWithTerritoryNotOwnedByCurrentPlayer.has(index))
    .reduce((reward, [, continentAward]) => reward + continentAward, 0);
}

function countUndeployedArmies(config, extendedState, playerIndex) {
  const currentArmies = extendedState.playersUndeployedArmies[playerIndex];
  const territoryAward = calcTerrtitoryAward(extendedState, config, playerIndex);
  const continentAward = calcContinentAward(extendedState, config, playerIndex);
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
 * the default rules use the following awards.
 *
 * | Continent      | Award |
 * | :------------- | ----- |
 * | Asia           | 7     |
 * | North America  | 5     |
 * | Europe         | 5     |
 * | Africa         | 3     |
 * | Australia      | 2     |
 * | South America  | 2     |
 *
 */
export default function SetupNextTurn(
  config: MatchConfig,
  extendedState: MatchState
): TransitionType {
  const nextPlayer = nextPlayerIndex(extendedState);

  return {
    guard: undefined,
    reduce: () => ({
      currentPlayer: nextPlayer,
      playersUndeployedArmies: replaceElements(extendedState.playersUndeployedArmies, {
        [nextPlayer]: countUndeployedArmies(config, extendedState, nextPlayer),
      }),
      captured: 0,
    }),
  };
}
