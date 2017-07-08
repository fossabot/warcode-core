// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

const getLoses = (attackerDice: number[], defenderDice: number[]) => {
  const diceToCompare = Math.min(attackerDice.length, defenderDice.length);
  const sortDecending = (a, b) => (a < b ? 1 : -1);
  // eslint-disable-next-line fp/no-mutating-methods
  const attackerDiceSorted = [...attackerDice].sort(sortDecending).slice(0, diceToCompare);
  // eslint-disable-next-line fp/no-mutating-methods
  const defenderDiceSorted = [...defenderDice].sort(sortDecending).slice(0, diceToCompare);
  const defenderLoses = defenderDiceSorted.filter((d, i) => attackerDiceSorted[i] > d).length;
  return {
    defender: defenderLoses,
    attacker: diceToCompare - defenderLoses,
  };
};

export default (
  config: MatchConfig,
  { territories, activeBattle }: MatchState
): TransitionType => ({
  guard: ({ attackerDice, defenderDice }) =>
    !!activeBattle &&
    Array.isArray(attackerDice) &&
    attackerDice.length === activeBattle.attackingDiceCount &&
    attackerDice.every(d => d >= 1 && d <= 6) &&
    Array.isArray(defenderDice) &&
    defenderDice.length >= 1 &&
    defenderDice.length <= Math.min(2, territories[activeBattle.defendingTerritoryIndex].armies) &&
    defenderDice.every(d => d >= 1 && d <= 6),
  reduce: ({ attackerDice, defenderDice }) => {
    const attackingTerritoryIndex = activeBattle.attackingTerritoryIndex;
    const defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;
    const loses = getLoses(attackerDice, defenderDice);

    return {
      territories: replaceElements(territories, {
        [attackingTerritoryIndex]: {
          owner: territories[attackingTerritoryIndex].owner,
          armies: territories[attackingTerritoryIndex].armies - loses.attacker,
        },
        [defendingTerritoryIndex]: {
          owner: territories[defendingTerritoryIndex].owner,
          armies: territories[defendingTerritoryIndex].armies - loses.defender,
        },
      }),
    };
  },
});
