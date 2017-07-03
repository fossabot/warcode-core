const documentation = require('documentation');
const fs = require('fs');
const actionToMarkdown = require('./actionToMarkdown');
const actionsToIndex = require('./actionsToIndex');
const { createCompleteDiagram, diagramState } = require('./createDiagram');
const { ACTIONS, STATES, PSEUDOSTATES } = require('../../dist/constants');
const { transitions } = require ('../../dist/transitions/');

// TODO - document to gh-pages branch in version numbered directory

const actionCreatorsFilename = '../src/actionCreators.js';
const outDirectory = '../out';
const indexFilename = `${outDirectory}/index.md`;
const stateDiagramFilename = `${outDirectory}/state-machine.svg`;
const stateDiagramURL = `state-machine.svg`;
const actionsDir = `${outDirectory}/actions`;

if (!fs.existsSync(outDirectory)) fs.mkdirSync(outDirectory);
if (!fs.existsSync(actionsDir)) fs.mkdirSync(actionsDir);

const handleWriteError = err => err ? console.error(err) : undefined;

documentation.build(actionCreatorsFilename, { extension: 'es6' })
  .then(docs => {
    const actions = Object.values(ACTIONS).map(name => ({
      name,
      doc: docs.find(d => d.name.toLowerCase() === name.toLowerCase()),
      markdownFilename: `${actionsDir}/${name.toLowerCase()}.md`,
      markdownURL: `actions/${name.toLowerCase()}.html`,
      diagramFilename: `${actionsDir}/${name.toLowerCase()}.svg`,
      diagramURL: `actions/${name.toLowerCase()}.svg`,
    }));

    actions.forEach(({ doc, markdownFilename, name, diagramFilename }) => {
      const markdown = actionToMarkdown(name, doc, diagramFilename);
      fs.writeFile(markdownFilename, markdown, handleWriteError);
    });

    actions.forEach(({ name, diagramFilename }) => {
      const svg = diagramState(name);
      fs.writeFile(diagramFilename, svg, handleWriteError);
    });

    const index = actionsToIndex(actions, stateDiagramURL);
    fs.writeFile(indexFilename, index, handleWriteError);

    fs.writeFile(stateDiagramFilename, createCompleteDiagram(), handleWriteError);
  })
  .catch(err => {
    console.error(err);
  });