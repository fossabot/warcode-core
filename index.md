
* _Easy to use_ - send play move and state, receive new state
* _Stateless_ - easily reply each player move
* _Customizable_ - caller controls randomness, game board, and rules
* _ES5_ - transpiled to run in older browser and Node versions
* _Small_ - less than 6 KB compressed

# Getting Started

<script type="text/javascript" src="https://asciinema.org/a/Hw6Oay8FeLXz8ygVcKwvYFJzC.js" id="asciicast-Hw6Oay8FeLXz8ygVcKwvYFJzC" data-t="03" data-autoplay="true" data-loop="true" data-speed="1.5" data-theme="solarized-light" async></script>

Install the package
``` shell
npm init
npm install --save warcode-core
```

Create an index.js file
``` javascript
const { actionCreators, reduce } = require('warcode-core');

let state = reduce();
console.log(state.state);
state = reduce(state, actionCreators.startMatch(3));
console.log(state.state);
state = reduce(state, actionCreators.selectFirstPlayer(0));
console.log(state.state);
```

Run it
``` shell
node index.js
```

Expected output
```
Initializing
SelectingFirstPlayer
OccupyingTerritorygettingStared
```

# Gameplay

Gameplay includes many phases. These are illustrated in the following state diagram.

<svg width="1000" height="1708" viewBox="0 0 749.96 1281.2" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 1277.2)"><path fill="#fff" stroke="transparent" d="M-4 4v-1281.2h749.956V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M247.913-1273.2h-53.87c-6 0-12 6-12 12v12c0 6 6 12 12 12h53.87c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="220.978" y="-1251">Initializing</text></g><g class="node"><path fill="none" stroke="#000" d="M273.51-1184.4H168.446c-6 0-12 6-12 12v12c0 6 6 12 12 12H273.51c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="220.978" y="-1162.2">SelectingFirstPlayer</text></g><g class="edge"><path fill="none" stroke="#000" d="M220.978-1236.8v41.933"/><path stroke="#000" d="M224.478-1194.472l-3.5 10-3.5-10h7z"/><text text-anchor="middle" x="252.08" y="-1206.6">StartMatch</text></g><g class="node"><path fill="none" stroke="#000" d="M220.978-1095.6l-86.822 18 86.822 18 86.823-18-86.823-18z"/><text text-anchor="middle" x="220.978" y="-1073.4">InitialChoice</text></g><g class="edge"><path fill="none" stroke="#000" d="M220.978-1148v41.933"/><path stroke="#000" d="M224.478-1105.672l-3.5 10-3.5-10h7z"/><text text-anchor="middle" x="268.798" y="-1117.8">SelectFirstPlayer</text></g><g class="node"><path fill="none" stroke="#000" d="M115.935-1022.6H12.022c-6 0-12 6-12 12v12c0 6 6 12 12 12h103.913c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="63.978" y="-1000.4">OccupyingTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M185.978-933.8l-113.382 18 113.382 18 113.383-18-113.383-18z"/><text text-anchor="middle" x="185.978" y="-911.6">HasPlacedArmies</text></g><g class="edge"><path fill="none" stroke="#000" d="M67.544-986.559c3.097 11.338 8.666 25.515 18.368 34.759 10.752 10.244 24.627 17.605 38.6 22.883"/><path stroke="#000" d="M125.853-932.157l8.312 6.57-10.595.047 2.283-6.617z"/><text text-anchor="middle" x="133.011" y="-956">OccupyTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M284.013-1022.6h-126.07c-6 0-12 6-12 12v12c0 6 6 12 12 12h126.07c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="220.978" y="-1000.4">PlacingAdditionalArmy</text></g><g class="edge"><path fill="none" stroke="#000" d="M199.007-986.34c-4.793 5.194-9.224 11.228-11.887 17.74-3.172 7.757-4.225 16.706-4.267 25.007"/><path stroke="#000" d="M186.352-943.696l-3.095 10.133-3.9-9.851 6.995-.282z"/><text text-anchor="middle" x="249.407" y="-956">PlaceAdditionalArmy</text></g><g class="node"><path fill="none" stroke="#000" d="M542.453-699h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="507.978" y="-676.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M496.607-610.2H395.35c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="445.978" y="-588">PlacingNewArmies</text></g><g class="edge"><path fill="none" stroke="#000" d="M495.132-662.6l-30.69 43.955"/><path stroke="#000" d="M467.19-616.468l-8.594 6.196 2.855-10.203 5.74 4.007z"/><text text-anchor="middle" x="510.576" y="-632.4">EndTrade</text></g><g class="node"><path fill="none" stroke="#000" d="M430.978-787.8l-68.894 18 68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="430.978" y="-765.6">HasCards</text></g><g class="edge"><path fill="none" stroke="#000" d="M464.036-699.091c-7.692-4.844-14.95-10.77-20.356-17.909-5.343-7.053-8.475-16.03-10.3-24.573"/><path stroke="#000" d="M429.897-741.187l1.846-10.433 5.063 9.307-6.909 1.126z"/><text text-anchor="middle" x="476.628" y="-721.2">TradeCards</text></g><g class="node"><path fill="none" stroke="#000" d="M442.978-521.4l-143.577 18 143.577 18 143.577-18-143.577-18z"/><text text-anchor="middle" x="442.978" y="-499.2">HasUndeployedArmies</text></g><g class="edge"><path fill="none" stroke="#000" d="M404.046-574.188c-6.822 4.83-12.971 10.772-17.02 17.988-7.13 12.708 1.98 24.175 14.782 33.15"/><path stroke="#000" d="M404.008-525.803l6.613 8.278-10.332-2.347 3.72-5.93z"/><text text-anchor="middle" x="436.954" y="-543.6">PlaceNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M461.592-448.4h-37.227c-6 0-12 6-12 12v12c0 6 6 12 12 12h37.227c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="442.978" y="-426.2">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M305.254-359.6h-48.552c-6 0-12 6-12 12v12c0 6 6 12 12 12h48.552c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="280.978" y="-337.4">Fortifying</text></g><g class="edge"><path fill="none" stroke="#000" d="M412.042-418.998c-16.397 6.467-36.664 15.147-53.933 24.598-15.298 8.372-31.343 19.019-44.813 28.556"/><path stroke="#000" d="M315.012-362.768l-10.163 2.995 6.077-8.679 4.086 5.684z"/><text text-anchor="middle" x="388.913" y="-381.8">EndAttack</text></g><g class="node"><path fill="none" stroke="#000" d="M437.414-359.6h-60.872c-6 0-12 6-12 12v12c0 6 6 12 12 12h60.872c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="406.978" y="-337.4">RollingDice</text></g><g class="edge"><path fill="none" stroke="#000" d="M435.52-412c-5.006 12.345-11.69 28.831-17.33 42.746"/><path stroke="#000" d="M421.305-367.624l-7 7.952.513-10.582 6.488 2.63z"/><text text-anchor="middle" x="445.697" y="-381.8">Battle</text></g><g class="node"><path fill="none" stroke="#000" d="M183.978-270.8l-102.113 18 102.113 18 102.114-18-102.114-18z"/><text text-anchor="middle" x="183.978" y="-248.6">HasEarnedCard</text></g><g class="edge"><path fill="none" stroke="#000" d="M244.702-323.661c-8.586 5.163-17.347 11.263-24.609 18.061-8.478 7.937-16.057 18.201-22.055 27.566"/><path stroke="#000" d="M200.988-276.15l-8.195 6.714 2.22-10.36 5.975 3.645z"/><text text-anchor="middle" x="240.421" y="-293">Fortify</text></g><g class="edge"><path fill="none" stroke="#000" d="M276.918-323.382c-3.267 11.123-8.85 25-17.94 34.582-7.918 8.348-18.172 14.986-28.54 20.17"/><path stroke="#000" d="M231.9-265.45l-10.546 1.009 7.616-7.365 2.93 6.357z"/><text text-anchor="middle" x="295.861" y="-293">EndTurn</text></g><g class="node"><path fill="none" stroke="#000" d="M438.978-270.8l-135.322 18 135.322 18 135.323-18-135.323-18z"/><text text-anchor="middle" x="438.978" y="-248.6">HasDefeatedTerritory</text></g><g class="edge"><path fill="none" stroke="#000" d="M406.514-323.45c.3 10.449 1.664 23.649 5.92 34.65 1.545 3.992 3.655 7.934 6.015 11.663"/><path stroke="#000" d="M421.355-279.09l2.909 10.188-8.627-6.15 5.718-4.038z"/><text text-anchor="middle" x="438.25" y="-293">RollDice</text></g><g class="node"><path fill="none" stroke="#000" d="M512.971-197.8h-47.986c-6 0-12 6-12 12v12c0 6 6 12 12 12h47.986c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="488.978" y="-175.6">Capturing</text></g><g class="node"><path fill="none" stroke="#000" d="M601.978-109L462.022-91l139.956 18 139.956-18-139.956-18z"/><text text-anchor="middle" x="601.978" y="-86.8">HasDefeatedOpponent</text></g><g class="edge"><path fill="none" stroke="#000" d="M505.833-161.668c10.39 10.692 24.28 24.143 37.828 34.668 7.237 5.622 15.397 11.12 23.27 16.058"/><path stroke="#000" d="M568.925-113.825l6.71 8.2-10.359-2.227 3.65-5.973z"/><text text-anchor="middle" x="565.137" y="-131.2">Capture</text></g><g class="node"><path fill="none" stroke="#000" d="M147.611-197.8H32.345c-6 0-12 6-12 12v12c0 6 6 12 12 12h115.266c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="89.978" y="-175.6">DrawingRandomCard</text></g><g class="node"><path fill="none" stroke="#000" d="M185.978-860.8l-99.612 18 99.612 18 99.613-18-99.613-18z"/><text text-anchor="middle" x="185.978" y="-838.6">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#000" d="M74.303-197.97c-10.468-14.015-22.325-34.398-22.325-54.83v-517c0-34.36 34.395-52.641 68.333-62.317"/><path stroke="#000" d="M119.754-835.589l10.56.851-8.786 5.92-1.774-6.77z"/><text text-anchor="middle" x="104.849" y="-499.2">DrawRandomCard</text></g><g class="edge"><path fill="none" stroke="#000" d="M193.989-1065.05l-81.787 38.027"/><path stroke="#000" d="M113.496-1023.764l-10.543 1.042 7.592-7.39 2.951 6.348z"/></g><g class="edge"><path fill="none" stroke="#000" d="M220.978-1059.555v26.773"/><path stroke="#000" d="M224.478-1032.69l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#000" d="M241.179-925.124c28.942-6.134 60.15-15.16 68.8-26.676 18.942-25.224 11.264-43.771-5-70.8-10.238-17.013-27.995-29.775-44.554-38.7"/><path stroke="#000" d="M258.745-1058.228l-7.34-7.64 10.502 1.395-3.161 6.245z"/></g><g class="edge"><path fill="none" stroke="#000" d="M185.978-897.755v26.773"/><path stroke="#000" d="M189.478-870.89l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#000" d="M223.723-831.554l165.192 49.22"/><path stroke="#000" d="M390.086-785.636l8.584 6.21-10.583.498 2-6.708z"/></g><g class="edge"><path fill="none" stroke="#000" d="M471.016-762.142c15.856 5.206 32.525 13.893 41.962 28.342 4.725 7.235 5.314 16.26 4.165 24.792"/><path stroke="#000" d="M520.521-708.067L515.04-699l-1.368-10.506 6.85 1.44z"/></g><g class="edge"><path fill="none" stroke="#000" d="M430.907-751.7c.063 10.202.317 23.173 1.071 34.7 2.18 33.314 6.76 71.425 10.09 96.676"/><path stroke="#000" d="M445.547-620.718l-2.139 10.377-4.799-9.446 6.938-.93z"/></g><g class="edge"><path fill="none" stroke="#000" d="M467.617-518.55c6.924-5.616 13.59-12.648 17.361-20.85 4.367-9.494.602-18.96-6.03-27.202"/><path stroke="#000" d="M476.201-564.413l-4.318-9.675 9.41 4.87-5.092 4.805z"/></g><g class="edge"><path fill="none" stroke="#000" d="M442.978-485.355v26.773"/><path stroke="#000" d="M446.478-458.49l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#000" d="M452.936-269.322c4.055-5.788 7.953-12.576 10.042-19.478 13.6-44.92 11.773-60.167 0-105.6-.74-2.855-1.76-5.725-2.952-8.53"/><path stroke="#000" d="M456.783-401.592l-1.309-10.514 7.58 7.403-6.271 3.11z"/></g><g class="edge"><path fill="none" stroke="#000" d="M450.324-236.235l20.526 29.968"/><path stroke="#000" d="M473.863-208.061l2.764 10.228-8.539-6.273 5.775-3.955z"/></g><g class="edge"><path fill="none" stroke="#000" d="M614.002-107.778c11.133-17.212 25.976-45.192 25.976-72.022v-412.4c0-38.918-39.991-61.897-75.95-74.692"/><path stroke="#000" d="M562.885-663.584l-8.368-6.498 10.593-.139-2.226 6.637z"/></g><g class="edge"><path fill="none" stroke="#000" d="M601.978-109.028V-179.8v-161.8c0-54.2-71.293-75.63-118.401-83.874"/><path stroke="#000" d="M482.947-422.03l-9.312-5.054 10.431-1.857-1.119 6.91z"/></g><g class="node"><path fill="none" stroke="#000" d="M601.978-36l-75.523 18 75.523 18 75.524-18-75.524-18z"/><text text-anchor="middle" x="601.978" y="-13.8">GameOver</text></g><g class="edge"><path fill="none" stroke="#000" d="M601.978-72.955v26.773"/><path stroke="#000" d="M605.478-46.09l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#000" d="M164.956-238.027l-43.472 33.76"/><path stroke="#000" d="M123.346-201.282l-10.045 3.37 5.751-8.898 4.294 5.528z"/></g><g class="edge"><path fill="none" stroke="#000" d="M184.622-270.825c.585-17.94 1.356-46.256 1.356-70.775v-428.2-44.57"/><path stroke="#000" d="M182.478-814.5l3.5-10 3.5 10h-7z"/></g></g></svg>

