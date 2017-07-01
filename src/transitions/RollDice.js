// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './replaceElements';

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

/**
 * Simulate players rolling dice.
 *
 * The attacker and defender may loose armies based on the random outcome of the
 * dice rolled. Compare the highest die rolled by the attacker and defender -
 * if the attacker's die is higher the defending territory looses an army,
 * otherwise the attacker looses an army. If the attacker and defender rolled
 * two or more dice, compare the second highest pair. If the attacker's die is
 * higher the defending territory looses an army, otherwise the attacker looses
 * an army.
 *
 * The owner of the defending territory may roll a single die when the defending
 * territory contains a single army. When the territory contains multiple
 * armies, the defender may roll either one or two dice.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories, activeBattle } = extendedState;

  return {
    guard: ({ attackerDice, defenderDice }) =>
      !!activeBattle &&
      Array.isArray(attackerDice) &&
      attackerDice.length === activeBattle.attackingDiceCount &&
      attackerDice.every(d => d >= 1 && d <= 6) &&
      Array.isArray(defenderDice) &&
      defenderDice.length >= 1 &&
      defenderDice.length <=
        Math.min(2, territories[activeBattle.defendingTerritoryIndex].armies) &&
      defenderDice.every(d => d >= 1 && d <= 6),
    reduce: ({ attackerDice, defenderDice }) => {
      if (!activeBattle) {
        return extendedState;
      }

      const attackingTerritoryIndex = activeBattle.attackingTerritoryIndex;
      const defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;
      const loses = getLoses(attackerDice, defenderDice);

      return {
        ...extendedState,
        territories: replaceElements(extendedState.territories, {
          [attackingTerritoryIndex]: {
            owner: extendedState.territories[attackingTerritoryIndex].owner,
            armies: extendedState.territories[attackingTerritoryIndex].armies - loses.attacker,
          },
          [defendingTerritoryIndex]: {
            owner: extendedState.territories[defendingTerritoryIndex].owner,
            armies: extendedState.territories[defendingTerritoryIndex].armies - loses.defender,
          },
        }),
      };
    },
  };
}
