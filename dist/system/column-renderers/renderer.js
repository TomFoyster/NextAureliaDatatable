'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, noView, ViewCompiler, ViewSlot, Container, ViewResources, bindable, _dec, _class, _desc, _value, _class2, _descriptor, ColumnRenderer;

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

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      ViewCompiler = _aureliaFramework.ViewCompiler;
      ViewSlot = _aureliaFramework.ViewSlot;
      Container = _aureliaFramework.Container;
      ViewResources = _aureliaFramework.ViewResources;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('ColumnRenderer', ColumnRenderer = (_dec = inject(ViewCompiler, ViewSlot, Container, ViewResources), noView(_class = _dec(_class = (_class2 = function () {
        function ColumnRenderer(viewCompiler, viewSlot, container, viewResources) {
          _classCallCheck(this, ColumnRenderer);

          _initDefineProp(this, 'value', _descriptor, this);

          this.availableRenderers = ['action'];

          this.viewCompiler = viewCompiler;
          this.viewSlot = viewSlot;
          this.container = container;
          this.viewResources = viewResources;
        }

        ColumnRenderer.prototype.attached = function attached() {
          var column = this.bindingContext.column;
          var html = this.getRenderedColumn();
          var viewFactory = this.viewCompiler.compile('<template>' + html + '</template>', this.viewResources);
          var view = viewFactory.create(this.container);

          view.bind(this.bindingContext);
          this.viewSlot.add(view);
          this.viewSlot.attached();
        };

        ColumnRenderer.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
        };

        ColumnRenderer.prototype.getRenderedColumn = function getRenderedColumn() {
          var renderer = this.bindingContext.column.renderer;
          if (renderer) {
            return renderer.toView(this.value);
          } else {
            return this.value;
          }
        };

        return ColumnRenderer;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('ColumnRenderer', ColumnRenderer);
    }
  };
});