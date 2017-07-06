import { ACTIONS, STATES, PSEUDOSTATES } from '../../src/constants';

const toRow = ({ name, doc }) => {
  const summary = !doc.summary ? '' : doc.summary.children[0].children[0].value.replace(/(\r\n|\n|\r\w)/gm, ' ').replace(/\s\s+/g, ' ');

  return `| [${name}](./${name.toLowerCase()}) | ${summary} |`;
};

module.exports = (actions) => `# Gameplay State Machine

Gameplay includes many phases. These are illustrated in the following state diagram.

![State Machine](./diagram.svg)

This state diagram contains several elements.
* _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
* _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
* _Lines_ are transitions.
* _Line labels_ are player actions, such as a selecting a territory.

### Actions & States
Every play you make during a match is modeled by one of the following actions


| Action              | Description |
| :------------------ | :---------- |
${actions.map(toRow).join('\n')}


Before each players turn, the state passes through the [SetupNextTurn](./setupnextturn)
pseudostate.
  `;