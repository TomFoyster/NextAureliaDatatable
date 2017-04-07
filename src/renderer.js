import {inject, noView, ViewCompiler, ViewSlot, Container, ViewResources, bindable} from 'aurelia-framework';

@noView
@inject(ViewCompiler, ViewSlot, Container, ViewResources)
export class ColumnRenderer {

  @bindable value;

  availableRenderers = ['action'];

  constructor(viewCompiler, viewSlot, container, viewResources){
    this.viewCompiler = viewCompiler;
    this.viewSlot = viewSlot;
    this.container = container;
    this.viewResources = viewResources;
  }

  attached() {
    let column = this.bindingContext.column;
    let html = this.getRenderedColumn();
    var viewFactory = this.viewCompiler.compile('<template>' + html + '</template>', this.viewResources);
    var view = viewFactory.create(this.container);

    view.bind(this.bindingContext);
    this.viewSlot.add(view);
    this.viewSlot.attached();
  }

  bind(bindingContext) {
    this.bindingContext = bindingContext;
  }

  getRenderedColumn() {
    let renderer = this.bindingContext.column.renderer;
    if(renderer) {
      return renderer.toView(this.value);
    } else {
      return this.value;
    }
  }
}
