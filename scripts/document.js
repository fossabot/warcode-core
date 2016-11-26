import Viz from 'viz.js';
import documentation from 'documentation';
import fs from 'fs';
import {STATES, PSEUDOSTATES} from '../src/constants';
import StateMachine from '../src/StateMachine';

(function documentActionCreators() {
  const docs = documentation.buildSync(['./src/actionCreators.js'], {});

  documentation.formats.md(docs, {}, function(err, res) {
    if (err) {
      console.error('err', err);
      return;
    }
    fs.writeFile("docs/action-creators.md", res, function(err) {
      if(err) {
        return console.log(err);
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

![State Machine]
(https://matthewspivey.github.io/warcode-core/docs/state-machine.svg)

This diagram contains several elements.
* _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
* _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
* _Lines_ are transitions.

The transitions with labels are documented below.
`
  };
  const options = { toc: [headerSection, ...classOrder] };

  let docs = documentation.buildSync(filenames, options);
  docs = docs.map((d) => {
    d.params = undefined;
    d.returns = undefined;
    return d;
  });

  documentation.formats.md(docs, {}, function(err, res) {
    if (err) {
      console.error('err', err);
      return;
    }
    fs.writeFile("docs/mechanics.md", res, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  });
})();

(function buildStateDiagram() {
  const image = Viz(getDot(), { format: 'svg', engine: 'dot' });
  fs.writeFile("docs/state-machine.svg", image, function(err) {
    if(err) {
      return console.log(err);
    }
  });

  function getDot() {
    const lines = [
      'digraph {',
      ...getStates(),
      ...getTransitionLines(),
      '}'
      ];

    return lines.join('\n');
  }

  function getStates() {
    const lines = [];

    for (const s in STATES) {
      if (STATES.hasOwnProperty(s)) {
        lines.push(`    ${STATES[s]}[shape="box", style=rounded];`);
      }
    }

    for (const s in PSEUDOSTATES) {
      if (PSEUDOSTATES.hasOwnProperty(s)) {
        lines.push(`    ${PSEUDOSTATES[s]}[shape="diamond", style=""];`);
      }
    }

    return lines;
  }

  function getTransitionLines() {
    const edges = StateMachine.getEdges();
    return edges.map(([from, to, label]) => {
      return `    ${from} -> ${to}[label=\"${label}\"];`;
    });
  }
})();
