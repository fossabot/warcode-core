// @flow
import defaultConfig from '../data/default.json';

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

export default (config: MatchConfig = defaultConfig): MatchConfig => {
  // TODO: validate the configs graph, cards, etc
  // TODO: document this reducer
  const reduce = (acc, [name, continentIndex, neighborIndicies], territory) =>
    acc.concat(neighborIndicies.map(neighborIndex => [territory, neighborIndex]));

  return Object.assign({}, config, {
    edges: config.territories.reduce(reduce, []),
  });
};
