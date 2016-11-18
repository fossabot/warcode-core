"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextPlayerIndex;
// MUST BE RUN AT END OF TURN, USING EXTENDED STATE TO BE RETURNED BY REDUCER
function nextPlayerIndex(_ref) {
  var players = _ref.players,
      territories = _ref.territories,
      currentPlayerIndex = _ref.currentPlayerIndex;

  var activePlayers = activePlayerIndicies({ players: players, territories: territories });

  var i = activePlayers.indexOf(currentPlayerIndex);
  if (i + 1 < activePlayers.length) {
    return activePlayers[i + 1];
  }

  return activePlayers[0];
}

function activePlayerIndicies(_ref2) {
  var players = _ref2.players,
      territories = _ref2.territories;

  var indicies = new Set();

  // set players with undeployed armies
  if (Array.isArray(players)) {
    players.forEach(function (player, i) {
      if (player.undeployedArmies >= 1) {
        indicies.add(i);
      }
    });
  }

  // set players occupying territories
  if (Array.isArray(territories)) {
    territories.forEach(function (territory) {
      if (Number.isInteger(territory.owner)) {
        indicies.add(territory.owner);
      }
    });
  }

  return Array.from(indicies).sort();
}