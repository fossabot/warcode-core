// @flow
import type {MatchConfig} from './MatchConfig';
import {parseMatchConfig} from './MatchConfig';
import StateMachine from './StateMachine';
import actionCreators from './actionCreators';

export {ACTIONS, STATES, PSEUDOSTATES} from './constants';

const matchConfig: MatchConfig = parseMatchConfig();
const stateMachine = new StateMachine(matchConfig);

export {actionCreators, matchConfig};
export let isActionValid = stateMachine.isActionValid;
export let reduce = stateMachine.reduce;
