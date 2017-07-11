// @flow
import type { MatchState } from '../../MatchState';

const activePlayerIndicies = ({ playersUndeployedArmies, territories }) => {
  const indicies = new Set();

  // TODO - replace with filter().map() to avoid mutation
  // set players with undeployed armies
  if (Array.isArray(playersUndeployedArmies)) {
    playersUndeployedArmies.forEach((armies, i) => {
      if (armies >= 1) {
        indicies.add(i);
      }
    });
  }

  // set players occupying territories
  if (Array.isArray(territories)) {
    territories.forEach(territory => {
      if (Number.isInteger(territory.owner)) {
        indicies.add(territory.owner);
      }
    });
  }

  // eslint-disable-next-line fp/no-mutating-methods
  return Array.from(indicies).sort();
};

// MUST BE RUN AT END OF TURN, USING EXTENDED STATE TO BE RETURNED BY REDUCER
export default function nextPlayerIndex({
  playersUndeployedArmies,
  territories,
  currentPlayerIndex,
}: MatchState) {
  const activePlayers = activePlayerIndicies({ playersUndeployedArmies, territories });

  const i = activePlayers.indexOf(currentPlayerIndex);
  if (i + 1 < activePlayers.length) {
    return activePlayers[i + 1];
  }

  return activePlayers[0];
}
