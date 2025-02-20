import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTableV2 extends SortableTableV1 {
  isSortLocally = true;
  constructor(headerConfig, { data = [], sorted = {} } = {}) {
    super(headerConfig, data);
    this.sorted = sorted;

    this.sort(this.sorted.id, this.sorted.order);

    this.createListeners();
  }

  handleHeaderCellClick(evt) {
    console.log(evt.target);
  }

  sort(fieldValue, orderValue) {
    if (this.isSortLocally) {
      this.sortOnClient(fieldValue, orderValue);
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(fieldValue, orderValue) {
    super.sort(fieldValue, orderValue);
  }

  createListeners() {
    this.subElements.header.addEventListener(
      "click",
      this.handleHeaderCellClick
    );
  }

  destroyListeners() {
    this.subElements.header.removeEventListener(
      "click",
      this.handleHeaderCellClick
    );
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}
