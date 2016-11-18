import traditionalConfig from '../data/traditional.json';

class MatchConfig {
  constructor({name, version, territories, continents, cards, cardTypes, cardTypeNames, minPlayers, maxPlayers, startingArmiesByPlayers, cardOccupiedTerritoryReward} = traditionalConfig) {
    this.name = name;
    this.verison = version;
    this.territories = territories;
    this.continents = continents;
    this.cards = cards; // [type, territoryIndex]
    this.cardTypeNames = cardTypeNames; // "cardTypeNames": ["Infantry","Cavalry","Artillery","Wild"]
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.startingArmiesByPlayers = startingArmiesByPlayers;
    this.cardOccupiedTerritoryReward = cardOccupiedTerritoryReward;
  }

  /** adjacency list for undirected graph */
  get edges() {
    let edges = [];
    this.territories.forEach((t, i) => {
      t[2].forEach((j) => {
          edges.push([i, j]);
      });
    });
    return edges;
  }
}

export default MatchConfig;
