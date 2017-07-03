const { ACTIONS, STATES, PSEUDOSTATES } = require('../../dist/constants');

module.exports = (actions, stateDiagram) => `
Gameplay includes numerous phases.
The following diagram illustrates the states and transitions as a state machine.

![State Machine](${stateDiagram})

This diagram contains several elements.
* _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
* _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
* _Lines_ are transitions.

Actions
${actions.map(({ name, markdownURL }) => `* [${name}](${markdownURL})`).join('\n')}
  `;
