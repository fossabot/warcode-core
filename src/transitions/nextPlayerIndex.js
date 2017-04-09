// @flow
import type { MatchState } from '../MatchState';

function activePlayerIndicies({ players, territories }) {
  const indicies = new Set();

  // set players with undeployed armies
  if (Array.isArray(players)) {
    players.forEach((player, i) => {
      if (player.undeployedArmies >= 1) {
        indicies.add(i);
      }
    });
  }

  // set players occupying territories
  if (Array.isArray(territories)) {
    territories.forEach((territory) => {
      if (Number.isInteger(territory.owner)) {
        indicies.add(territory.owner);
      }
    });
  }

  return Array.from(indicies).sort();
}

// MUST BE RUN AT END OF TURN, USING EXTENDED STATE TO BE RETURNED BY REDUCER
export default function nextPlayerIndex({ players, territories, currentPlayerIndex }: MatchState) {
  const activePlayers = activePlayerIndicies({ players, territories });

  const i = activePlayers.indexOf(currentPlayerIndex);
  if (i + 1 < activePlayers.length) {
    return activePlayers[i + 1];
  }

  return activePlayers[0];
}
