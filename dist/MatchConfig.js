'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseMatchConfig = parseMatchConfig;

var _traditional = require('../data/traditional.json');

var _traditional2 = _interopRequireDefault(_traditional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseMatchConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _traditional2.default;

  // TODO: validate graph, cards, etc

  config.edges = config.territories.reduce(function (acc, _ref, territoryIndex) {
    var _ref2 = _slicedToArray(_ref, 3),
        name = _ref2[0],
        continentIndex = _ref2[1],
        neighborIndicies = _ref2[2];

    var edges = [];
    neighborIndicies.forEach(function (neighborIndex) {
      edges.push([territoryIndex, neighborIndex]);
    });
    return acc.concat(edges);
  }, []);

  return config;
}