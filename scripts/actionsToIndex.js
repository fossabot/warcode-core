const { ACTIONS, STATES, PSEUDOSTATES } = require('../src/constants');
const fs = require('fs');

const gettingStared = () => `## Getting Started

### Install the package
\`\`\` shell
npm init
npm install --save matthewspivey/warcode-core#gh-pages
\`\`\`

### index.js
\`\`\` javascript
const { actionCreators, reduce } = require('warcode-core');

let state = reduce();
console.log(state.stateKey);
state = reduce(state, actionCreators.startMatch(3));
console.log(state.stateKey);
state = reduce(state, actionCreators.selectFirstPlayer(0));
console.log(state.stateKey);
\`\`\`

### Run the filew
\`\`\` shell
node index.js
\`\`\`

### Expected output
\`\`\`
Initializing
SelectingFirstPlayer
OccupyingTerritorygettingStared
\`\`\`
`;

const toRow = ({ name, markdownURL, doc }) => {
  const summary = !doc.summary ? '' : doc.summary.children[0].children[0].value.replace(/(\r\n|\n|\r\w)/gm, ' ').replace(/\s\s+/g, ' ');

  return `| [${name}](${markdownURL}) | ${summary} |`;
};

module.exports = (actions, stateDiagramURL) => `
${gettingStared()}

## Gameplay State machine

Gameplay includes many phases. These are illustrated in the following state diagram.

![State Machine](${stateDiagramURL})

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


Before each players turn, the state passes through the [SetupNextTurn](docs/setupnextturn.html)
pseudostate.

## Match Config
To setup a game match, we need some configuration to define game board and cards.

\`\`\` javascript
${fs.readFileSync('data/traditional.json', 'utf-8')}
\`\`\`
  `;
