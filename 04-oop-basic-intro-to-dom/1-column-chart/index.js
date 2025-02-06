export default class ColumnChart {
  chartHeight = 50;
  isEmpty = false;

  constructor({
    data = [],
    label = "",
    value = null,
    link = "",
    formatHeading = (value) => value,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.isEmpty = !this.data.length;
    this.formatHeading = formatHeading;

    this.init();
  }

  init() {
    this.element = this.createElement();

    this.update(this.data);
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("column-chart");

    if (this.isEmpty) {
      element.classList.add("column-chart_loading");
    }

    element.style.setProperty("--chart-height", this.chartHeight);
    element.innerHTML = this.createTemplate();

    return element;
  }

  update(data) {
    const dataTemplate = this.createDataTemplate(data);

    const dataContainer = this.element.querySelector(".column-chart__chart");

    dataContainer.innerHTML = dataTemplate;
  }

  createDataTemplate(data) {
    const getColumnProps = (data) => {
      const maxValue = Math.max(...data);
      const scale = 50 / maxValue;

      return data.map((item) => {
        return {
          percent: ((item / maxValue) * 100).toFixed(0) + "%",
          value: String(Math.floor(item * scale)),
        };
      });
    };

    const columnProps = getColumnProps(data);

    return columnProps
      .map(
        ({ percent, value }) =>
          `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
      )
      .reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, "");
  }

  createTemplate() {
    return `
      <div class="column-chart__title">
        ${this.label}
        ${
          this.link
            ? `<a href="${this.link}" class="column-chart__link">View all</a>`
            : ""
        }
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${`${this.formatHeading(
          this.value
        )}`}
        </div>
      <div data-element="body" class="column-chart__chart">
      </div>
       `;
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }
}
