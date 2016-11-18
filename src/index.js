
import MatchConfig from './MatchConfig';
import StateMachine from './StateMachine';
import actionCreators from './actionCreators';

export {ACTIONS, STATES, PSEUDOSTATES} from './constants';
export {actionCreators};

const stateMachine = new StateMachine(new MatchConfig());

export let isActionValid = stateMachine.isActionValid;
export let reduce = stateMachine.reduce;
