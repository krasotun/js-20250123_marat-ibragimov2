export default class SortableTableV1 {
  fieldValue = null;
  orderValue = null;
  arrowElement = null;

  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.arrowElement = this.createArrowElement();

    this.element = this.createElement();

    this.renderTable();
    this.selectSubElements();
  }

  selectSubElements() {
    this.element.querySelectorAll("[data-element]").forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  update() {
    const headerCells = this.element.querySelectorAll(
      ".sortable-table__header .sortable-table__cell"
    );

    if (headerCells) {
      headerCells.forEach((cell) => cell.removeAttribute("data-order"));
    }

    const currentHeaderCell = this.element.querySelector(
      `[data-id=${this.fieldValue}]`
    );

    if (currentHeaderCell) {
      currentHeaderCell.dataset.order = this.orderValue;

      currentHeaderCell.append(this.arrowElement);
    }

    const currentTableBobyElement = this.element.querySelector(
      "[data-element='body']"
    );

    if (currentTableBobyElement) {
      currentTableBobyElement.remove();

      const newTableBodyElement = this.createTableBodyElement();

      const currentTable = this.element.querySelector(".sortable-table");

      currentTable.append(newTableBodyElement);
    }

    this.selectSubElements();
  }

  createElement() {
    const containerElement = document.createElement("div");
    containerElement.dataset.element = "productsContainer";
    containerElement.classList.add("products-list__container");
    return containerElement;
  }

  renderTable() {
    this.element.append(this.createTableElement());
  }

  createTableElement() {
    const tableElement = document.createElement("div");
    tableElement.classList.add("sortable-table");

    tableElement.append(this.createTableHeaderElement());
    tableElement.append(this.createTableBodyElement());

    return tableElement;
  }

  createTableHeaderElement() {
    const tableHeaderElement = document.createElement("div");
    tableHeaderElement.classList.add(
      "sortable-table__header",
      "sortable-table__row"
    );
    tableHeaderElement.dataset.element = "header";

    tableHeaderElement.innerHTML = this.createTableHeaderTemplate();

    return tableHeaderElement;
  }

  createTableBodyElement() {
    const tableBodyElement = document.createElement("div");
    tableBodyElement.classList.add("sortable-table__body");
    tableBodyElement.dataset.element = "body";

    tableBodyElement.innerHTML = this.createTableBodyTemplate();

    return tableBodyElement;
  }

  createArrowElement() {
    const arrowElement = document.createElement("span");
    arrowElement.classList.add("sortable-table__sort-arrow");
    arrowElement.dataset.element = "arrow";

    arrowElement.innerHTML = this.createArrowTemplate();

    return arrowElement;
  }

  createArrowTemplate() {
    return `
        <span class="sort-arrow"></span>
    `;
  }

  createTableHeaderTemplate() {
    return `
        ${this.headerConfig
          .map((headerCell) => {
            return `
                  <div class="sortable-table__cell" data-id="${headerCell.id}"data-sortable="${headerCell.sortable}"
            >
                    <span>${headerCell.title}</span>
                  </div>
            `;
          })
          .join("")}
      `;
  }

  createTableBodyTemplate() {
    return `
          ${this.data
            .map((el) => {
              return `
             <a href="/products/${el.id}" class="sortable-table__row">
                ${this.headerConfig
                  .map((headerCell) => {
                    return `
                      ${
                        headerCell.template
                          ? `${headerCell.template(el)}`
                          : `
                        <div class="sortable-table__cell">${
                          el[headerCell.id]
                        }</div>
                      `
                      }
                    `;
                  })
                  .reduce((acc, curr) => {
                    acc += curr;
                    return acc;
                  }, "")}

             </a>
                `;
            })
            .join("")}

      `;
  }

  sort(fieldValue, orderValue) {
    this.fieldValue = fieldValue;
    this.orderValue = orderValue;

    const { sortable, sortType } = this.headerConfig.find(
      (cell) => cell.id === fieldValue
    );

    if (!sortable) {
      return;
    }

    const sortNumbers = (arr, orderValue) => {
      const ascComparator = (a, b) => a[fieldValue] - b[fieldValue];

      const descComparator = (a, b) => b[fieldValue] - a[fieldValue];

      return [...arr].sort(
        orderValue === "asc" ? ascComparator : descComparator
      );
    };

    const sortStrings = (arr, orderValue) => {
      const ascComparator = (a, b) =>
        a[fieldValue].localeCompare(b[fieldValue], ["ru", "en"], {
          caseFirst: "upper",
        });

      const descComparator = (a, b) =>
        b[fieldValue].localeCompare(a[fieldValue], ["ru", "en"], {
          caseFirst: "upper",
        });

      return [...arr].sort(
        orderValue === "asc" ? ascComparator : descComparator
      );
    };

    if (sortType === "string") {
      this.data = sortStrings(this.data, orderValue);
    }

    if (sortType === "number") {
      this.data = sortNumbers(this.data, orderValue);
    }

    this.update();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