This state diagram contains the following
* □ _States_ are moments in the game waiting on a player's move, such as rolling the dice.
* ◇ _Pseudostates_ are temporary states that allow for conditional behavior while the processing a player's move.
* ｜ _Transitions_ have guards that control the flow. Their reducers compute the new game state, computing the new game state for cards and the board at each transition.
* 𝐀 _Labels_ identify player actions, such as a selecting a territory

## Actions
Every play you make during a match is modeled by one of the following actions.
  
### StartMatch<a name="startmatch"></a>

*Start the match.*

<svg width="184" height="133pt" viewBox="0 0 137.53 132.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 128.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-132.8h137.53V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M91.7-124.8H37.83c-6 0-12 6-12 12v12c0 6 6 12 12 12H91.7c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="64.765" y="-102.6">Initializing</text></g><g class="node"><path fill="none" stroke="#000" d="M117.296-36H12.234c-6 0-12 6-12 12v12c0 6 6 12 12 12h105.062c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="64.765" y="-13.8">SelectingFirstPlayer</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M64.765-88.4v41.933"/><path stroke="#000" stroke-width="2" d="M68.265-46.072l-3.5 10-3.5-10h7z"/><text text-anchor="middle" x="95.867" y="-58.2">StartMatch</text></g></g></svg>

Start the match by selecting the number of players. Each player will receive the same number of armies to deploy. This number depends on the number of players. The default match config awards players the following:

Players | Armies
:---- | :----
3 | 35
4 | 30
5 | 25
6 | 20

StartMatch actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`StartMatch`"
`players` | `number` | Number of players. The match settings determine the minimum and maximum number of players.

#### Action creator
`actionCreators.StartMatch(players: number)`
##### Example
``` javascript
const { actionCreators, reduce } = require('warcode-core');
let state = reduce();
let action = actionCreators.startMatch(3);
state = reduce(state, action);
```
  
  
### SelectFirstPlayer<a name="selectfirstplayer"></a>

*Select player to take first move, similarly to each player rolling a die
to begin the game.*

<svg width="304pt" height="206pt" viewBox="0 0 304.25 205.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 201.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-205.8h304.245V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M194.51-197.8H89.446c-6 0-12 6-12 12v12c0 6 6 12 12 12H194.51c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="141.978" y="-175.6">SelectingFirstPlayer</text></g><g class="node"><path fill="none" stroke="#000" d="M141.978-109L55.156-91l86.822 18 86.823-18-86.823-18z"/><text text-anchor="middle" x="141.978" y="-86.8">InitialChoice</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M141.978-161.4v41.933"/><path stroke="#000" stroke-width="2" d="M145.478-119.072l-3.5 10-3.5-10h7z"/><text text-anchor="middle" x="189.798" y="-131.2">SelectFirstPlayer</text></g><g class="node"><path fill="none" stroke="#000" d="M115.935-36H12.022c-6 0-12 6-12 12v12c0 6 6 12 12 12h103.913c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="63.978" y="-13.8">OccupyingTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M284.013-36h-126.07c-6 0-12 6-12 12v12c0 6 6 12 12 12h126.07c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="220.978" y="-13.8">PlacingAdditionalArmy</text></g><g class="edge"><path fill="none" stroke="#888" d="M126.194-76.227l-35.4 33.13"/><path fill="#888" stroke="#888" d="M93.024-40.39l-9.693 4.278 4.91-9.389 4.783 5.11z"/></g><g class="edge"><path fill="none" stroke="#888" d="M157.965-76.227l35.854 33.13"/><path fill="#888" stroke="#888" d="M196.408-45.47l4.97 9.358-9.72-4.216 4.75-5.142z"/></g></g></svg>

