

# RollDice
Simulate attacker and defender rolling dice.
![RollDice state diagram](../docs/actions/rolldice.svg)
  

## Action Object Format
The RollDice actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "RollDice"
`attackerDice` | `undefined` | dice rolled by attacker
`defenderDice` | `undefined` | dice rolled by defender


## Action creator: `rollDice(attackerDice: undefined, defenderDice: undefined)`

  
  