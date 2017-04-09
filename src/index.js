// @flow
import type { MatchConfig } from './MatchConfig';
import { parseMatchConfig } from './MatchConfig';
import StateMachine from './StateMachine';
import actionCreators from './actionCreators';

export { ACTIONS, STATES, PSEUDOSTATES } from './constants';

const matchConfig: MatchConfig = parseMatchConfig();
const stateMachine = new StateMachine(matchConfig);

export { actionCreators, matchConfig };
export const isActionValid = stateMachine.isActionValid;
export const reduce = stateMachine.reduce;
