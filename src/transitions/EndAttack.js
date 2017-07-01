// @flow
import type { TransitionType } from './TransitionType';

/**
 * You may stop attacking opponent's territories at anytime.
 */
export default (): TransitionType => ({
  guard: () => true,
  reduce: () => {},
});
