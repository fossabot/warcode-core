

# OccupyTerritory
Select territory to occupy.
![OccupyTerritory state diagram](../docs/actions/occupyterritory.svg)
  

## Action Object Format
The OccupyTerritory actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "OccupyTerritory"
`territoryIndex` | `number` | Index of territory to occupy. It must be unoccupied.


## Action creator: `occupyTerritory(territoryIndex: number)`

  
  