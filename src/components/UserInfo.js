export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector ) {
    this._title = nameSelector;
    this._info = infoSelector;
    this._avatar = avatarSelector;
    this._userId = '';
  }

  getUserInfo() {
    const userData = {
      title: this._title.textContent,
      info: this._info.textContent,
      id: this._userId,
    };
    return userData;
  }

  setUserInfo(userData) {
    this._title.textContent = userData.name;
    this._info.textContent = userData.about;
    this._avatar.src = userData.avatar;
    this._userId = userData._id;
  }
}