Select player to take first move, similarly to each player rolling a die to determine the first player at the beginning the game.

SelectFirstPlayer actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`SelectFirstPlayer`"
`firstPlayer` | `number` | Index of the first player.

#### Action creator
`actionCreators.SelectFirstPlayer(firstPlayer: number)`
##### Example
``` javascript
const { actionCreators, reduce } = require('warcode-core');
let state = reduce();
let action = actionCreators.startMatch(3);
state = reduce(state, action);
action = actionCreators.selectFirstPlayer(0);
state = reduce(state, action);
```
  
  
### OccupyTerritory<a name="occupyterritory"></a>

*Select territory to occupy.*

<svg width="409pt" height="352pt" viewBox="0 0 409.4 351.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 347.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-351.8h409.399V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M295.444-343.8H191.531c-6 0-12 6-12 12v12c0 6 6 12 12 12h103.913c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="243.487" y="-321.6">OccupyingTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M173.487-255L60.105-237l113.382 18 113.383-18-113.383-18z"/><text text-anchor="middle" x="173.487" y="-232.8">HasPlacedArmies</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M222.954-307.575c-5.647 5.457-11.576 11.631-16.533 17.775-6.746 8.363-13.221 18.196-18.618 27.096"/><path stroke="#000" stroke-width="2" d="M190.692-260.712l-8.088 6.844 2.055-10.394 6.033 3.55z"/><text text-anchor="middle" x="252.52" y="-277.2">OccupyTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M377.522-109h-126.07c-6 0-12 6-12 12v12c0 6 6 12 12 12h126.07c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="314.487" y="-86.8">PlacingAdditionalArmy</text></g><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M224.116-36H122.858c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="173.487" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M314.487-182l-86.822 18 86.822 18 86.823-18-86.823-18z"/><text text-anchor="middle" x="314.487" y="-159.8">InitialChoice</text></g><g class="edge"><path fill="none" stroke="#888" d="M200.34-223.097l80.295 41.57"/><path fill="#888" stroke="#888" d="M282.354-184.578l7.272 7.706-10.49-1.49 3.218-6.216z"/></g><g class="node"><path fill="none" stroke="#000" d="M109.487-182L9.875-164l99.612 18 99.613-18-99.613-18z"/><text text-anchor="middle" x="109.487" y="-159.8">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#888" d="M159.6-221.16l-29.76 33.946"/><path fill="#888" stroke="#888" d="M132.352-184.77l-9.225 5.212 3.961-9.827 5.264 4.615z"/></g><g class="edge"><path fill="none" stroke="#888" d="M317.066-181.813c2.801-25.884 4.404-74.456-16.579-107.987-2.617-4.183-5.918-7.964-9.607-11.363"/><path fill="#888" stroke="#888" d="M288.462-298.616l-5.602-8.992 9.987 3.536-4.385 5.456z"/></g><g class="edge"><path fill="none" stroke="#888" d="M314.487-145.955v26.773"/><path fill="#888" stroke="#888" d="M317.988-119.09l-3.5 10-3.5-10h7z"/></g><g class="node"><path fill="none" stroke="#000" d="M109.487-109L40.593-91l68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="109.487" y="-86.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M109.487-145.955v26.773"/><path fill="#888" stroke="#888" d="M112.987-119.09l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M96.738-76.227L68.692-43.73"/><path fill="#888" stroke="#888" d="M71.302-41.396l-9.183 5.284 3.883-9.858 5.3 4.574z"/></g><g class="edge"><path fill="none" stroke="#888" d="M122.439-76.227c8.17 9.32 18.947 21.61 28.491 32.498"/><path fill="#888" stroke="#888" d="M153.648-45.94l3.96 9.828-9.224-5.212 5.264-4.615z"/></g></g></svg>

At the start of the game, each player takes turns placing a single army on an unoccupied territory.
To occupy the territory, you must place an army on an unoccupied territory. An unoccupied territory must have no owner or occupying armies.
Upon occupying the territory

OccupyTerritory actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`OccupyTerritory`"
`territory` | `number` | Index of territory to occupy. It must be unoccupied.

#### Action creator
`actionCreators.OccupyTerritory(territory: number)`
##### Example
``` javascript
const { actionCreators, reduce } = require('warcode-core');
let state = reduce();
state = reduce(state, actionCreators.startMatch(3));
state = reduce(state, actionCreators.selectFirstPlayer(0));
state = reduce(state, actionCreators.occupyTerritory(0));
```
  
  
### PlaceAdditionalArmy<a name="placeadditionalarmy"></a>

*Select a territory you own to place an additional army.*

<svg width="409pt" height="352pt" viewBox="0 0 409.4 351.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 347.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-351.8h409.399V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M307.522-343.8h-126.07c-6 0-12 6-12 12v12c0 6 6 12 12 12h126.07c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="244.487" y="-321.6">PlacingAdditionalArmy</text></g><g class="node"><path fill="none" stroke="#000" d="M173.487-255L60.105-237l113.382 18 113.383-18-113.383-18z"/><text text-anchor="middle" x="173.487" y="-232.8">HasPlacedArmies</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M196.52-307.79c-7.395 4.777-14.14 10.7-18.891 17.99-4.711 7.23-6.525 16.253-6.932 24.785"/><path stroke="#000" stroke-width="2" d="M174.196-265.04l-3.4 10.034-3.6-9.964 7-.07z"/><text text-anchor="middle" x="238.917" y="-277.2">PlaceAdditionalArmy</text></g><g class="node"><path fill="none" stroke="#000" d="M366.444-109H262.531c-6 0-12 6-12 12v12c0 6 6 12 12 12h103.913c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="314.487" y="-86.8">OccupyingTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M224.116-36H122.858c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="173.487" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M314.487-182l-86.822 18 86.822 18 86.823-18-86.823-18z"/><text text-anchor="middle" x="314.487" y="-159.8">InitialChoice</text></g><g class="edge"><path fill="none" stroke="#888" d="M200.34-223.097l80.295 41.57"/><path fill="#888" stroke="#888" d="M282.354-184.578l7.272 7.706-10.49-1.49 3.218-6.216z"/></g><g class="node"><path fill="none" stroke="#000" d="M109.487-182L9.875-164l99.612 18 99.613-18-99.613-18z"/><text text-anchor="middle" x="109.487" y="-159.8">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#888" d="M159.6-221.16l-29.76 33.946"/><path fill="#888" stroke="#888" d="M132.352-184.77l-9.225 5.212 3.961-9.827 5.264 4.615z"/></g><g class="edge"><path fill="none" stroke="#888" d="M317.03-181.791c2.757-25.857 4.306-74.394-16.543-108.009-2.604-4.199-5.9-8-9.584-11.417"/><path fill="#888" stroke="#888" d="M288.463-298.69l-5.57-9.011 9.974 3.57-4.404 5.442z"/></g><g class="edge"><path fill="none" stroke="#888" d="M314.487-145.955v26.773"/><path fill="#888" stroke="#888" d="M317.988-119.09l-3.5 10-3.5-10h7z"/></g><g class="node"><path fill="none" stroke="#000" d="M109.487-109L40.593-91l68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="109.487" y="-86.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M109.487-145.955v26.773"/><path fill="#888" stroke="#888" d="M112.987-119.09l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M96.738-76.227L68.692-43.73"/><path fill="#888" stroke="#888" d="M71.302-41.396l-9.183 5.284 3.883-9.858 5.3 4.574z"/></g><g class="edge"><path fill="none" stroke="#888" d="M122.439-76.227c8.17 9.32 18.947 21.61 28.491 32.498"/><path fill="#888" stroke="#888" d="M153.648-45.94l3.96 9.828-9.224-5.212 5.264-4.615z"/></g></g></svg>

After players claim all territories, players take turns placing one of their undeployed armies on territory they occupy each turn.
When a player places an additional army,

PlaceAdditionalArmy actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`PlaceAdditionalArmy`"
`territory` | `number` | Index of territory to place an additional army. You must occupy it.

#### Action creator
`actionCreators.PlaceAdditionalArmy(territory: number)`
##### Example
``` javascript
const { actionCreators, reduce } = require('warcode-core');
let state = reduce();
state = reduce(state, actionCreators.startMatch(3));
state = reduce(state, actionCreators.selectFirstPlayer(0));
state = reduce(state, actionCreators.occupyTerritory(0));
state = reduce(state, actionCreators.occupyTerritory(1));
// ...
state = reduce(state, actionCreators.placeAdditionalArmy(0));
```
  
  
### TradeCards<a name="tradecards"></a>

