

# TradeCards

*Select three cards to trade for armies.*

Trade three cards for armies. The award increases after each trade made by any player during the match.

Trade | Award | 
---- | ---- | ----
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

![TradeCards state diagram](tradecards.svg)
  

## Action Object Format
The TradeCards actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "TradeCards"
`i` | `number` | Index of first card to trade. This card will receive a territory bonus.
`j` | `number` | Index of card to trade
`k` | `number` | Index of card to trade


## Action creator
`tradeCards(i: number, j: number, k: number)`


  
  