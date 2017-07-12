// @flow

export type TransitionType = {
  guard?: (action: Object) => boolean, // TODO - replace Object with flow types for each action
  reduce?: (action: Object) => any, // subset of { players, territories, currentPlayer }
};
