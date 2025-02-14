export default class SortableTable {
  orderValue = null;

  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.init();
  }

  selectSubElements() {
    this.element.querySelectorAll("[data-element]").forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  init() {
    this.element = this.createElement();
    this.renderTable();
    this.selectSubElements();
  }

  update() {
    const currentTable = this.element.querySelector(".sortable-table");
    if (currentTable) {
      currentTable.remove();
      this.renderTable();
      this.selectSubElements();
    }
  }

  createElement() {
    const containerElement = document.createElement("div");
    containerElement.dataset.element = "productsContainer";
    containerElement.classList.add("products-list__container");
    return containerElement;
  }

  renderTable() {
    this.element.appendChild(this.createTable());
  }

  createTable() {
    const tableElement = document.createElement("div");
    tableElement.classList.add("sortable-table");

    const tableTemplate = this.createTableTemplate("desc");

    tableElement.innerHTML = tableTemplate;

    const body = tableElement.querySelector(".sortable-table__body");

    this.subElements.body = body;

    return tableElement;
  }

  createTableTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig
          .map((headerCell) => {
            return `
                  <div class="sortable-table__cell" data-id="${
                    headerCell.id
                  }"data-sortable="${headerCell.sortable}" ${
              this.orderValue ? `data-order=${this.orderValue}` : ""
            }  >
                    <span>${headerCell.title}</span>
                    ${
                      headerCell.sortable
                        ? '<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>'
                        : ""
                    }

                  </div>
            `;
          })
          .reduce((acc, curr) => {
            acc += curr;
            return acc;
          }, "")}
      </div>
     <div data-element="body" class="sortable-table__body">
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
            .reduce((acc, curr) => {
              acc += curr;
              return acc;
            }, "")}
        </div>

      `;
  }

  sort(fieldValue, orderValue) {
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
