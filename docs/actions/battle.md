

# Battle
Select a territory to attack, neighboring defending territory, and dice to roll
![Battle state diagram](../docs/actions/battle.svg)
  

## Action Object Format
The Battle actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "Battle"
`attackingTerritoryIndex` | `number` | index of attacking territory
`defendingTerritoryIndex` | `number` | index of defending territory
`attackingDiceCount` | `number` | number of dice to be rolled by attacker


## Action creator: `battle(attackingTerritoryIndex: number, defendingTerritoryIndex: number, attackingDiceCount: number)`

  
  