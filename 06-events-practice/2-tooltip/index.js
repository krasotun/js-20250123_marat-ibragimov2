class Tooltip {
  static instance;
  element = null;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initialize() {
    this.createListeners();
    this.createElement();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("tooltip");
  }

  render(template) {
    this.element = document.createElement("div");
    this.element.innerHTML = template;
    document.body.append(this.element);
  }

  createListeners() {
    document.addEventListener("pointerover", this.handleDocumentPointerover);
    document.addEventListener("pointerout", this.handleDocumentPointerout);
    document.addEventListener("pointermove", this.handleDocumentPointermove);
  }

  removeListeners() {
    document.removeEventListener("pointerover", this.handleDocumentPointerover);
    document.removeEventListener("pointerout", this.handleDocumentPointerout);
    document.removeEventListener("pointermove", this.handleDocumentPointermove);
  }

  moveTooltip(x, y) {
    this.element.style.marginLeft = `${x}px`;
    this.element.style.marginTop = `${y}px`;
  }

  handleDocumentPointerover = (evt) => {
    const shouldShowToolip = !!evt.target.dataset.tooltip;

    if (shouldShowToolip) {
      if (this.element) {
        this.element.remove();
      }

      this.createElement();

      const textContent = evt.target.dataset.tooltip;
      this.element.textContent = textContent;

      evt.target.prepend(this.element);

      const { offsetX, offsetY } = evt;

      this.moveTooltip(offsetX, offsetY);
    }
  };

  handleDocumentPointerout = (evt) => {
    if (
      this.element &&
      this.element.textContent === evt.target.dataset.tooltip
    ) {
      this.element.remove();
    }
  };

  handleDocumentPointermove = (evt) => {
    if (
      this.element &&
      this.element.textContent === evt.target.dataset.tooltip
    ) {
      const { offsetX, offsetY } = evt;
      this.moveTooltip(offsetX, offsetY);
    }
  };

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.removeListeners();
  }
}

export default Tooltip;
