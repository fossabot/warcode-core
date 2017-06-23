'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _traditional = require('../data/traditional.json');

var _traditional2 = _interopRequireDefault(_traditional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _traditional2.default;

  // TODO: validate graph, cards, etc
  var reduce = function reduce(acc, _ref, territoryIndex) {
    var _ref2 = _slicedToArray(_ref, 3),
        name = _ref2[0],
        continentIndex = _ref2[1],
        neighborIndicies = _ref2[2];

    return acc.concat(neighborIndicies.map(function (neighborIndex) {
      return [territoryIndex, neighborIndex];
    }));
  };

  return Object.assign({}, config, {
    edges: config.territories.reduce(reduce, [])
  });
};