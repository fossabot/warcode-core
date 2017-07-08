import fs from 'fs';
import SVGO from 'svgo';
import Viz from 'viz.js';
import { transitions } from '../../src/transitions';
import { ACTIONS, STATES, PSEUDOSTATES } from '../../src/constants';

process.setMaxListeners(0);

const svgo = new SVGO();

const dotToSvg = dot => Viz(dot, { format: 'svg', engine: 'dot' });

const adjacencyList = {};
transitions.forEach(([from, to, , action]) => {
  if (!adjacencyList[from]) {
    adjacencyList[from] = [];
  }
  adjacencyList[from].push({ to, action });
});

const states = new Set(Object.values(STATES));

const traverse = state => {
  const seen = new Set();
  const seenStates = new Set();
  const queue = [];
  let next = state;
  while (next) {
    if (adjacencyList[next] && !seenStates.has(next) && (next === state || !states.has(next))) {
      adjacencyList[next].forEach(t => {
        queue.push(t.to);
        seen.add([next, t.to, () => {}, t.action]);
      });
    }
    seenStates.add(next);
    next = queue.shift();
  }
  return Array.from(seen);
};

const toDot = (transitions, highlight) => {
  const vertices = new Set();
  transitions.forEach(([from, to]) => {
    vertices.add(from);
    vertices.add(to);
  });
  const foundStates = [];
  const foundPseudostates = [];
  vertices.forEach(v => (states.has(v) ? foundStates.push(v) : foundPseudostates.push(v)));

  const edgeAttributes = (from, to, action) =>
    [
      (highlight && from === highlight.from && to === highlight.to) ? 'penwidth="2"' : undefined,
      action ? `label="${action}"` : undefined,
    ].filter(a => a).join(',');

  return [
    'digraph {',
    ...foundStates.map(s =>
      `    ${s}[shape="box", style=rounded];`),
    ...foundPseudostates.map(s =>
      `    ${s}[shape="diamond"];`),
    ...transitions.map(([from, to, , action]) =>
      `    ${from} -> ${to}[${edgeAttributes(from, to, action)}];`),
    '}',
  ].join('\n');
};

const writeSVG = (filename, svg) => {
  svgo.optimize(svg).then(compressed =>
    fs.writeFile(filename, compressed.data, err => (err ? console.error(err) : undefined))
  );
}

module.exports = (filename, state, highlight) =>
  writeSVG(filename, dotToSvg(toDot(state ? traverse(state) : transitions, highlight)));
