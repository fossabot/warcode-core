// @flow
import traditionalConfig from '../data/traditional.json';

export type MatchConfig = {
  name: string,
  version: string,
  territories: Array<[string, number, number[]]>,
  continents: Array<[string, number]>,
  cards: Array<[number, number]>,
  cardTypeNames: string[],
  minPlayers: number,
  maxPlayers: number,
  startingArmiesByPlayers: number[],
  cardOccupiedTerritoryReward: number,
  // adjacency list for undirected graph
  edges: Array<[number, number]>,
};

export default (config: MatchConfig = traditionalConfig): MatchConfig => {
  // TODO: validate the configs graph, cards, etc
  // TODO: document this reducer
  const reduce = (acc, [name, continentIndex, neighborIndicies], territoryIndex) =>
    acc.concat(neighborIndicies.map(neighborIndex => [territoryIndex, neighborIndex]));

  return Object.assign({}, config, {
    edges: config.territories.reduce(reduce, []),
  });
};
