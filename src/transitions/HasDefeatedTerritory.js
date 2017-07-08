// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (
  config: MatchConfig,
  { territories, activeBattle }: MatchState
): TransitionType => ({
  guard: () => !!activeBattle && territories[activeBattle.defendingTerritoryIndex].armies === 0,
  reduce: () => {},
});
