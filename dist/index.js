(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('parseXsdDuration', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.parseXsdDuration = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var UNITS = {
    YEAR: 31536000,
    MONTH: 2628000,
    DAY: 86400,
    HOUR: 3600,
    MINUTE: 60,
    SECOND: 1
  };

  // Regex taken from https://www.w3.org/TR/xmlschema11-2/#duration-lexical-space
  var isValidXsdDuration = function isValidXsdDuration(str) {
    return (/^-?P((([0-9]+Y([0-9]+M)?([0-9]+D)?|([0-9]+M)([0-9]+D)?|([0-9]+D))(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S)))?)|(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S))))$/.test(str)
    );
  };
  var isNonEmptyString = function isNonEmptyString(input) {
    return typeof input === 'string' && input.length > 0;
  };
  var isNegative = function isNegative(str) {
    return str[0] === '-';
  };
  var stripFirstChar = function stripFirstChar(str) {
    return str.slice(1);
  };
  var unitToSeconds = function unitToSeconds(unit, amount) {
    return UNITS[unit.toUpperCase()] * amount;
  };

  var parseUnit = function parseUnit(unit, amount) {
    var amt = parseFloat(amount);
    if (isNaN(amt)) return 0;
    return unitToSeconds(unit, amt);
  };

  var parsePeriod = function parsePeriod(period) {
    var _ref = /^(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?$/g.exec(period) || [],
        year = _ref[1],
        month = _ref[2],
        day = _ref[3];

    return parseUnit('year', year) + parseUnit('month', month) + parseUnit('day', day);
  };

  var parseTime = function parseTime(time) {
    var _ref2 = /^(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/g.exec(time) || [],
        hour = _ref2[1],
        minute = _ref2[2],
        second = _ref2[3];

    return parseUnit('hour', hour) + parseUnit('minute', minute) + parseUnit('second', second);
  };

  var parse = function parse(str) {
    var neg = isNegative(str);
    var duration = neg ? stripFirstChar(str) : str;
    var splitDuration = duration.split('T');
    var period = stripFirstChar(splitDuration[0]);
    var time = splitDuration[1];

    var output = 0;
    if (isNonEmptyString(period)) output += parsePeriod(period);
    if (isNonEmptyString(time)) output += parseTime(time);
    return neg ? -output : output;
  };

  exports.default = function (input) {
    // Throw error for non-string input
    if (typeof input !== 'string') {
      throw new TypeError('expected input to be a string');
    }
    // Return null for invalid input
    if (!isValidXsdDuration(input)) return null;
    // Parse valid input
    return parse(input);
  };

  module.exports = exports['default'];
});
//# sourceMappingURL=index.js.map