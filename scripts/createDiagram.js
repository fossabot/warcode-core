const Viz = require('viz.js');
const { transitions } = require('../src/transitions');
const { ACTIONS, STATES, PSEUDOSTATES } = require('../src/constants');

process.setMaxListeners(0);

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

const toDot = (transitions, docPath) => {
  const vertices = new Set();
  transitions.forEach(([from, to]) => {
    vertices.add(from);
    vertices.add(to);
  });
  const foundStates = [];
  const foundPseudostates = [];
  vertices.forEach(v => (states.has(v) ? foundStates.push(v) : foundPseudostates.push(v)));

  const edge = ([from, to, , action]) => {
    const attributes = [`label="${action || ''}"`];
    const filename = action ? `${action.toLowerCase()}.html` : undefined;
    if (docPath) {
      attributes.push(`href="${docPath}/${filename}"`);
    }
    return `    ${from} -> ${to}[${attributes.join(', ')}];`;
  };

  return [
    'digraph {',
    ...foundStates.map(s => `    ${s}[shape="box", style=rounded];`),
    ...foundPseudostates.map(s => `    ${s}[shape="diamond", style=""];`),
    ...transitions.map(edge),
    '}',
  ].join('\n');
};

module.exports = {
  createCompleteDiagram: () => dotToSvg(toDot(transitions, './actions')),
  diagramState: state => dotToSvg(toDot(traverse(state))),
};