*Select three cards to trade for armies.*

<svg width="360" height="206pt" viewBox="0 0 269.51 205.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 201.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-205.8h269.511V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M147.289-197.8h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="112.814" y="-175.6">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M113.443-36H12.185c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="62.814" y="-13.8">PlacingNewArmies</text></g><g class="edge"><path fill="none" stroke="#888" d="M93.877-161.655C81.487-148.401 66.386-129.27 59.62-109c-6.736 20.181-5.507 44.294-2.825 62.627"/><path fill="#888" stroke="#888" d="M60.278-46.764L58.49-36.32l-5.116-9.278 6.903-1.166z"/><text text-anchor="middle" x="87.412" y="-86.8">EndTrade</text></g><g class="node"><path fill="none" stroke="#000" d="M192.814-109L123.92-91l68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="192.814" y="-86.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M108.488-161.767c-1.573 10.917-1.594 24.638 5.027 34.767 7.318 11.194 19.046 18.95 31.263 24.308"/><path stroke="#000" stroke-width="2" d="M146.1-105.933l8.05 6.888-10.588-.364 2.538-6.524z"/><text text-anchor="middle" x="145.464" y="-131.2">TradeCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M191.65-108.734c-1.523-11.07-4.991-25.069-12.836-35.066-3.613-4.605-7.985-8.7-12.74-12.325"/><path fill="#888" stroke="#888" d="M164.065-153.259l-6.288-8.527 10.233 2.745-3.945 5.782z"/></g><g class="edge"><path fill="none" stroke="#888" d="M170.762-78.617l-66.665 37.435"/><path fill="#888" stroke="#888" d="M105.667-38.05l-10.433 1.845 7.005-7.948 3.428 6.104z"/></g></g></svg>

Trade three cards for armies. The award increases after each trade made by any player during the match.

Trade | Award | 
:---- | :---- | :----
1 | 4 | (trade + 1) * 2
2 | 6 | (trade + 1) * 2
3 | 8 | (trade + 1) * 2
4 | 10 | (trade + 1) * 2
5 | 12 | (trade + 1) * 2
6 | 15 | (trade - 3) * 5
7 | 20 | (trade - 3) * 5
8 | 25 | (trade - 3) * 5
9 | 30 | (trade - 3) * 5
An additional two armies may be awarded when one of the traded cards matches a territory the player occupies. These two armies are immediately placed on the territory itself. The award only applies to a single card.
The three cards must meet one of the following

TradeCards actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`TradeCards`"
`i` | `number` | Index of first card to trade. This card will receive a territory bonus.
`j` | `number` | Index of card to trade
`k` | `number` | Index of card to trade

#### Action creator
`actionCreators.TradeCards(i: number, j: number, k: number)`
##### Example
``` javascript
const { actionCreators, reduce } = require('warcode-core');
let state = reduce();
state = reduce(state, actionCreators.startMatch(3));
state = reduce(state, actionCreators.selectFirstPlayer(0));
// conquer territories for a few turns, be awesome, collect cards, and then ...
state = reduce(state, actionCreators.tradeCards(0, 1, 2));
```
  
  
### EndTrade<a name="endtrade"></a>

*You may end trading as long as you hold four or fewer cards.*

<svg width="360" height="206pt" viewBox="0 0 269.51 205.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 201.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-205.8h269.511V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M147.289-197.8h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="112.814" y="-175.6">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M113.443-36H12.185c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="62.814" y="-13.8">PlacingNewArmies</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M93.877-161.655C81.487-148.401 66.386-129.27 59.62-109c-6.736 20.181-5.507 44.294-2.825 62.627"/><path stroke="#000" stroke-width="2" d="M60.278-46.764L58.49-36.32l-5.116-9.278 6.903-1.166z"/><text text-anchor="middle" x="87.412" y="-86.8">EndTrade</text></g><g class="node"><path fill="none" stroke="#000" d="M192.814-109L123.92-91l68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="192.814" y="-86.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M108.488-161.767c-1.573 10.917-1.594 24.638 5.027 34.767 7.318 11.194 19.046 18.95 31.263 24.308"/><path fill="#888" stroke="#888" d="M146.1-105.933l8.05 6.888-10.588-.364 2.538-6.524z"/><text text-anchor="middle" x="145.464" y="-131.2">TradeCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M191.65-108.734c-1.523-11.07-4.991-25.069-12.836-35.066-3.613-4.605-7.985-8.7-12.74-12.325"/><path fill="#888" stroke="#888" d="M164.065-153.259l-6.288-8.527 10.233 2.745-3.945 5.782z"/></g><g class="edge"><path fill="none" stroke="#888" d="M170.762-78.617l-66.665 37.435"/><path fill="#888" stroke="#888" d="M105.667-38.05l-10.433 1.845 7.005-7.948 3.428 6.104z"/></g></g></svg>

End trading and begin the attacking phase of the turn. You must continue trading when you hold five or six cards.

EndTrade actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`EndTrade`"


#### Action creator
`actionCreators.EndTrade()`

  
### PlaceNewArmies<a name="placenewarmies"></a>

*Place some undeployed armies on an occupied territory to start the turn*

<svg width="296pt" height="206pt" viewBox="0 0 295.58 205.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 201.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-205.8h295.577V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M194.417-197.8H93.16c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="143.788" y="-175.6">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M143.788-109L.211-91l143.577 18 143.577-18-143.577-18z"/><text text-anchor="middle" x="143.788" y="-86.8">HasUndeployedArmies</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M105.203-161.733c-6.576 4.867-12.517 10.809-16.367 17.933-6.862 12.7 2.105 24.164 14.657 33.14"/><path stroke="#000" stroke-width="2" d="M105.592-113.472l6.536 8.34-10.31-2.444 3.774-5.896z"/><text text-anchor="middle" x="138.764" y="-131.2">PlaceNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M162.402-36h-37.227c-6 0-12 6-12 12v12c0 6 6 12 12 12h37.227c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="143.788" y="-13.8">Battling</text></g><g class="edge"><path fill="none" stroke="#888" d="M168.637-105.988c12.938-9.87 24.804-23.566 18.151-37.812-1.807-3.87-4.258-7.472-7.079-10.782"/><path fill="#888" stroke="#888" d="M177.139-152.203l-4.554-9.566 9.525 4.638-4.971 4.928z"/></g><g class="edge"><path fill="none" stroke="#888" d="M143.788-72.955v26.773"/><path fill="#888" stroke="#888" d="M147.288-46.09l-3.5 10-3.5-10h7z"/></g></g></svg>

You must place all new armies earned during the beginning of the turn and from trading cards.

PlaceNewArmies actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`PlaceNewArmies`"
`territory` | `number` | index of territory to place new armies
`armies` | `number` | number of armies to place

#### Action creator
`actionCreators.PlaceNewArmies(territory: number, armies: number)`

  
### EndAttack<a name="endattack"></a>

*End attack and begin fortifying*

<svg width="184pt" height="133pt" viewBox="0 0 183.61 132.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 128.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-132.8h183.605V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M103.001-124.8H65.774c-6 0-12 6-12 12v12c0 6 6 12 12 12h37.227c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="84.388" y="-102.6">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M60.664-36H12.112c-6 0-12 6-12 12v12c0 6 6 12 12 12h48.552c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="36.388" y="-13.8">Fortifying</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M64.85-88.664c-4.907 5.362-9.782 11.51-13.332 17.864-4.186 7.492-7.299 16.242-9.575 24.44"/><path stroke="#000" stroke-width="2" d="M45.28-45.28l-5.792 8.871-1.003-10.547 6.796 1.677z"/><text text-anchor="middle" x="81.323" y="-58.2">EndAttack</text></g><g class="node"><path fill="none" stroke="#000" d="M163.824-36h-60.872c-6 0-12 6-12 12v12c0 6 6 12 12 12h60.872c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="133.388" y="-13.8">RollingDice</text></g><g class="edge"><path fill="none" stroke="#888" d="M99.323-88.72c4.204 5.553 8.576 11.815 12.065 17.92 4.533 7.932 8.649 16.982 12.062 25.322"/><path fill="#888" stroke="#888" d="M126.726-46.71l.392 10.587-6.909-8.032 6.517-2.555z"/><text text-anchor="middle" x="135.107" y="-58.2">Battle</text></g></g></svg>

You may stop attacking opponent's territories at anytime.

EndAttack actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`EndAttack`"


#### Action creator
`actionCreators.EndAttack()`

  
### Battle<a name="battle"></a>

*Select a territory to attack, neighboring defending territory, and dice to roll*

