'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Simulate player drawing a random card from the deck.
 */
exports.default = function (matchConfig, _ref) {
  var cardOwner = _ref.cardOwner,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard(_ref2) {
      var cardIndex = _ref2.cardIndex;
      return Number.isInteger(cardIndex) && cardIndex >= 0 && cardIndex < cardOwner.length && cardOwner[cardIndex] === undefined;
    },
    reduce: function reduce(_ref3) {
      var cardIndex = _ref3.cardIndex;
      return {
        cardOwner: (0, _replaceElements3.default)(cardOwner, _defineProperty({}, cardIndex, currentPlayerIndex)),
        capturedTerritories: undefined
      };
    }
  };
};