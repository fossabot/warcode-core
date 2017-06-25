import Viz from 'viz.js';
import documentation from 'documentation';
import fs from 'fs';
import {STATES, PSEUDOSTATES} from '../src/constants';
import StateMachine from '../src/StateMachine';

(function documentActionCreators() {
  const docs = documentation.buildSync(['./src/actionCreators.js'], {});

  documentation.formats.md(docs, {}, (err, res) => {
    if (err) {
      console.error('err', err);
      return;
    }
    fs.writeFile("docs/action-creators.md", res, err2 => {
      if(err2) {
        return console.log(err2);
      }
    });
  });
})();

(function documentTransitions() {
  const classOrder = [
    'StartMatch',
    'SelectFirstPlayer',
    'OccupyTerritory',
    'PlaceAdditionalArmy',
    'SetupNextTurn',
    'TradeCards',
    'EndTrade',
    'PlaceNewArmies',
    'EndAttack',
    'Battle',
    'RollDice',
    'Capture',
    'Fortify',
    'EndTurn',
    'DrawRandomCard'
  ];

  const filenames = classOrder.map(c => `./src/transitions/${c}.js`);
  const headerSection = {
    name: 'WarCode Mechanics',
    description: `
Gameplay includes numerous phases.
This package uses a state machine to structure.
The following diagram illustrates the states and transitions
as a state machine.

![State Machine](https://rawgit.com/matthewspivey/warcode-core/master/docs/state-machine.svg)

This diagram contains several elements.
* _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
* _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
* _Lines_ are transitions.

The transitions with labels are documented below.
`
  };
  const options = { toc: [headerSection, ...classOrder] };
  const docs = documentation.buildSync(filenames, options);
  const docsModified = docs.map(d =>
    Object.assign({}, d,  { params: undefined, returns: undefined }));

  documentation.formats.md(docsModified, {}, (err, res) => {
    if (err) {
      console.error('err', err);
      return;
    }
    fs.writeFile("docs/mechanics.md", res, err2 => err2 ? console.log(err2) : undefined);
  });
})();

const getTransitionLines = () => {
  const stateMachine = new StateMachine({});
  const transitions = stateMachine.getTransitions({}, {});
  const edges = transitions.map(([from, to, transition]) => {
    const label = transition.action ? transition.action : '';
    return [from, to, label];
  });

  return edges.map(([from, to, label]) =>
    `    ${from} -> ${to}[label="${label}"];`
  );
};

(function buildStateDiagram() {
  const getStates = () => [
    ...STATES.map(s => `    ${STATES[s]}[shape="box", style=rounded];`),
    ...STATES.map(s => `    ${PSEUDOSTATES[s]}[shape="diamond", style=""];`),
  ];

  const getDot = () =>
    [
      'digraph {',
      ...getStates(),
      ...getTransitionLines(),
      '}'
    ].join('\n');

  const image = Viz(getDot(), { format: 'svg', engine: 'dot' });
  fs.writeFile("docs/state-machine.svg", image, err => err ? console.log(err) : undefined);
})();
