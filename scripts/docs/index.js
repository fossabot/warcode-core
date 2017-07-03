const documentation = require('documentation');
const fs = require('fs');
const actionToMarkdown = require('./actionToMarkdown');
const actionsToIndex = require('./actionsToIndex');
const { createCompleteDiagram, diagramState } = require('./createDiagram');
const { ACTIONS, STATES, PSEUDOSTATES } = require('../../src/constants');
const { transitions } = require ('../../src/transitions/'); // must be raw source

const actionCreatorsFilename = 'src/actionCreators.js'; // must be raw source
const outDirectory = '.';
const indexFilename = `${outDirectory}/index.md`;
const stateDiagramFilename = `${outDirectory}/state-machine.svg`;
const stateDiagramURL = 'state-machine.svg';
const actionsDir = `${outDirectory}/actions`;

if (!fs.existsSync(outDirectory)) fs.mkdirSync(outDirectory);
if (!fs.existsSync(actionsDir)) fs.mkdirSync(actionsDir);

const handleWriteError = err => err ? console.error(err) : undefined;

documentation.build(actionCreatorsFilename, { extension: 'es6' })
  .then(docs => {
    const transitionsWithActions = transitions.filter(([,,,a]) => !!a);
    const actions =transitionsWithActions.map(([from, to, t, name]) => ({
      from,
      to,
      name,
      t,
      doc: docs.find(d => d.name.toLowerCase() === name.toLowerCase()),
      markdownFilename: `${actionsDir}/${name.toLowerCase()}.md`,
      markdownURL: `actions/${name.toLowerCase()}.html`,
      diagramFilename: `${actionsDir}/${name.toLowerCase()}.svg`,
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

    const index = actionsToIndex(actions, stateDiagramURL);
    fs.writeFile(indexFilename, index, handleWriteError);

    fs.writeFile(stateDiagramFilename, createCompleteDiagram(), handleWriteError);
  })
  .catch(err => {
    console.error(err);
  });
