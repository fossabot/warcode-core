import documentation from 'documentation';
import fs from 'fs';
import actionToMarkdown from './docs/actionToMarkdown';
import pseudoToMarkdown from './docs/pseduoToMarkdown';
import actionsToStateMachine from './docs/actionsToStateMachine';
import gettingStarted from './docs/gettingStarted';
import matchConfig from './docs/matchConfig';
import { createCompleteDiagram, diagramState } from './docs/createDiagram';
import { ACTIONS, STATES, PSEUDOSTATES } from '../src/constants';
import { transitions } from '../src/transitions/'; // must be raw source

const jsdocFilenames = ['src/actionCreators.js', 'src/transitions/SetupNextTurn.js'];
const indexFilename = 'dist/index.md';
const outDirectory = 'dist/docs';

const configYml = `# GitHub Pages config
theme: jekyll-theme-cayman
title: WarCode Core
`;

if (!fs.existsSync('dist')) fs.mkdirSync('dist');

const handleWriteError = err => (err ? console.error(err) : undefined);
fs.writeFile('dist/_config.yml', configYml, handleWriteError);

// Create directory, write index.md, and diagram.svg
const writePage = (directory, md, svg) => {
  if (!fs.existsSync(directory)) fs.mkdirSync(directory);
  if (md) fs.writeFile(`${directory}/index.md`, md, handleWriteError);
  if (svg) fs.writeFile(`${directory}/diagram.svg`, svg, handleWriteError);
}

// Write static pages
writePage('dist', `# nav`);
writePage('dist/getting-started', gettingStarted());
writePage('dist/match-config', matchConfig());

documentation
  .build(jsdocFilenames, { extension: 'es6' })
  .then(docs => {
    const transitionsWithActions = transitions.filter(([, , , a]) => !!a);
    const actions = transitionsWithActions.map(([from, to, t, name]) => ({
      from,
      to,
      name,
      doc: docs.find(d => d.name.toLowerCase() === name.toLowerCase()),
      directory: `dist/machine/${name.toLowerCase()}`
    }));

    // Mardown & SVG for complete state diagram
    writePage('dist/machine', actionsToStateMachine(actions), createCompleteDiagram());

    // Markdown & SVG for actions
    actions.forEach(({ directory, doc, from, name }) =>
      writePage(directory, actionToMarkdown(name, doc), diagramState(from))
    );

    // Document SetupNextTurn markdown
    const key = PSEUDOSTATES.SETUP_NEXT_TURN;
    const setupNextTurnDocs = docs.find(
      d => d.name.toLowerCase() === key.toLowerCase()
    );
    writePage(`dist/machine/${key.toLowerCase()}`, pseudoToMarkdown(key, setupNextTurnDocs));
  })
  .catch(err => {
    console.error(err);
  });
