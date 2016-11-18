import actionCreators from './actionCreators';
import {ACTIONS, STATES, PSEUDOSTATES} from './constants';
import MatchConfig from './MatchConfig';
import StateMachine from './StateMachine';

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
