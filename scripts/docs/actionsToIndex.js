const { ACTIONS, STATES, PSEUDOSTATES } = require('../../src/constants');

module.exports = (actions, stateDiagram) => `

## Gameplay State machine

Gameplay includes many phases. These are illustrated in the following state diagram.

![State Machine](${stateDiagram})

This state diagram contains several elements.
* _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
* _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
* _Lines_ are transitions.
* _Line labels_ are player actions, such as a selecting a territory.

## Actions
Each move you may make as a player is modeled in the following actions
${actions.map(({ name, markdownURL }) => `* [${name}](${markdownURL})`).join('\n')}
  `;
