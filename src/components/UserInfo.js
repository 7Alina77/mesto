export class UserInfo {
  constructor(nameSelector, infoSelector ) {
    this._title = nameSelector;
    this._info = infoSelector;
  }

  getUserInfo() {
    const userData = {
      title: this._title.textContent,
      info: this._info.textContent
    };
    return userData;
  }

  setUserInfo(userData) {
    this._title.textContent = userData.title;
    this._info.textContent = userData.about;
  }
}