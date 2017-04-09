// @flow
import traditionalConfig from '../data/traditional.json';

export type MatchConfig = {
  name: string;
  version: string;
  territories: Array<[string, number, number[]]>;
  continents: Array<[string, number]>;
  cards: Array<[number, number]>;
  cardTypeNames: string[];
  minPlayers: number;
  maxPlayers: number;
  startingArmiesByPlayers: number[];
  cardOccupiedTerritoryReward: number;
  // adjacency list for undirected graph
  edges: Array<[number, number]>;
}

export function parseMatchConfig(config: MatchConfig = traditionalConfig): MatchConfig {
  // TODO: validate graph, cards, etc

  config.edges = config.territories.reduce((acc, [name, continentIndex, neighborIndicies], territoryIndex) => {
    const edges = [];
    neighborIndicies.forEach((neighborIndex) => {
      edges.push([territoryIndex, neighborIndex]);
    });
    return acc.concat(edges);
  }, []);

  return config;
}
