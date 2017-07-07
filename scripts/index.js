import documentation from 'documentation';
import fs from 'fs';
import SVGO from 'svgo';
import actionToMarkdown from './docs/actionToMarkdown';
import pseudoToMarkdown from './docs/pseduoToMarkdown';
import actionsToStateMachine from './docs/actionsToStateMachine';
import gettingStarted from './docs/gettingStarted';
import home from './docs/home';
import matchConfig from './docs/matchConfig';
import { createCompleteDiagram, diagramState } from './docs/createDiagram';
import { ACTIONS, STATES, PSEUDOSTATES } from '../src/constants';
import { transitions } from '../src/transitions/'; // must be raw source

const svgo = new SVGO();
const jsdocFilenames = ['src/actionCreators.js', 'src/transitions/SetupNextTurn.js'];
const indexFilename = 'dist/index.md';

if (!fs.existsSync('dist')) fs.mkdirSync('dist');

const handleWriteError = err => (err ? console.error(err) : undefined);

const configYml = `
---
theme: jekyll-theme-cayman
title: WarCode Core
---
`;
fs.writeFile('dist/_config.yml', configYml, handleWriteError);

const writeSVG = (filename, svg) => {
  svgo.optimize(svg).then(compressed =>
    fs.writeFile(`${filename.toLowerCase()}.svg`, compressed.data, handleWriteError)
  );
}

writeSVG('diagram', createCompleteDiagram());

documentation
  .build(jsdocFilenames, { extension: 'es6' })
  .then(docs => {
    const transitionsWithActions = transitions.filter(([, , , a]) => !!a);
    const actions = transitionsWithActions.map(([from, to, t, action]) => ({
      from,
      to,
      action,
      doc: docs.find(d => d.name.toLowerCase() === action.toLowerCase()),
    }));

    // Document SetupNextTurn markdown
    // TODO run jsdoc on transitions, and capture those with docs
    const key = PSEUDOSTATES.SETUP_NEXT_TURN;
    const setupNextTurnDocs = docs.find(
      d => d.name.toLowerCase() === key.toLowerCase()
    );
    const setupNextTurnMarkdown = pseudoToMarkdown(PSEUDOSTATES.SETUP_NEXT_TURN, PSEUDOSTATES.HAS_CARDS, setupNextTurnDocs);

    const md = [
      home(),
      gettingStarted(),
      actionsToStateMachine(actions),
      ...actions.map(({ action, doc }) => actionToMarkdown(action, doc)),
      '## Other Transitions',
      setupNextTurnMarkdown,
      matchConfig(),
    ];

    // SVGs for actions
    actions.forEach(({ from }) => writeSVG(from, diagramState(from)));

    // write markdown
    fs.writeFile('dist/index.md', md.join('\n'), handleWriteError);
  })
  .catch(err => {
    console.error(err);
  });
