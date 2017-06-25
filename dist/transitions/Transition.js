'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Transition with guard or reduce, leaving a pseudostate */
var Transition = function () {
  function Transition(guard, reduce) {
    _classCallCheck(this, Transition);

    this.guardAttribute = guard;
    this.reduceAttribute = reduce;
  }

  _createClass(Transition, [{
    key: 'guard',


    /** @returns true, false, or undefined when there is no guard */
    value: function guard(action) {
      return this.guardAttribute(action);
    }
  }, {
    key: 'reduce',
    value: function reduce(action) {
      if (typeof this.reduceAttribute === 'function') {
        return this.reduceAttribute(action);
      }
      return undefined;
    }
  }, {
    key: 'action',
    get: function get() {
      return undefined;
    }
  }]);

  return Transition;
}();

exports.default = Transition;