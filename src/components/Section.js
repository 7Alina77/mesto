export class Section {
  constructor ({renderer}, selector) {
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems (items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem (item) {
    this._container.append(item);
  }

  addNewCard (item) {
    this._container.prepend(item);
  }
}