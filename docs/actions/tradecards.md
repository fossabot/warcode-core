

# TradeCards
Select three cards to trade for armies.
![TradeCards state diagram](tradecards.svg)
  

## Action Object Format
The TradeCards actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "TradeCards"
`i` | `number` | Index of first card to trade. This card will receive a territory bonus.
`j` | `number` | Index of card to trade
`k` | `number` | Index of card to trade


## Action creator: `tradeCards(i: number, j: number, k: number)`

  
  