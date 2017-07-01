'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  return {
    guard: undefined,
    reduce: function reduce() {
      return Object.assign({}, extendedState, {
        currentPlayerIndex: (0, _nextPlayerIndex2.default)(extendedState)
      });
    }
  };
};

var _nextPlayerIndex = require('./nextPlayerIndex');

var _nextPlayerIndex2 = _interopRequireDefault(_nextPlayerIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }