const documentation = require('documentation');
const fs = require('fs');
const actionToMarkdown = require('./actionToMarkdown');
const pseudoToMarkdown = require('./pseduoToMarkdown');
const actionsToIndex = require('./actionsToIndex');
const { createCompleteDiagram, diagramState } = require('./createDiagram');
const { ACTIONS, STATES, PSEUDOSTATES } = require('../src/constants');
const { transitions } = require('../src/transitions/'); // must be raw source

const jsdocFilenames = ['src/actionCreators.js', 'src/transitions/SetupNextTurn.js'];
const indexFilename = 'dist/index.md';
const outDirectory = 'dist/docs';
const stateDiagramFilename = 'dist/state-machine.svg';
const stateDiagramURL = 'state-machine.svg';

const configYml = `# GitHub Pages config
theme: jekyll-theme-cayman
title: WarCode
`;

if (!fs.existsSync('dist')) fs.mkdirSync('dist');
if (!fs.existsSync('dist/docs')) fs.mkdirSync('dist/docs');
if (!fs.existsSync('dist/docs/actions')) fs.mkdirSync('dist/docs/actions');

const handleWriteError = err => (err ? console.error(err) : undefined);
fs.writeFile('dist/_config.yml', configYml, handleWriteError);

documentation
  .build(jsdocFilenames, { extension: 'es6' })
  .then(docs => {
    const transitionsWithActions = transitions.filter(([, , , a]) => !!a);
    const actions = transitionsWithActions.map(([from, to, t, name]) => ({
      from,
      to,
      name,
      t,
      doc: docs.find(d => d.name.toLowerCase() === name.toLowerCase()),
      markdownFilename: `dist/docs/actions/${name.toLowerCase()}.md`,
      markdownURL: `docs/actions/${name.toLowerCase()}.html`,
      diagramFilename: `dist/docs/actions/${name.toLowerCase()}.svg`,
      diagramURL: `${name.toLowerCase()}.svg`,
    }));

    actions.forEach(({ doc, markdownFilename, name, t, diagramURL }) => {
      const markdown = actionToMarkdown(name, doc, t, diagramURL);
      fs.writeFile(markdownFilename, markdown, handleWriteError);
    });

    actions.forEach(({ from, diagramFilename }) => {
      const svg = diagramState(from);
      fs.writeFile(diagramFilename, svg, handleWriteError);
    });

    const setupNextTurnDocs = docs.find(
      d => d.name.toLowerCase() === PSEUDOSTATES.SETUP_NEXT_TURN.toLowerCase()
    );
    const setupNextTurn = pseudoToMarkdown(PSEUDOSTATES.SETUP_NEXT_TURN, setupNextTurnDocs);
    fs.writeFile(
      `${outDirectory}/${PSEUDOSTATES.SETUP_NEXT_TURN.toLowerCase()}.md`,
      setupNextTurn,
      handleWriteError
    );

    const index = actionsToIndex(actions, stateDiagramURL);
    fs.writeFile(indexFilename, index, handleWriteError);

    fs.writeFile(stateDiagramFilename, createCompleteDiagram(), handleWriteError);
  })
  .catch(err => {
    console.error(err);
  });
