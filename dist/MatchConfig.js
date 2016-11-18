'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _traditional = require('../data/traditional.json');

var _traditional2 = _interopRequireDefault(_traditional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MatchConfig = function () {
  function MatchConfig() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _traditional2.default,
        name = _ref.name,
        version = _ref.version,
        territories = _ref.territories,
        continents = _ref.continents,
        cards = _ref.cards,
        cardTypes = _ref.cardTypes,
        cardTypeNames = _ref.cardTypeNames,
        minPlayers = _ref.minPlayers,
        maxPlayers = _ref.maxPlayers,
        startingArmiesByPlayers = _ref.startingArmiesByPlayers,
        cardOccupiedTerritoryReward = _ref.cardOccupiedTerritoryReward;

    _classCallCheck(this, MatchConfig);

    this.name = name;
    this.verison = version;
    this.territories = territories;
    this.continents = continents;
    this.cards = cards; // [type, territoryIndex]
    this.cardTypeNames = cardTypeNames; // "cardTypeNames": ["Infantry","Cavalry","Artillery","Wild"]
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.startingArmiesByPlayers = startingArmiesByPlayers;
    this.cardOccupiedTerritoryReward = cardOccupiedTerritoryReward;
  }

  /** adjacency list for undirected graph */


  _createClass(MatchConfig, [{
    key: 'edges',
    get: function get() {
      var edges = [];
      this.territories.forEach(function (t, i) {
        t[2].forEach(function (j) {
          edges.push([i, j]);
        });
      });
      return edges;
    }
  }]);

  return MatchConfig;
}();

exports.default = MatchConfig;