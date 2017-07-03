

# Capture

*Capture the defeated territory by moving armies into it*

When you defeat all armies on a defending territory, you must occupy it by moving armies from the attacking territory. The number of armies moved must be at least the same number of dice rolled in the decisive battle.

![Capture state diagram](capture.svg)
  

## Action Object Format
The Capture actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "Capture"
`armies` | `number` | {number} - number of armies to move


## Action creator
`capture(armies: number)`


  
  