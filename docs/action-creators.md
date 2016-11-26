# startMatch

Start the match.

**Parameters**

-   `playerCount` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number of players. The match settings determine the minimum and maximum number of players.

**Examples**

```javascript
let state = stateMachine.reduce();
let action = actionCreators.startMatch(3);
state = stateMachine.reduce(state, action);
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# selectFirstPlayer

Select player to take first move, similarly to each player rolling a die
to begin the game.

**Parameters**

-   `firstPlayerIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the first player.

**Examples**

```javascript
let state = stateMachine.reduce();
let action = actionCreators.startMatch(3);
state = stateMachine.reduce(state, action);
action = actionCreators.selectFirstPlayer(0);
state = stateMachine.reduce(state, action);
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# occupyTerritory

Select territory to occupy.

**Parameters**

-   `territoryIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of territory to occupy. It must be unoccupied.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# placeAdditionalArmy

Select a territory you own to place an additional army.

**Parameters**

-   `territoryIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of territory to place an additional army. You must occupy it.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# tradeCards

Select three cards to trade for armies.

**Parameters**

-   `i` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of first card to trade. This card will receive a territory bonus.
-   `j` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of card to trade
-   `k` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of card to trade

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# endTrade

End trading and begin the attacking phase of the turn.
You must continue trading when you hold five or six cards.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# placeNewArmies

Place some undeployed armies on an occupied territory to start the turn

**Parameters**

-   `territoryIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of territory to place new armies
-   `armies` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of armies to place

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# battle

Select a territory to attack, neighboring defending territory, and dice to roll

**Parameters**

-   `attackingTerritoryIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of attacking territory
-   `defendingTerritoryIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of defending territory
-   `attackingDiceCount` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of dice to be rolled by attacker

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# rollDice

Simulate attacker and defender rolling dice.

**Parameters**

-   `attackerDice`  dice rolled by attacker
-   `defenderDice`  dice rolled by defender

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# endAttack

End attack and begin fortifying

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# capture

Capture the defeated territory by moving armies into it

**Parameters**

-   `armies` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** {number} - number of armies to move

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# fortify

Move armies between two of your adjacent territories before ending your turn.

**Parameters**

-   `fromTerritoryIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of territory to move armies from. Must be owned by you, have more than one army, and be adjacent to toTerritoryIndex.
-   `toTerritoryIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of territory to move armies to. Must be owned by you and adjacent to fromTerritoryIndex.
-   `armies` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number of armies to move. You must leave one army behind, so the number may between one and the number of the armies on fromTerritoryIndex.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# endTurn

End turn without fortifying.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

# drawRandomCard

Select "random" card for player to draw from the deck.

**Parameters**

-   `cardIndex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the card to assign. Card owner must be currently undefined.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
