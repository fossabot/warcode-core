const { ACTIONS, STATES, PSEUDOSTATES } = require('../../src/constants');

const toRow = ({ name, markdownURL, doc }) => {
  const summary = (!doc.summary) ? '' : doc.summary.children[0].children[0].value;

  return `[\`${name}\`](${markdownURL}) | ${summary}`;
}

module.exports = (actions, stateDiagramURL) => `

## Gameplay State machine

Gameplay includes many phases. These are illustrated in the following state diagram.

![State Machine](${stateDiagramURL})

This state diagram contains several elements.
* _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
* _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
* _Lines_ are transitions.
* _Line labels_ are player actions, such as a selecting a territory.

## Actions & States
Every play you make during a match is modeled by one of the following actions

Action              | Description
------------------- | -----------
${actions.map(toRow).join('\n')}

Before each players turn, the state passes through the [\`SetupNextTurn\`](setupnextturn.html)
pseudostate.
  `;
