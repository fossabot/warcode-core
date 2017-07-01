import Viz from 'viz.js';
import documentation from 'documentation';
import fs from 'fs';
import { STATES, PSEUDOSTATES } from '../src/constants';
import transitions from '../src/transitions/';

// TODO create /dist/docs

(function documentActionCreators() {
  // documentation.build(['./src/actionCreators.js'], {})
  //   // .then(documentation.formats.md)
  //   .then(output => {
  //     console.log(output);
  //     // fs.writeFileSync('./dist/docs/output.md', output);
  //   });
  //
  // documentation.formats.md(docs, {}, (err, res) => {
  //   if (err) {
  //     console.error('err', err);
  //     return;
  //   }
  //   console.log(res)
  //   // fs.writeFile("dist/docs/action-creators.md", res, err2 =>
  //   //   err2 => err2 ? console.error(err2) : undefined);
  // });
})();

// (function documentTransitions() {
//   const classOrder = [
//     'StartMatch',
//     'SelectFirstPlayer',
//     'OccupyTerritory',
//     'PlaceAdditionalArmy',
//     'SetupNextTurn',
//     'TradeCards',
//     'EndTrade',
//     'PlaceNewArmies',
//     'EndAttack',
//     'Battle',
//     'RollDice',
//     'Capture',
//     'Fortify',
//     'EndTurn',
//     'DrawRandomCard'
//   ];
//
//   const filenames = classOrder.map(c => `./src/transitions/${c}.js`);
//   const headerSection = {
//     name: 'WarCode Mechanics',
//     description: `
// Gameplay includes numerous phases.
// This package uses a state machine to structure.
// The following diagram illustrates the states and transitions
// as a state machine.
//
// ![State Machine](https://rawgit.com/matthewspivey/warcode-core/master/docs/state-machine.svg)
//
// This diagram contains several elements.
// * _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
// * _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
// * _Lines_ are transitions.
//
// The transitions with labels are documented below.
// `
//   };
//   const options = { toc: [headerSection, ...classOrder] };
//   const docs = documentation.buildSync(filenames, options);
//   const docsModified = docs.map(d =>
//     Object.assign({}, d,  { params: undefined, returns: undefined }));
//
//   documentation.formats.md(docsModified, {}, (err, res) => {
//     if (err) {
//       console.error('err', err);
//       return;
//     }
//     fs.writeFile("docs/mechanics.md", res, err2 => err2 ? console.log(err2) : undefined);
//   });
// })();

// Build state diagram
const dot = [
  'digraph {',
  ...Object.values(STATES).map(s => `    ${s}[shape="box", style=rounded];`),
  ...Object.values(PSEUDOSTATES).map(s => `    ${s}[shape="diamond", style=""];`),
  ...transitions.map(([from, to,, action]) => `    ${from} -> ${to}[label="${action||''}"];`),
  '}'
].join('\n');
const image = Viz(dot, { format: 'svg', engine: 'dot' });
fs.writeFile("dist/docs/state-machine.svg", image, err => err ? console.error(err) : undefined);
