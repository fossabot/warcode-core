import actionCreators from './actionCreators.js';
import {ACTIONS, STATES, PSEUDOSTATES} from './constants.js';
import MatchConfig from './MatchConfig.js';
import StateMachine from './StateMachine.js';

const matchConfig = new MatchConfig();
const stateMachine = new StateMachine(matchConfig);

export default {
  actionCreators,
  isActionValid: stateMachine.isActionValid,
  reduce: stateMachine.reduce,
  ACTIONS,
  STATES,
  PSEUDOSTATES
};
