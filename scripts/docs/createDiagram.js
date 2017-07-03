const Viz = require('viz.js');
const { transitions } = require('../../dist/transitions');
const { ACTIONS, STATES,  PSEUDOSTATES } = require('../../dist/constants');

process.setMaxListeners(0);

const dotToSvg = (dot) => Viz(dot, { format: 'svg', engine: 'dot' });

const adjacencyList = {};
transitions.forEach(([from, to,, action]) => {
  if (!adjacencyList[from]) {
    adjacencyList[from] = [];
  }
  adjacencyList[from].push({ to, action });
});

const states = new Set(Object.values(STATES));
const actionToState = {};
transitions
  .filter(([from,,, action]) => !!action)
  .forEach(([from, to, t, action]) => actionToState[action] = from);

const traverse = action => {
  const state = actionToState[action];
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
}

const toDot = transitions => {
  const vertices = new Set();
  transitions.forEach(([from, to]) => {
    vertices.add(from);
    vertices.add(to);
  });
  const foundStates = [];
  const foundPseudostates = [];
  vertices.forEach(v => states.has(v) ? foundStates.push(v) : foundPseudostates.push(v));

  return [
    'digraph {',
    ...foundStates.map(s => `    ${s}[shape="box", style=rounded];`),
    ...foundPseudostates.map(s => `    ${s}[shape="diamond", style=""];`),
    ...transitions.map(([from, to,, action]) => `    ${from} -> ${to}[label="${action||''}"];`),
    '}'
  ].join('\n');
};

module.exports = {
  createCompleteDiagram: () => dotToSvg(toDot(transitions)),
  diagramState: (state) => dotToSvg(toDot(traverse(state))),
};
