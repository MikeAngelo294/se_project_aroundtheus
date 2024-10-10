export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems(items) {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(newItem) {
    this._element.prepend(newItem);
  }
}
