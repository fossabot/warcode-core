// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default (matchConfig: MatchConfig, { players }: MatchState): TransitionType => ({
  guard: () => players.every(p => p.undeployedArmies === 0),
  reduce: () => {},
});
