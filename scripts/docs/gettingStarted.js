module.exports = () => `# Getting Started

#### Install the package
\`\`\` shell
npm init
npm install --save matthewspivey/warcode-core#gh-pages
\`\`\`

#### Create an index.js file
\`\`\` javascript
const { actionCreators, reduce } = require('warcode-core');

let state = reduce();
console.log(state.stateKey);
state = reduce(state, actionCreators.startMatch(3));
console.log(state.stateKey);
state = reduce(state, actionCreators.selectFirstPlayer(0));
console.log(state.stateKey);
\`\`\`

#### Run it
\`\`\` shell
node index.js
\`\`\`

#### Expected output
\`\`\`
Initializing
SelectingFirstPlayer
OccupyingTerritorygettingStared
\`\`\`
`;
