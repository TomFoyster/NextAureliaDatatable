define(["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Datatable = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var Datatable = exports.Datatable = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
    function Datatable() {
      _classCallCheck(this, Datatable);

      _initDefineProp(this, "tableClass", _descriptor, this);

      _initDefineProp(this, "rowClick", _descriptor2, this);

      _initDefineProp(this, "page", _descriptor3, this);

      this.options = {};
      this.data = [];
      this.pagedData = [];
      this.columns = [];
      this.totalItems = 0;

      this.totalPages = 0;
      this.options = {
        "perPage": 10
      };
    }

    Datatable.prototype.setColumns = function setColumns(columns) {
      this.columns = columns;
    };

    Datatable.prototype.setData = function setData(data, resetPage) {
      this.data = data;
      if (resetPage || !this.page) {
        this.page = 1;
      }

      this.totalItems = this.data.length;
      this.totalPages = Math.ceil(this.totalItems / this.options.perPage);
      this.paginate();
    };

    Datatable.prototype.setOptions = function setOptions(params) {
      var _this = this;

      Object.keys(params).map(function (param, index) {
        _this.options[param] = params[param];
      });
    };

    Datatable.prototype.paginate = function paginate() {
      this.startItem = this.page * this.options.perPage - (this.options.perPage - 1);
      this.endItem = this.page * this.options.perPage;

      if (this.startItem > this.totalItems) this.startItem = this.totalItems;
      if (this.endItem > this.totalItems) this.endItem = this.totalItems;

      this.pagedData = this.data.slice(this.startItem - 1, this.endItem);
    };

    Datatable.prototype.numberCheck = function numberCheck(e) {
      if (e.keyCode == 13) {
        this.go();
        e.preventDefault();
        return false;
      }

      var value = e.key;
      if (value.length > 1) {
        return true;
      } else {
        var number = parseFloat(value);
        number = !isNaN(number) && isFinite(value) ? number : NaN;
        if (isNaN(number)) {
          e.preventDefault();
          return false;
        }
        return true;
      }
    };

    Datatable.prototype.go = function go() {
      if (this.page > this.totalPages) {
        this.page = this.totalPages;
      } else if (this.page < 1) {
        this.page = 1;
      }

      this.paginate();
    };

    Datatable.prototype.first = function first() {
      this.page = 1;
      this.paginate();
    };

    Datatable.prototype.prev = function prev() {
      var page = parseInt(this.page);
      if (page > 1) {
        this.page = page - 1;
      } else {
        this.page = 1;
      }
      this.paginate();
    };

    Datatable.prototype.next = function next() {
      var page = parseInt(this.page);
      if (page < this.totalPages) {
        this.page = page + 1;
      } else {
        this.page = this.totalPages;
      }
      this.paginate();
    };

    Datatable.prototype.last = function last() {
      this.page = this.totalPages;
      this.paginate();
    };

    Datatable.prototype.rowClickHandler = function rowClickHandler(row) {
      if (typeof this.rowClick === 'function') {
        this.rowClick({
          "row": row
        });
      }
    };

    return Datatable;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tableClass", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rowClick", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "page", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});