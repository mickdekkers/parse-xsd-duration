(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('parseXsdDuration', ['module', './helper/index.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./helper/index.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.index);
    global.parseXsdDuration = mod.exports;
  }
})(this, function (module, _index) {
  'use strict';

  module.exports = { objectToDuration: _index.objectToDuration };
});
//# sourceMappingURL=helper.js.map