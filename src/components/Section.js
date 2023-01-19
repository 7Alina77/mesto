export class Section {
  constructor ({items, renderer}, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems () {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem (item) {
    this._container.append(item);
  }
}