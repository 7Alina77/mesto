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

  appenItem (item) {
    this._container.append(item);
  }

  prependItem (item) {
    this._container.prepend(item);
  }
}