<svg width="184pt" height="133pt" viewBox="0 0 183.61 132.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 128.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-132.8h183.605V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M103.001-124.8H65.774c-6 0-12 6-12 12v12c0 6 6 12 12 12h37.227c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="84.388" y="-102.6">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M60.664-36H12.112c-6 0-12 6-12 12v12c0 6 6 12 12 12h48.552c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="36.388" y="-13.8">Fortifying</text></g><g class="edge"><path fill="none" stroke="#888" d="M64.85-88.664c-4.907 5.362-9.782 11.51-13.332 17.864-4.186 7.492-7.299 16.242-9.575 24.44"/><path fill="#888" stroke="#888" d="M45.28-45.28l-5.792 8.871-1.003-10.547 6.796 1.677z"/><text text-anchor="middle" x="81.323" y="-58.2">EndAttack</text></g><g class="node"><path fill="none" stroke="#000" d="M163.824-36h-60.872c-6 0-12 6-12 12v12c0 6 6 12 12 12h60.872c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="133.388" y="-13.8">RollingDice</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M99.323-88.72c4.204 5.553 8.576 11.815 12.065 17.92 4.533 7.932 8.649 16.982 12.062 25.322"/><path stroke="#000" stroke-width="2" d="M126.726-46.71l.392 10.587-6.909-8.032 6.517-2.555z"/><text text-anchor="middle" x="135.107" y="-58.2">Battle</text></g></g></svg>

The objective of battling is to capture an opponent's territory by defeating all of its armies.
To attack, you must select an attacking territory that
When you attack, you must decide to roll 1, 2, or 3 dice. You can roll no more dice than one more than the number of armies on the attacking territory. For example, if you are attacking from a territory with three armies, you may only roll two dice.

Battle actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`Battle`"
`attackingTerritory` | `number` | index of attacking territory
`defendingTerritory` | `number` | index of defending territory
`attackingDiceCount` | `number` | number of dice to be rolled by attacker

#### Action creator
`actionCreators.Battle(attackingTerritory: number, defendingTerritory: number, attackingDiceCount: number)`

  
### RollDice<a name="rolldice"></a>

*Simulate attacker and defender rolling dice.*

<svg width="372" height="206pt" viewBox="0 0 278.82 205.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 201.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-205.8h278.822V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M165.847-197.8h-60.872c-6 0-12 6-12 12v12c0 6 6 12 12 12h60.872c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="135.411" y="-175.6">RollingDice</text></g><g class="node"><path fill="none" stroke="#000" d="M135.411-109L.09-91 135.41-73l135.322-18-135.322-18z"/><text text-anchor="middle" x="135.411" y="-86.8">HasDefeatedTerritory</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M135.411-161.4v41.933"/><path stroke="#000" stroke-width="2" d="M138.911-119.072l-3.5 10-3.5-10h7z"/><text text-anchor="middle" x="160.683" y="-131.2">RollDice</text></g><g class="node"><path fill="none" stroke="#000" d="M112.025-36H74.797c-6 0-12 6-12 12v12c0 6 6 12 12 12h37.228c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="93.411" y="-13.8">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M202.404-36h-47.986c-6 0-12 6-12 12v12c0 6 6 12 12 12h47.986c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="178.411" y="-13.8">Capturing</text></g><g class="edge"><path fill="none" stroke="#888" d="M125.67-74.069l-16.7 29.025"/><path fill="#888" stroke="#888" d="M111.854-43.038l-8.02 6.923 1.953-10.413 6.067 3.49z"/></g><g class="edge"><path fill="none" stroke="#888" d="M145.384-74.069l17.274 29.326"/><path fill="#888" stroke="#888" d="M165.68-46.508l2.06 10.393-8.09-6.84 6.03-3.553z"/></g></g></svg>

Simulate players rolling dice.
The attacker and defender may loose armies based on the random outcome of the dice rolled. Compare the highest die rolled by the attacker and defender - if the attacker's die is higher the defending territory looses an army, otherwise the attacker looses an army. If the attacker and defender rolled two or more dice, compare the second highest pair. If the attacker's die is higher the defending territory looses an army, otherwise the attacker looses an army.
The owner of the defending territory may roll a single die when the defending territory contains a single army. When the territory contains multiple armies, the defender may roll either one or two dice.

RollDice actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`RollDice`"
`attackerDice` | `number[]` | dice rolled by attacker
`defenderDice` | `number[]` | dice rolled by defender

#### Action creator
`actionCreators.RollDice(attackerDice: undefined, defenderDice: undefined)`

  
### Capture<a name="capture"></a>

*Capture the defeated territory by moving armies into it*

<svg width="349pt" height="206pt" viewBox="0 0 349 205.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 201.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-205.8h348.999V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M165.48-197.8h-47.986c-6 0-12 6-12 12v12c0 6 6 12 12 12h47.986c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="141.487" y="-175.6">Capturing</text></g><g class="node"><path fill="none" stroke="#000" d="M141.487-109L1.531-91l139.956 18 139.956-18-139.956-18z"/><text text-anchor="middle" x="141.487" y="-86.8">HasDefeatedOpponent</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M141.487-161.4v41.933"/><path stroke="#000" stroke-width="2" d="M144.988-119.072l-3.5 10-3.5-10h7z"/><text text-anchor="middle" x="163.646" y="-131.2">Capture</text></g><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M160.101-36h-37.227c-6 0-12 6-12 12v12c0 6 6 12 12 12H160.1c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="141.487" y="-13.8">Battling</text></g><g class="edge"><path fill="none" stroke="#888" d="M121.34-75.519L78.062-42.262"/><path fill="#888" stroke="#888" d="M80.017-39.351l-10.062 3.318 5.797-8.869 4.265 5.55z"/></g><g class="edge"><path fill="none" stroke="#888" d="M141.487-72.955v26.773"/><path fill="#888" stroke="#888" d="M144.988-46.09l-3.5 10-3.5-10h7z"/></g><g class="node"><path fill="none" stroke="#000" d="M265.487-36l-75.523 18 75.523 18 75.524-18-75.524-18z"/><text text-anchor="middle" x="265.487" y="-13.8">GameOver</text></g><g class="edge"><path fill="none" stroke="#888" d="M166.88-76.051l67.763 39.892"/><path fill="#888" stroke="#888" d="M236.607-39.063l6.842 8.089-10.393-2.057 3.551-6.032z"/></g></g></svg>

When you defeat all armies on a defending territory, you must occupy it by moving armies from the attacking territory. The number of armies moved must be at least the same number of dice rolled in the decisive battle.

Capture actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`Capture`"
`armies` | `number` | number of armies to move

#### Action creator
`actionCreators.Capture(armies: number)`

  
### Fortify<a name="fortify"></a>

*Move armies between two of your adjacent territories before ending your turn.*

<svg width="413pt" height="352pt" viewBox="0 0 412.87 351.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 347.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-351.8h412.87V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M126.333-343.8H77.78c-6 0-12 6-12 12v12c0 6 6 12 12 12h48.552c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="102.057" y="-321.6">Fortifying</text></g><g class="node"><path fill="none" stroke="#000" d="M102.057-255L-.057-237l102.114 18 102.113-18-102.113-18z"/><text text-anchor="middle" x="102.057" y="-232.8">HasEarnedCard</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M82.85-307.576c-4.348 5.276-8.362 11.358-10.678 17.776-2.535 7.023-2.535 9.777 0 16.8 1.594 4.417 3.993 8.675 6.75 12.62"/><path stroke="#000" stroke-width="2" d="M81.866-262.302l3.496 10.001-8.97-5.638 5.474-4.363z"/><text text-anchor="middle" x="92.499" y="-277.2">Fortify</text></g><g class="edge"><path fill="none" stroke="#888" d="M107.513-307.65c1.453 5.664 2.82 11.967 3.544 17.85.912 7.41.912 9.39 0 16.8-.355 2.877-.862 5.856-1.459 8.81"/><path fill="#888" stroke="#888" d="M113-263.362l-5.677 8.946-1.141-10.533 6.817 1.587z"/><text text-anchor="middle" x="136.94" y="-277.2">EndTurn</text></g><g class="node"><path fill="none" stroke="#000" d="M147.69-182H32.424c-6 0-12 6-12 12v12c0 6 6 12 12 12H147.69c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="90.057" y="-159.8">DrawingRandomCard</text></g><g class="node"><path fill="none" stroke="#000" d="M249.531-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="215.057" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M392.686-36H291.428c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="342.057" y="-13.8">PlacingNewArmies</text></g><g class="edge"><path fill="none" stroke="#888" d="M99.152-219.329l-4.502 27.387"/><path fill="#888" stroke="#888" d="M98.094-191.315l-5.076 9.3-1.831-10.436 6.907 1.136z"/></g><g class="node"><path fill="none" stroke="#000" d="M278.057-182l-99.613 18 99.613 18 99.612-18-99.612-18z"/><text text-anchor="middle" x="278.057" y="-159.8">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#888" d="M132.714-224.284l105.534 43.773"/><path fill="#888" stroke="#888" d="M239.855-183.634l7.896 7.064-10.578-.598 2.682-6.466z"/></g><g class="node"><path fill="none" stroke="#000" d="M278.057-109l-68.894 18 68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="278.057" y="-86.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M278.057-145.955v26.773"/><path fill="#888" stroke="#888" d="M281.557-119.09l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M265.308-76.227L237.26-43.73"/><path fill="#888" stroke="#888" d="M239.871-41.396l-9.183 5.284 3.884-9.858 5.3 4.574z"/></g><g class="edge"><path fill="none" stroke="#888" d="M291.008-76.227L319.5-43.73"/><path fill="#888" stroke="#888" d="M322.217-45.94l3.96 9.828-9.224-5.212 5.264-4.615z"/></g></g></svg>

