

# EndTrade

*You may end trading as long as you hold four or fewer cards.*

End trading and begin the attacking phase of the turn. You must continue trading when you hold five or six cards.

![EndTrade state diagram](endtrade.svg)
  

## Action Object Format
The EndTrade actions must contain the following:

Field        | Type       | Description
------------ | ---------- | -----------
`type`     | `string` | "EndTrade"



## Action creator
`endTrade()`


  
  