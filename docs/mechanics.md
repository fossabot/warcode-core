# WarCode Mechanics

Gameplay includes numerous phases.
This package uses a state machine to structure.
The following diagram illustrates the states and transitions
as a state machine.

![State Machine]
(<https://matthewspivey.github.io/warcode-core/docs/state-machine.svg>)

This diagram contains several elements.

-   _Boxes_ are states where the match is waiting on a player interaction, such as rolling the dice.
-   _Diamonds_ are pseudostates, such as the branch in the flow when a player wins the game.
-   _Lines_ are transitions.

The transitions with labels are documented below.

# StartMatch

Start match

The number of players determines the number of armies each player receive.
The traditional rules award each player the number shown in this table.
However, this may vary based on the match settings.

| Players | Armies |
| ------- | ------ |
| 3       | 35     |
| 4       | 30     |
| 5       | 25     |
| 6       | 20     |

**Examples**

```javascript
const initialMatchState = reduce();
// initialMatchState === { stateID: STATES.INITIALIZING, ... }
getPrompt(initialMatchState, initialMatchState);
// returns { type: ACTIONS.START_MATCH, minPlayers: 3, maxPlayers: 6 }
const action = startMatch(5);
// action === { type: ACTIONS.START_MATCH, playerCount: 5 }
const newMatchState = reduce(initialMatchState, action);
// newMatchState === { stateID: STATES.SELECTING_FIRST_PLAYER, ... }
```

# SelectFirstPlayer

Select player to take first move, similarly to each player rolling
a die to determine the first player at the beginning the game.

# OccupyTerritory

At the start of the game, each player takes turns placing a single army
on an unoccupied territory.

To occupy the territory, you must place an army on an unoccupied territory.
An unoccupied territory must have no owner or occupying armies.

Upon occupying the territory

-   The current player's undeployed armies are decremented
-   The territory owner is updated to the current layer
-   The territory armies are set to one
-   Turn is passed to the next player

# PlaceAdditionalArmy

After players claim all territories, players take turns placing one
of their undeployed armies on territory they occupy each turn.

When a player places an additional army,

-   The current player looses one undeployed army
-   The territory armies are incremented

# SetupNextTurn

At the beginning of your turn, you are awarded armies based on occupied
territories and continents.

The number of new armies is the sum of the following

-   The greater of 3 or ⅓ of an army for each territory owned
-   The sum of armies awarded for each continent the player controls

The match configuration defines the awards for each continent. For example,
the traditional rules use the following awards.

| Continent     | Award |
| ------------- | ----- |
| Asia          | 7     |
| North America | 5     |
| Europe        | 5     |
| Africa        | 3     |
| Australia     | 2     |
| South America | 2     |

# TradeCards

Trade three cards for armies. The award increases
after each trade made by any player during the match.

| Trade | Award |                  |
| ----- | ----- | ---------------- |
| 1     | 4     | (trade + 1) \* 2 |
| 2     | 6     | (trade + 1) \* 2 |
| 3     | 8     | (trade + 1) \* 2 |
| 4     | 10    | (trade + 1) \* 2 |
| 5     | 12    | (trade + 1) \* 2 |
| 6     | 15    | (trade - 3) \* 5 |
| 7     | 20    | (trade - 3) \* 5 |
| 8     | 25    | (trade - 3) \* 5 |
| 9     | 30    | (trade - 3) \* 5 |

An additional two armies may be awarded when one of the traded cards matches a territory the player occupies. These two armies are immediately placed on the territory itself. The award only applies to a single card.

The three cards must meet one of the following

-   types match: cards[i].type === cards[j].type AND cards[j].type == cards[k].type
-   types are unique: cards[i].type != cards[j].type AND cards[i].type != cards[k].type AND cards[j].type != cards[k].type
-   one is wild: cards[i].type == WILD OR cards[j].type == WILD OR cards[k].type == WILD

# EndTrade

You may end trading as long as you hold four or fewer cards.

# PlaceNewArmies

You must place all new armies earned during the beginning of the turn
and from trading cards.and

# EndAttack

You may stop attacking opponent's territories at anytime.

# Battle

The objective of battling is to capture an opponent's territory by defeating all of its armies.

To attack, you must select an attacking territory that

-   you own
-   has more than one army
-   is adjacent to the defending territory

When you attack, you must decide to roll 1, 2, or 3 dice. You can roll no
more dice than one more than the number of armies on the attacking territory.
For example, if you are attacking from a territory with three armies, you
may only roll two dice.

# RollDice

Simulate players rolling dice.

The attacker and defender may loose armies based on the random outcome of the
dice rolled. Compare the highest die rolled by the attacker and defender -
if the attacker's die is higher the defending territory looses an army,
otherwise the attacker looses an army. If the attacker and defender rolled
two or more dice, compare the second highest pair. If the attacker's die is
higher the defending territory looses an army, otherwise the attacker looses
an army.

The owner of the defending territory may roll a single die when the defending
territory contains a single army. When the territory contains multiple
armies, the defender may roll either one or two dice.

# Capture

When you defeat all armies on a defending territory, you must occupy it by
moving armies from the attacking territory. The number of armies moved must
be at least the same number of dice rolled in the decisive battle.

# Fortify

During fortification, you may move armies between two of your adjacent
territories before ending your turn.

Fortification has a few requirements

-   you own territory to move armies from
-   you own territory to move armies to
-   territories are share and adjacent border
-   armies to move are less than armies on source territory

    You may end your turn, skipping fortification.

# EndTurn

You end the turn, ending fortification.

# DrawRandomCard

Simulate player drawing a random card from the deck.