During fortification, you may move armies between two of your adjacent territories before ending your turn.
Fortification has a few requirements
You may end your turn, skipping fortification.

Fortify actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`Fortify`"
`fromTerritory` | `number` | Index of territory to move armies from. Must be owned by you, have more than one army, and be adjacent to toTerritory.
`toTerritory` | `number` | Index of territory to move armies to. Must be owned by you and adjacent to fromTerritory.
`armies` | `number` | Number of armies to move. You must leave one army behind, so the number may between one and the number of the armies on fromTerritory.

#### Action creator
`actionCreators.Fortify(fromTerritory: number, toTerritory: number, armies: number)`

  
### EndTurn<a name="endturn"></a>

*You end the turn, ending fortification.*

<svg width="413pt" height="352pt" viewBox="0 0 412.87 351.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 347.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-351.8h412.87V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M126.333-343.8H77.78c-6 0-12 6-12 12v12c0 6 6 12 12 12h48.552c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="102.057" y="-321.6">Fortifying</text></g><g class="node"><path fill="none" stroke="#000" d="M102.057-255L-.057-237l102.114 18 102.113-18-102.113-18z"/><text text-anchor="middle" x="102.057" y="-232.8">HasEarnedCard</text></g><g class="edge"><path fill="none" stroke="#888" d="M82.85-307.576c-4.348 5.276-8.362 11.358-10.678 17.776-2.535 7.023-2.535 9.777 0 16.8 1.594 4.417 3.993 8.675 6.75 12.62"/><path fill="#888" stroke="#888" d="M81.866-262.302l3.496 10.001-8.97-5.638 5.474-4.363z"/><text text-anchor="middle" x="92.499" y="-277.2">Fortify</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M107.513-307.65c1.453 5.664 2.82 11.967 3.544 17.85.912 7.41.912 9.39 0 16.8-.355 2.877-.862 5.856-1.459 8.81"/><path stroke="#000" stroke-width="2" d="M113-263.362l-5.677 8.946-1.141-10.533 6.817 1.587z"/><text text-anchor="middle" x="136.94" y="-277.2">EndTurn</text></g><g class="node"><path fill="none" stroke="#000" d="M147.69-182H32.424c-6 0-12 6-12 12v12c0 6 6 12 12 12H147.69c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="90.057" y="-159.8">DrawingRandomCard</text></g><g class="node"><path fill="none" stroke="#000" d="M249.531-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="215.057" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M392.686-36H291.428c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="342.057" y="-13.8">PlacingNewArmies</text></g><g class="edge"><path fill="none" stroke="#888" d="M99.152-219.329l-4.502 27.387"/><path fill="#888" stroke="#888" d="M98.094-191.315l-5.076 9.3-1.831-10.436 6.907 1.136z"/></g><g class="node"><path fill="none" stroke="#000" d="M278.057-182l-99.613 18 99.613 18 99.612-18-99.612-18z"/><text text-anchor="middle" x="278.057" y="-159.8">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#888" d="M132.714-224.284l105.534 43.773"/><path fill="#888" stroke="#888" d="M239.855-183.634l7.896 7.064-10.578-.598 2.682-6.466z"/></g><g class="node"><path fill="none" stroke="#000" d="M278.057-109l-68.894 18 68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="278.057" y="-86.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M278.057-145.955v26.773"/><path fill="#888" stroke="#888" d="M281.557-119.09l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M265.308-76.227L237.26-43.73"/><path fill="#888" stroke="#888" d="M239.871-41.396l-9.183 5.284 3.884-9.858 5.3 4.574z"/></g><g class="edge"><path fill="none" stroke="#888" d="M291.008-76.227L319.5-43.73"/><path fill="#888" stroke="#888" d="M322.217-45.94l3.96 9.828-9.224-5.212 5.264-4.615z"/></g></g></svg>

End turn without fortifying.

EndTurn actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`EndTurn`"


#### Action creator
`actionCreators.EndTurn()`

  
### DrawRandomCard<a name="drawrandomcard"></a>

*Select "random" card for player to draw from the deck.*

<svg width="244pt" height="372" viewBox="0 0 244.3 278.8" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 274.8)"><path fill="#fff" stroke="transparent" d="M-4 4v-278.8h244.302V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M167.12-270.8H51.854c-6 0-12 6-12 12v12c0 6 6 12 12 12h115.267c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="109.487" y="-248.6">DrawingRandomCard</text></g><g class="node"><path fill="none" stroke="#000" d="M109.487-182L9.875-164l99.612 18 99.613-18-99.613-18z"/><text text-anchor="middle" x="109.487" y="-159.8">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M109.487-234.4v41.933"/><path stroke="#000" stroke-width="2" d="M112.987-192.072l-3.5 10-3.5-10h7z"/><text text-anchor="middle" x="162.358" y="-204.2">DrawRandomCard</text></g><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M224.116-36H122.858c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="173.487" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M109.487-109L40.593-91l68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="109.487" y="-86.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M109.487-145.955v26.773"/><path fill="#888" stroke="#888" d="M112.987-119.09l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M96.738-76.227L68.692-43.73"/><path fill="#888" stroke="#888" d="M71.302-41.396l-9.183 5.284 3.883-9.858 5.3 4.574z"/></g><g class="edge"><path fill="none" stroke="#888" d="M122.439-76.227c8.17 9.32 18.947 21.61 28.491 32.498"/><path fill="#888" stroke="#888" d="M153.648-45.94l3.96 9.828-9.224-5.212 5.264-4.615z"/></g></g></svg>

Select a random index of a card for the player to draw from the deck.

DrawRandomCard actions must contain the following:

Field        | Type       | Description
:----------- | :--------- | :----------
`type`     | `string` | "`DrawRandomCard`"
`card` | `number` | Index of the card to assign. Card owner must be currently undefined.

#### Action creator
`actionCreators.DrawRandomCard(card: number)`

  
## Other Transitions
### InitialChoice ⇒ OccupyingTerritory<a name="initialchoice-occupyingterritory"></a>
<svg width="304pt" height="116pt" viewBox="0 0 304.25 116" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 112)"><path fill="#fff" stroke="transparent" d="M-4 4v-116h304.245V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M115.935-36H12.022c-6 0-12 6-12 12v12c0 6 6 12 12 12h103.913c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="63.978" y="-13.8">OccupyingTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M284.013-36h-126.07c-6 0-12 6-12 12v12c0 6 6 12 12 12h126.07c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="220.978" y="-13.8">PlacingAdditionalArmy</text></g><g class="node"><path fill="none" stroke="#000" d="M141.978-108L55.156-90l86.822 18 86.823-18-86.823-18z"/><text text-anchor="middle" x="141.978" y="-85.8">InitialChoice</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M125.817-75.082L91.39-43.302"/><path stroke="#000" stroke-width="2" d="M93.438-40.43l-9.722 4.21 4.974-9.354 4.748 5.143z"/></g><g class="edge"><path fill="none" stroke="#888" d="M158.347-75.082l35.204 32.085"/><path fill="#888" stroke="#888" d="M195.954-45.542l5.033 9.323-9.748-4.15 4.715-5.173z"/></g></g></svg>

There is one or more unoccupied territories on the game board

