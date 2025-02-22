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
  }

  createElement(textContent) {
    this.element = document.createElement("div");
    this.element.classList.add("tooltip");
    this.element.textContent = textContent;
  }

  render(template) {
    this.element = document.createElement("div");
    this.element.innerHTML = template;
    document.body.append(this.element);
  }

  createListeners() {
    document.addEventListener("pointerover", this.handleDocumentPointerover);
    document.addEventListener("pointerout", this.handleDocumentPointerout);
  }

  removeListeners() {
    document.removeEventListener("pointerover", this.handleDocumentPointerover);
    document.removeEventListener("pointerout", this.handleDocumentPointerout);
  }

  handleDocumentPointerover = (evt) => {
    console.log("over", evt.target);

    const shouldShowToolip = !!evt.target.dataset.tooltip;

    if (shouldShowToolip) {
      if (this.element) {
        this.element.remove();
      }

      this.createElement(evt.target.dataset.tooltip);
      evt.target.append(this.element);
    }
  };

  handleDocumentPointerout = () => {
    if (this.element) {
      this.element.remove();
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
