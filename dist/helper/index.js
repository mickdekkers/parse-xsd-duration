(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('parseXsdDuration', ['exports', '../index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index);
    global.parseXsdDuration = mod.exports;
  }
})(this, function (exports, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.objectToDuration = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _periodMatches, _timeMatches;

  var compareArrays = function compareArrays(array1, array2) {
    return array1.length === array2.length && array1.sort().every(function (value, index) {
      return value === array2.sort()[index];
    });
  };

  var isCorrectKeys = function isCorrectKeys(obj) {
    return compareArrays(Object.keys(obj), _index.allowedUnits);
  };

  var periodMatches = (_periodMatches = {}, _periodMatches[_index.YEAR_UNIT] = 'Y', _periodMatches[_index.MONTH_UNIT] = 'M', _periodMatches[_index.DAY_UNIT] = 'D', _periodMatches);

  var timeMatches = (_timeMatches = {}, _timeMatches[_index.HOUR_UNIT] = 'H', _timeMatches[_index.MINUTE_UNIT] = 'M', _timeMatches[_index.SECOND_UNIT] = 'S', _timeMatches);

  var getPart = function getPart(obj, initialObject, units, matches) {
    var result = initialObject;
    /**
     * All values must be number type
     */
    units.forEach(function (unit) {
      var inputValue = obj[unit];
      result[unit] = typeof inputValue === 'number' ? inputValue : 0;
    });
    var resultString = '';
    units.forEach(function (unit) {
      var inputValue = result[unit];
      resultString += inputValue + matches[unit];
    });
    return resultString;
  };

  var getPeriod = function getPeriod(obj) {
    return getPart(obj, _index.emptyPeriod, _index.periodUnits, periodMatches);
  };

  var getTime = function getTime(obj) {
    return getPart(obj, _index.emptyTime, _index.timeUnits, timeMatches);
  };

  var isValidObject = function isValidObject(obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
      throw new TypeError('expected input to be a object');
    }
    return isCorrectKeys(obj);
  };

  var objectToDuration = exports.objectToDuration = function objectToDuration(obj) {
    if (!isValidObject(obj)) return null;
    var negative = obj[_index.IS_NEGATIVE_UNIT] ? '-' : '';
    var periodStr = 'P' + getPeriod(obj);
    var timeStr = 'T' + getTime(obj);
    var result = negative + periodStr + timeStr;
    if (!(0, _index.isValidXsdDuration)(result)) return null;
    return result;
  };
});
//# sourceMappingURL=index.js.map