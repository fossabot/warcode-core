import documentation from 'documentation';
import fs from 'fs';
import { ncp } from 'ncp';
import actionToMarkdown from './docs/actionToMarkdown';
import getDescription from './docs/getDescription';
import getSVG from './docs/createDiagram';
import { ACTIONS, STATES, PSEUDOSTATES } from '../src/constants';
import { transitions } from '../src/transitions/'; // must be raw source

const handleWriteError = err => (err ? console.error(err) : undefined);
if (!fs.existsSync('dist')) fs.mkdirSync('dist');
ncp('scripts/static/', 'dist/', handleWriteError);

const top = svg => `
* _Easy to use_ - send play move and state, receive new state
* _Stateless_ - easily reply each player move
* _Customizable_ - caller controls randomness, game board, and rules
* _ES5_ - transpiled to run in older browser and Node versions
* _Small_ - less than 6 KB compressed

# Getting Started

<script type="text/javascript" src="https://asciinema.org/a/Hw6Oay8FeLXz8ygVcKwvYFJzC.js" id="asciicast-Hw6Oay8FeLXz8ygVcKwvYFJzC" data-t="03" data-autoplay="true" data-loop="true" data-speed="1.5" data-theme="solarized-light" async></script>

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

${svg}

This state diagram contains the following
* □ _States_ are moments in the game waiting on a player's move, such as rolling the dice.
* ◇ _Pseudostates_ are temporary states that allow for conditional behavior while the processing a player's move.
* ｜ _Transitions_ have guards that control the flow. Their reducers compute the new game state, computing the new game state for cards and the board at each transition.
* 𝐀 _Labels_ identify player actions, such as a selecting a territory

## Actions
Every play you make during a match is modeled by one of the following actions.
  `;

const bottom = `# Match Config
To setup a game match, we need some configuration to define game board and cards.

\`\`\` json
${fs.readFileSync('data/traditional.json', 'utf-8')}
\`\`\`
  `;

const transitionsWithActions = transitions.filter(([, , , a]) => !!a);

Promise.all([
  getSVG(),
  documentation.build('src/actionCreators.js', { extension: 'es6' }),
  documentation.build('src/transitions/*.js', { extension: 'es6' }),
  Promise.all(transitionsWithActions.map(([from,,, action]) => getSVG(from, { action }))),
])
  .then(([svg, createrDocs, transitionDocs, transitionSVGs]) => {
    const actions = transitionsWithActions
      .map(([,,, action]) => ({
        action,
        doc: createrDocs.find(d => d.name.toLowerCase() === action.toLowerCase()),
      }))
      .map(({ action, doc }, i) => actionToMarkdown(action, doc, transitionSVGs[i].data));

    const otherTransitions = transitions.filter(([,,t]) => !!t.name);

    // SVGs for transitions
    Promise.all(otherTransitions.map(([from, to]) => getSVG(from, { from, to })))
      .then((svgos) => {
        const otherTransitionMD = otherTransitions.map(([from, to, t], i) => {
          if (!t || !t.name) {
            return '';
          }
          const text = getDescription(transitionDocs.find(d => d.name.toLowerCase() === t.name.toLowerCase()).description);
          const id = `${from.toLowerCase()}-${to.toLowerCase()}`;
          const svg = svgos[i].data;
          return `### ${from} ⇒ ${to}<a name="${id}"></a>\n${svg}\n\n${text}\n`;
        });

        const md = [
          top(svg.data),
          ...actions,
          '## Other Transitions',
          ...otherTransitionMD,
          bottom,
        ].join('\n');

        // write markdown
        fs.writeFile('dist/index.md', md, handleWriteError);
      })
      .catch(err => console.error(err));
  })
  .catch(err => {
    console.error(err);
  });
