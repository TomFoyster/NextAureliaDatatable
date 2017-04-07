import {bindable, inject, customElement} from "aurelia-framework";

// TODO:- Do we need this Element inject()?
@inject(Element)
export class Datatable {

  @bindable tableClass;
  @bindable rowClick;
  @bindable page;

  options = {};
  data = [];
  pagedData = [];
  columns = [];
  page;
  totalPages;
  totalItems = 0;

  constructor() {
    this.totalPages = 0;
    this.options = {
      "perPage": 10
    }
  }

  setColumns(columns) {
    this.columns = columns;
  }

  setData(data, resetPage) {
    // TODO:- Check if Array?
    this.data = data;
    if(resetPage || !this.page) {
      this.page = 1;
    }

    // Create Paged Data
    this.totalItems = this.data.length;
    this.totalPages = Math.ceil(this.totalItems / this.options.perPage);
    this.paginate();
  }

  // Update the Datatable options with the supplied values
  setOptions(params) {
    // TODO:- Check if object?
    Object.keys(params).map((param, index) => {
      this.options[param] = params[param];
    });

  }

  // Pagination Functions
  paginate() {
    this.startItem = (this.page * this.options.perPage) - (this.options.perPage - 1);
    this.endItem = (this.page * this.options.perPage);

    if(this.startItem > this.totalItems) this.startItem = this.totalItems;
    if(this.endItem > this.totalItems) this.endItem = this.totalItems;

    this.pagedData = this.data.slice((this.startItem -1), (this.endItem));
  }

  numberCheck(e) {
    // Catch Enter here too
    if(e.keyCode == 13) {
      this.go();
      e.preventDefault();
      return false;
    }

    // TODO:- This needs further revision. Has to allow numbers and non character keys (arrows, escape, etc)
    // but NOT letters and symbols.
    let value = e.key;
    if(value.length > 1) {
      return true;
    } else {
      let number = parseFloat(value);
      number = !isNaN(number) && isFinite(value) ? number : NaN;
      if(isNaN(number)) {
        e.preventDefault();
        return false;
      }
      return true;
    }
  }

  go() {
    if(this.page > this.totalPages) {
      this.page = this.totalPages;
    } else if(this.page < 1) {
      this.page = 1;
    }

    this.paginate();
  }

  first() {
    this.page = 1;
    this.paginate();
  }

  prev() {
    let page = parseInt(this.page);
    if(page > 1) {
      this.page = page - 1;
    } else {
      this.page = 1;
    }
    this.paginate();
  }

  next() {
    let page = parseInt(this.page);
    if(page < this.totalPages) {
      this.page = page + 1;
    } else {
      this.page = this.totalPages;
    }
    this.paginate();
  }

  last() {
    this.page = this.totalPages;
    this.paginate();
  }

  // Table Functions
  rowClickHandler(row) {
    if(typeof this.rowClick === 'function') {
      this.rowClick({
        "row": row
      });
    }
  }
}
