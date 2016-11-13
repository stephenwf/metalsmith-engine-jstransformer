'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var renderFile = require('./render-file');

var Engine = function () {
  function Engine(files, metalsmith, options) {
    _classCallCheck(this, Engine);

    this.files = files;
    this.options = options;
    this.metadata = metalsmith.metadata();
    this.source = metalsmith.source();
  }

  _createClass(Engine, [{
    key: 'render',
    value: function render(filename) {
      var _this = this;

      return new Promise(function (resolve) {
        // Transform file
        var newname = renderFile(_this.files, filename, _this.metadata, _this.source, _this.options);

        // If there were transforms store new file and delete the old
        if (newname !== filename) {
          _this.files[newname] = _this.files[filename];
          delete _this.files[filename];
        }

        resolve();
      });
    }
  }]);

  return Engine;
}();

module.exports = Engine;