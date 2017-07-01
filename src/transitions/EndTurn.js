// @flow
import type { TransitionType } from './TransitionType';
/**

 * You end the turn, ending fortification.
 */
export default (): TransitionType => ({
  guard: () => true,
  reduce: () => {},
});
