// @flow
import type { TransitionType } from '../TransitionType';

export default (): TransitionType => ({
  guard: undefined,
  reduce: () => {},
});