### HasPlacedArmies ⇒ InitialChoice<a name="hasplacedarmies-initialchoice"></a>
<svg width="538pt" height="260pt" viewBox="0 0 537.79 260" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 256)"><path fill="#fff" stroke="transparent" d="M-4 4v-260h537.793V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M115.935-108H12.022c-6 0-12 6-12 12v12c0 6 6 12 12 12h103.913c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="63.978" y="-85.8">OccupyingTerritory</text></g><g class="node"><path fill="none" stroke="#000" d="M284.013-108h-126.07c-6 0-12 6-12 12v12c0 6 6 12 12 12h126.07c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="220.978" y="-85.8">PlacingAdditionalArmy</text></g><g class="node"><path fill="none" stroke="#000" d="M374.453-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="339.978" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M517.607-36H416.35c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="466.978" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M300.978-252l-113.382 18 113.382 18 113.383-18-113.383-18z"/><text text-anchor="middle" x="300.978" y="-229.8">HasPlacedArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M198.978-180l-86.822 18 86.822 18 86.823-18-86.823-18z"/><text text-anchor="middle" x="198.978" y="-157.8">InitialChoice</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M279.844-219.082L227-181.78"/><path stroke="#000" stroke-width="2" d="M228.89-178.83l-10.188 2.908 6.15-8.627 4.038 5.72z"/></g><g class="node"><path fill="none" stroke="#000" d="M403.978-180l-99.612 18 99.612 18 99.613-18-99.613-18z"/><text text-anchor="middle" x="403.978" y="-157.8">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#888" d="M322.32-219.082l52.702 36.84"/><path fill="#888" stroke="#888" d="M377.176-185.006l6.19 8.598-10.2-2.86 4.01-5.738z"/></g><g class="edge"><path fill="none" stroke="#888" d="M174.53-148.961l-67.675 36.093"/><path fill="#888" stroke="#888" d="M108.361-109.704l-10.47 1.617 7.176-7.794 3.294 6.177z"/></g><g class="edge"><path fill="none" stroke="#888" d="M204.192-144.937l8.225 26.918"/><path fill="#888" stroke="#888" d="M215.842-118.785l-.425 10.586-6.269-8.54 6.694-2.046z"/></g><g class="node"><path fill="none" stroke="#000" d="M403.978-108l-68.894 18 68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="403.978" y="-85.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M403.978-143.831v25.414"/><path fill="#888" stroke="#888" d="M407.478-118.413l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M390.717-75.082l-27.701 31.165"/><path fill="#888" stroke="#888" d="M365.433-41.368l-9.26 5.149 4.028-9.8 5.232 4.65z"/></g><g class="edge"><path fill="none" stroke="#888" d="M417.032-75.082L444.3-43.917"/><path fill="#888" stroke="#888" d="M447.085-46.05l3.951 9.83-9.219-5.22 5.268-4.61z"/></g></g></svg>

Select the next player. Updates currentPlayer to the index to the index of the next active player.

### SetupNextTurn ⇒ HasCards<a name="setupnextturn-hascards"></a>
<svg width="244pt" height="188pt" viewBox="0 0 244.3 188" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 184)"><path fill="#fff" stroke="transparent" d="M-4 4v-188h244.302V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M224.116-36H122.858c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="173.487" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M109.487-180L9.875-162l99.612 18 99.613-18-99.613-18z"/><text text-anchor="middle" x="109.487" y="-157.8">SetupNextTurn</text></g><g class="node"><path fill="none" stroke="#000" d="M109.487-108L40.593-90l68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="109.487" y="-85.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M109.487-143.831v25.414"/><path stroke="#000" stroke-width="2" d="M112.987-118.413l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M96.434-75.082l-27.27 31.165"/><path fill="#888" stroke="#888" d="M71.649-41.44l-9.22 5.22 3.951-9.83 5.269 4.61z"/></g><g class="edge"><path fill="none" stroke="#888" d="M122.748-75.082l27.702 31.165"/><path fill="#888" stroke="#888" d="M153.264-46.019l4.028 9.8-9.26-5.15 5.232-4.65z"/></g></g></svg>

At the beginning of your turn, you are awarded armies based on occupied territories and continents.
The number of new armies is the sum of the following
The match configuration defines the awards for each continent. For example, the default rules use the following awards.

Continent | Award
:---- | :----
Asia | 7
North America | 5
Europe | 5
Africa | 3
Australia | 2
South America | 2

### HasCards ⇒ PlacingNewArmies<a name="hascards-placingnewarmies"></a>
<svg width="244pt" height="116pt" viewBox="0 0 244.3 116" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 112)"><path fill="#fff" stroke="transparent" d="M-4 4v-116h244.302V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M224.116-36H122.858c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="173.487" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M109.487-108L40.593-90l68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="109.487" y="-85.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M96.434-75.082l-27.27 31.165"/><path fill="#888" stroke="#888" d="M71.649-41.44l-9.22 5.22 3.951-9.83 5.269 4.61z"/></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M122.748-75.082l27.702 31.165"/><path stroke="#000" stroke-width="2" d="M153.264-46.019l4.028 9.8-9.26-5.15 5.232-4.65z"/></g></g></svg>

Player holds no cards, so skip trading.

### HasUndeployedArmies ⇒ PlacingNewArmies<a name="hasundeployedarmies-placingnewarmies"></a>
<svg width="296pt" height="116pt" viewBox="0 0 295.58 116" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 112)"><path fill="#fff" stroke="transparent" d="M-4 4v-116h295.577V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M139.417-36H38.16c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="88.788" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M218.402-36h-37.227c-6 0-12 6-12 12v12c0 6 6 12 12 12h37.227c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="199.788" y="-13.8">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M143.788-108L.211-90l143.577 18 143.577-18-143.577-18z"/><text text-anchor="middle" x="143.788" y="-85.8">HasUndeployedArmies</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M131.032-73.3l-22.155 29.002"/><path stroke="#000" stroke-width="2" d="M111.483-41.944l-8.851 5.822 3.289-10.072 5.562 4.25z"/></g><g class="edge"><path fill="none" stroke="#888" d="M156.777-73.3l22.557 29.002"/><path fill="#888" stroke="#888" d="M182.317-46.164l3.376 10.042-8.902-5.745 5.526-4.297z"/></g></g></svg>

Player has one or more armies to deploy

### HasDefeatedTerritory ⇒ Capturing<a name="hasdefeatedterritory-capturing"></a>
<svg width="372" height="116pt" viewBox="0 0 278.82 116" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 112)"><path fill="#fff" stroke="transparent" d="M-4 4v-116h278.822V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M112.025-36H74.797c-6 0-12 6-12 12v12c0 6 6 12 12 12h37.228c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="93.411" y="-13.8">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M202.404-36h-47.986c-6 0-12 6-12 12v12c0 6 6 12 12 12h47.986c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="178.411" y="-13.8">Capturing</text></g><g class="node"><path fill="none" stroke="#000" d="M135.411-108L.09-90 135.41-72l135.322-18-135.322-18z"/><text text-anchor="middle" x="135.411" y="-85.8">HasDefeatedTerritory</text></g><g class="edge"><path fill="none" stroke="#888" d="M125.458-72.937l-16.383 28.085"/><path fill="#888" stroke="#888" d="M112.09-43.073l-8.063 6.874 2.016-10.401 6.046 3.527z"/></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M145.384-73.3l16.97 28.413"/><path stroke="#000" stroke-width="2" d="M165.466-46.502l2.122 10.38-8.132-6.791 6.01-3.59z"/></g></g></svg>

Player has conquored one or more territories this turn.

### HasDefeatedOpponent ⇒ TradingCards<a name="hasdefeatedopponent-tradingcards"></a>
<svg width="349pt" height="116pt" viewBox="0 0 349 116" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 112)"><path fill="#fff" stroke="transparent" d="M-4 4v-116h348.999V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M160.101-36h-37.227c-6 0-12 6-12 12v12c0 6 6 12 12 12H160.1c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="141.487" y="-13.8">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M141.487-108L1.531-90l139.956 18 139.956-18-139.956-18z"/><text text-anchor="middle" x="141.487" y="-85.8">HasDefeatedOpponent</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M120.874-74.377L78.389-42.178"/><path stroke="#000" stroke-width="2" d="M80.498-39.385l-10.084 3.251 5.855-8.83 4.229 5.58z"/></g><g class="edge"><path fill="none" stroke="#888" d="M141.487-71.831v25.414"/><path fill="#888" stroke="#888" d="M144.988-46.413l-3.5 10-3.5-10h7z"/></g><g class="node"><path fill="none" stroke="#000" d="M265.487-36l-75.523 18 75.523 18 75.524-18-75.524-18z"/><text text-anchor="middle" x="265.487" y="-13.8">GameOver</text></g><g class="edge"><path fill="none" stroke="#888" d="M166.88-75.256l67.763 39.346"/><path fill="#888" stroke="#888" d="M236.559-38.844l6.89 8.048-10.405-1.995 3.515-6.053z"/></g></g></svg>

Player holds six or more cards, so must trade a set of three now.

