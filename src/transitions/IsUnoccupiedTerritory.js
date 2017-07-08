// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (config: MatchConfig, { territories }: MatchState): TransitionType => ({
  guard: () => territories.some(t => t.armies === 0),
  reduce: () => {},
});
