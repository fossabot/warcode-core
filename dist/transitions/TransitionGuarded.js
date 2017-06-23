'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Transition2 = require('./Transition');

var _Transition3 = _interopRequireDefault(_Transition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Transition out of a state triggered by player interaction */
var TransitionGuarded = function (_Transition) {
  _inherits(TransitionGuarded, _Transition);

  function TransitionGuarded(expectedActionType, guard, reduce) {
    _classCallCheck(this, TransitionGuarded);

    var _this = _possibleConstructorReturn(this, (TransitionGuarded.__proto__ || Object.getPrototypeOf(TransitionGuarded)).call(this, guard, reduce));

    _this.expectedActionType = expectedActionType;
    return _this;
  }

  _createClass(TransitionGuarded, [{
    key: 'guard',


    /** @returns true or false */
    value: function guard(action) {
      return this.expectedActionType === action.type && !!_get(TransitionGuarded.prototype.__proto__ || Object.getPrototypeOf(TransitionGuarded.prototype), 'guard', this).call(this, action);
    }
  }, {
    key: 'action',
    get: function get() {
      return this.expectedActionType;
    }
  }]);

  return TransitionGuarded;
}(_Transition3.default);

exports.default = TransitionGuarded;