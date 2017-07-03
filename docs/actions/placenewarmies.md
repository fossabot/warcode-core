

# PlaceNewArmies

*Place some undeployed armies on an occupied territory to start the turn*

You must place all new armies earned during the beginning of the turn and from trading cards.

![PlaceNewArmies state diagram](placenewarmies.svg)
  

## Action Object Format
The PlaceNewArmies actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "PlaceNewArmies"
`territoryIndex` | `number` | index of territory to place new armies
`armies` | `number` | number of armies to place


## Action creator
`placeNewArmies(territoryIndex: number, armies: number)`


  
  