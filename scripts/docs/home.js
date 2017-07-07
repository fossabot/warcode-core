module.exports = () => `
* _Easy to use_ - send play move and state, receive new state
* _Stateless_ - easily reply each player move
* _Customizable_ - caller controls randomness, game board, and rules
* _ES5_ - transpiled to run in older browser and Node versions
* _Small_ - less than 6 KB compressed

# Getting Started

Install the package
\`\`\` shell
npm init
npm install --save warcode-core
\`\`\`

Create an index.js file
\`\`\` javascript
const { actionCreators, reduce } = require('warcode-core');

let state = reduce();
console.log(state.stateKey);
state = reduce(state, actionCreators.startMatch(3));
console.log(state.stateKey);
state = reduce(state, actionCreators.selectFirstPlayer(0));
console.log(state.stateKey);
\`\`\`

Run it
\`\`\` shell
node index.js
\`\`\`

Expected output
\`\`\`
Initializing
SelectingFirstPlayer
OccupyingTerritorygettingStared
\`\`\`

# Gameplay

Gameplay includes many phases. These are illustrated in the following state diagram.

![State Machine](./diagram.svg)

This state diagram contains the following
* □ _States_ are moments in the game waiting on a player's move, such as rolling the dice.
* ◇ _Pseudostates_ are temporary states that allow for conditional behavior while the processing a player's move.
* ｜ _Transitions_ have guards that control the flow. Their reducers compute the new game state, computing the new game state for cards and the board at each transition.
* 𝐀 _Labels_ identify player actions, such as a selecting a territory

## Actions
Every play you make during a match is modeled by one of the following actions.
  `;
