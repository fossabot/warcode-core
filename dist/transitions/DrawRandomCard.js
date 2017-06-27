'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var cardOwner = extendedState.cardOwner,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    guard: function guard(_ref) {
      var type = _ref.type,
          cardIndex = _ref.cardIndex;
      return type === _constants.ACTIONS.DRAW_RANDOM_CARD && Number.isInteger(cardIndex) && cardIndex >= 0 && cardIndex < cardOwner.length && cardOwner[cardIndex] === undefined;
    },
    reduce: function reduce(_ref2) {
      var cardIndex = _ref2.cardIndex;
      return Object.assign({}, extendedState, {
        cardOwner: (0, _replaceElements3.default)(extendedState.cardOwner, _defineProperty({}, cardIndex, currentPlayerIndex)),
        capturedTerritories: undefined
      });
    }
  };
};

var _constants = require('../constants');

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Simulate player drawing a random card from the deck.
 */