### HasDefeatedOpponent ⇒ GameOver<a name="hasdefeatedopponent-gameover"></a>
<svg width="349pt" height="116pt" viewBox="0 0 349 116" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 112)"><path fill="#fff" stroke="transparent" d="M-4 4v-116h348.999V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M80.962-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="46.487" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M160.101-36h-37.227c-6 0-12 6-12 12v12c0 6 6 12 12 12H160.1c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="141.487" y="-13.8">Battling</text></g><g class="node"><path fill="none" stroke="#000" d="M141.487-108L1.531-90l139.956 18 139.956-18-139.956-18z"/><text text-anchor="middle" x="141.487" y="-85.8">HasDefeatedOpponent</text></g><g class="edge"><path fill="none" stroke="#888" d="M120.874-74.377L78.389-42.178"/><path fill="#888" stroke="#888" d="M80.498-39.385l-10.084 3.251 5.855-8.83 4.229 5.58z"/></g><g class="edge"><path fill="none" stroke="#888" d="M141.487-71.831v25.414"/><path fill="#888" stroke="#888" d="M144.988-46.413l-3.5 10-3.5-10h7z"/></g><g class="node"><path fill="none" stroke="#000" d="M265.487-36l-75.523 18 75.523 18 75.524-18-75.524-18z"/><text text-anchor="middle" x="265.487" y="-13.8">GameOver</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M166.88-75.256l67.763 39.346"/><path stroke="#000" stroke-width="2" d="M236.559-38.844l6.89 8.048-10.405-1.995 3.515-6.053z"/></g></g></svg>

The game ends when the current player owns every territory.

### HasEarnedCard ⇒ DrawingRandomCard<a name="hasearnedcard-drawingrandomcard"></a>
<svg width="524" height="260pt" viewBox="0 0 392.63 260" xmlns="http://www.w3.org/2000/svg"><g class="graph" transform="translate(4 256)"><path fill="#fff" stroke="transparent" d="M-4 4v-260h392.63V4H-4z"/><g class="node"><path fill="none" stroke="#000" d="M127.45-180H12.182c-6 0-12 6-12 12v12c0 6 6 12 12 12H127.45c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="69.816" y="-157.8">DrawingRandomCard</text></g><g class="node"><path fill="none" stroke="#000" d="M229.291-36h-68.95c-6 0-12 6-12 12v12c0 6 6 12 12 12h68.95c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="194.816" y="-13.8">TradingCards</text></g><g class="node"><path fill="none" stroke="#000" d="M372.445-36H271.187c-6 0-12 6-12 12v12c0 6 6 12 12 12h101.258c6 0 12-6 12-12v-12c0-6-6-12-12-12"/><text text-anchor="middle" x="321.816" y="-13.8">PlacingNewArmies</text></g><g class="node"><path fill="none" stroke="#000" d="M163.816-252L61.703-234l102.113 18 102.114-18-102.114-18z"/><text text-anchor="middle" x="163.816" y="-229.8">HasEarnedCard</text></g><g class="edge"><path fill="none" stroke="#000" stroke-width="2" d="M144.34-219.082l-42.685 32.695"/><path stroke="#000" stroke-width="2" d="M103.67-183.522l-10.067 3.302 5.81-8.859 4.257 5.557z"/></g><g class="node"><path fill="none" stroke="#000" d="M257.816-180l-99.612 18 99.612 18 99.613-18-99.613-18z"/><text text-anchor="middle" x="257.816" y="-157.8">SetupNextTurn</text></g><g class="edge"><path fill="none" stroke="#888" d="M183.293-219.082l47.375 36.288"/><path fill="#888" stroke="#888" d="M232.875-185.512l5.811 8.859-10.067-3.302 4.256-5.557z"/></g><g class="node"><path fill="none" stroke="#000" d="M257.816-108l-68.894 18 68.894 18 68.894-18-68.894-18z"/><text text-anchor="middle" x="257.816" y="-85.8">HasCards</text></g><g class="edge"><path fill="none" stroke="#888" d="M257.816-143.831v25.414"/><path fill="#888" stroke="#888" d="M261.316-118.413l-3.5 10-3.5-10h7z"/></g><g class="edge"><path fill="none" stroke="#888" d="M244.763-75.082l-27.27 31.165"/><path fill="#888" stroke="#888" d="M219.977-41.44l-9.219 5.22 3.951-9.83 5.268 4.61z"/></g><g class="edge"><path fill="none" stroke="#888" d="M271.077-75.082l27.702 31.165"/><path fill="#888" stroke="#888" d="M301.593-46.019l4.028 9.8-9.26-5.15 5.232-4.65z"/></g></g></svg>

Player has earned a card from capturing territories and is one or more card that can be drawn.

## Match State
Game state including who is the current player, the armies on each territory, and the cards each player holds.
The flat data structure contains mostly integers representing counts and indices.

| Field | Description |
| :---- | :---------- |
| state | the state of the game, such as "Battling" |
| territories | array with an entry for each territory on the board |
| cardOwner | array of player indicies, indicating who holds the card |
| playersUndeployedArmies | number of undeployed armies held by each player |
| trades | number of sets of cards traded by all players |
| captured | number of territories captured by player this turn |
| activeBattle | info about the current battle |
| currentPlayer | index of the current player |

 
```
{
  state: string,
  territories: Array<{
    owner: ?number,
    armies: number,
  }>,
  cardOwner: number[],
  playersUndeployedArmies: number[],
  trades: number,
  captured: number,
  activeBattle: ?{
    attackingTerritory: number,
    defendingTerritory: number,
    attackingDiceCount: number,
  },
  currentPlayer: number,
}
```

# Match Config
To setup a game match, we need some configuration to define game board and cards.

``` json
{
  "name": "default",
  "version": "1.0.0",
  "territories" : [
    ["Alaska",0,[1,2,37]],
    ["North West Territory",0,[0,2,6,5]],
    ["Alberta",0,[0,1,6,3]],
    ["Western United States",0,[2,6,4,8]],
    ["Central America",0,[3,8,9]],
    ["Greenland",0,[1,13,6,7]],
    ["Ontario",0,[1,2,3,5,7,8]],
    ["Quebec",0,[5,6,8]],
    ["Eastern United States",0,[3,4,6,7]],
    ["Venezuela",1,[4,10,11]],
    ["Peru",1,[9,11,12]],
    ["Brazil",1,[10,9,12,20]],
    ["Argentina",1,[10,11]],
    ["Iceland",2,[5,16,14]],
    ["Scandinavia",2,[13,15,17,16]],
    ["Ukraine",2,[14,27,29,30,17,19]],
    ["Great Britain",2,[13,14,17,18]],
    ["Northern Europe",2,[14,15,16,18,19]],
    ["Western Europe",2,[16,17,19,20]],
    ["Southern Europe",2,[15,17,18,20,21,30]],
    ["North Africa",3,[11,18,19,21,22,23]],
    ["Egypt",3,[19,20,23,30]],
    ["Congo",3,[20,23,24]],
    ["East Africa",3,[20,21,22,24,25]],
    ["South Africa",3,[22,23,25]],
    ["Madagascar",3,[23,24]],
    ["Siberia",4,[27,28,33,34,35]],
    ["Ural",4,[15,26,28,29]],
    ["China",4,[26,27,29,31,32,35]],
    ["Afghanistan",4,[15,27,28,30,31]],
    ["Middle East",4,[15,19,21,29,31]],
    ["India",4,[28,29,30,32]],
    ["Siam",4,[28,31,38]],
    ["Yakutsk",4,[26,34,37]],
    ["Irkutsk",4,[26,33,35,37]],
    ["Mongolia",4,[26,28,34,36,37]],
    ["Japan",4,[35,37]],
    ["Kamchatka",4,[0,33,34,35,36]],
    ["Indonesia",5,[32,40,39]],
    ["New Guinea",5,[38,40,41]],
    ["Western Australia",5,[38,39,41]],
    ["Eastern Australia",5,[39,40]]
  ],
  "continents": [
    ["North America", 5],
    ["South America", 2],
    ["Europe", 5],
    ["Africa", 3],
    ["Asia", 7],
    ["Australia", 2]
  ],
  "cards": [
    [0,0],
    [1,1],
    [0,2],
    [0,3],
    [2,4],
    [2,5],
    [2,6],
    [1,7],
    [1,8],
    [1,9],
    [2,10],
    [1,11],
    [0,12],
    [0,13],
    [1,14],
    [1,15],
    [2,16],
    [2,17],
    [0,18],
    [2,19],
    [0,20],
    [0,21],
    [2,22],
    [1,23],
    [1,24],
    [0,25],
    [1,26],
    [2,27],
    [2,28],
    [0,29],
    [1,30],
    [0,31],
    [1,32],
    [2,33],
    [0,34],
    [1,35],
    [0,36],
    [2,37],
    [2,38],
    [2,39],
    [1,40],
    [0,41],
    [3,null],
    [3,null]
  ],
  "minPlayers": 3,
  "maxPlayers": 6,
  "cardTypeNames": ["Infantry","Cavalry","Artillery","Wild"],
  "startingArmiesByPlayers": [0,0,0,40,35,30,25,20],
  "cardOccupiedTerritoryReward": 2
}

```
  