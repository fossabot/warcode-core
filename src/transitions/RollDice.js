import {ACTIONS} from '../constants.js';
import TransitionGuarded from './TransitionGuarded';

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
export default function(matchConfig, extendedState) {
  const {territories, activeBattle} = extendedState;

  const guard = (action) => {
    const {attackerDice, defenderDice} = action;
    const {attackingDiceCount, defendingTerritoryIndex} = activeBattle;
    const maxDefenderDice = Math.min(2, territories[defendingTerritoryIndex].armies);

    return Array.isArray(attackerDice)
      && attackerDice.length === attackingDiceCount
      && attackerDice.every(d => { return d >= 1 && d <= 6; })
      && Array.isArray(defenderDice)
      && defenderDice.length >= 1
      && defenderDice.length <= maxDefenderDice
      && defenderDice.every(d => { return d >= 1 && d <= 6; });
  };

  const reduce = (action) => {
    const {attackerDice, defenderDice} = action;
    const {attackingTerritoryIndex, defendingTerritoryIndex} = activeBattle;
    const loses = getLoses(attackerDice, defenderDice);

    return {
      ...extendedState,
      territories: Object.assign([], extendedState.territories, {
        [attackingTerritoryIndex]: {
          owner: extendedState.territories[attackingTerritoryIndex].owner,
          armies: extendedState.territories[attackingTerritoryIndex].armies - loses.attacker
        },
        [defendingTerritoryIndex]: {
          owner: extendedState.territories[defendingTerritoryIndex].owner,
          armies: extendedState.territories[defendingTerritoryIndex].armies - loses.defender
        }
      })
    };
  };

  return new TransitionGuarded(ACTIONS.ROLL_DICE, guard, reduce);
}

function getLoses(attackerDice, defenderDice) {
  const diceToCompare = Math.min(attackerDice.length, defenderDice.length);
  const sortDecending = (a,b) => { return a < b; };
  const attackerDiceSorted = [...attackerDice].sort(sortDecending);
  const defenderDiceSorted = [...defenderDice].sort(sortDecending);
  const loses = {
    defender: 0,
    attacker: 0
  };
  for (let i = 0; i < diceToCompare; i++) {
    if (attackerDiceSorted[i] > defenderDiceSorted[i]) {
      loses.defender++;
    } else {
      loses.attacker++;
    }
  }
  return loses;
};
