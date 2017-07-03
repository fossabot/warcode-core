

# PlaceAdditionalArmy
Select a territory you own to place an additional army.
![PlaceAdditionalArmy state diagram](../docs/actions/placeadditionalarmy.svg)
  

## Action Object Format
The PlaceAdditionalArmy actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "PlaceAdditionalArmy"
`territoryIndex` | `number` | Index of territory to place an additional army. You must occupy it.


## Action creator: `placeAdditionalArmy(territoryIndex: number)`

  
  