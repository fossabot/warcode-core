// @flow
import type { MatchState } from '../../MatchState';

const activePlayerIndicies = ({ playersUndeployedArmies, territories }) =>
  // eslint-disable-next-line fp/no-mutating-methods
  Array.from(
    new Set([
      ...playersUndeployedArmies
        .map((armies, i) => ({ armies, i }))
        .filter(u => u.armies > 0)
        .map(u => u.i),
      ...territories.filter(t => Number.isInteger(t.owner)).map(t => t.owner),
    ])
  ).sort();

// MUST BE RUN AT END OF TURN, USING EXTENDED STATE TO BE RETURNED BY REDUCER
export default function nextPlayerIndex({
  playersUndeployedArmies,
  territories,
  currentPlayerIndex,
}: MatchState) {
  const activePlayers = activePlayerIndicies({ playersUndeployedArmies, territories });
  const i = activePlayers.indexOf(currentPlayerIndex);
  return activePlayers[i + 1 < activePlayers.length ? i + 1 : 0];
}
