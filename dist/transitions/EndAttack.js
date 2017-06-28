'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState, action) {
  return {
    action: action,
    guard: function guard(_ref) {
      var type = _ref.type;
      return type === action;
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};