import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTableV2 extends SortableTableV1 {
  constructor(headerConfig, { data = [], sorted = {} } = {}) {
    super(headerConfig, data);
    this.sorted = sorted;
  }

  init() {
    super.init();
    console.log(this);
    console.log(this.sorted);
  }
}
