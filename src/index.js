
import MatchConfig from './MatchConfig';
import StateMachine from './StateMachine';
import actionCreators from './actionCreators';

export {ACTIONS, STATES, PSEUDOSTATES} from './constants';

const matchConfig = new MatchConfig();
const stateMachine = new StateMachine(matchConfig);

export {actionCreators, matchConfig};
export let isActionValid = stateMachine.isActionValid;
export let reduce = stateMachine.reduce;
