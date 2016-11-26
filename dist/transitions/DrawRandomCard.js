'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Simulate player drawing a random card from the deck.
 */


exports.default = function (matchConfig, extendedState) {
  var cardOwner = extendedState.cardOwner,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var cardIndex = action.cardIndex;


    return Number.isInteger(cardIndex) && cardIndex >= 0 && cardIndex < cardOwner.length && cardOwner[cardIndex] === undefined;
  };

  var reduce = function reduce(action) {
    var cardIndex = action.cardIndex;


    return _extends({}, extendedState, {
      cardOwner: (0, _replaceElements3.default)(extendedState.cardOwner, _defineProperty({}, cardIndex, currentPlayerIndex)),
      capturedTerritories: undefined
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.DRAW_RANDOM_CARD, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }