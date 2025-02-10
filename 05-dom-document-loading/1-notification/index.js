export default class NotificationMessage {
  static lastShownComponent;

  constructor(text = "", { duration, type } = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement();
  }

  createElement() {
    const containerElement = document.createElement("div");
    containerElement.classList.add("notification");

    if (this.type) {
      containerElement.classList.add(`${this.type}`);
    }

    if (this.duration) {
      containerElement.style.setProperty("--value", `${this.duration}s`);
    }

    containerElement.innerHTML = this.createTemplate();

    return containerElement;
  }

  createTemplate() {
    return `
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.text}
          </div>
        </div>
    `;
  }

  show(container) {
    if (NotificationMessage.lastShownComponent) {
      NotificationMessage.lastShownComponent.destroy();
    }

    container
      ? container.append(this.element)
      : document.body.append(this.element);

    NotificationMessage.lastShownComponent = this;

    this.remove();
  }

  destroy() {
    this.element.remove();
  }

  remove() {
    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }
}
