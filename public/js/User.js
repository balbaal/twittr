class User {
  constructor() {
    this._users = null;
  }

  getUsers() {
    if (this._users === null) {
      try {
        const storedUsers = localStorage.getItem('users');
        this._users = storedUsers ? JSON.parse(storedUsers) : [];
      } catch (error) {
        return (this._users = []);
      }
    }

    return this._users;
  }

  saveUser(userData) {
    const { fullname, username, avatar, password, created } = userData;

    if (
      fullname.trim() === '' ||
      username.trim() === '' ||
      avatar.trim() === '' ||
      password.trim() === '' ||
      created.trim() === ''
    ) {
      return {
        success: false,
        error: 'All input form is required',
      };
    }

    const newUser = {
      id: new Date(),
      isActive: true,
      ...userData,
    };

    const users = this.getUsers();
    users.push(newUser);

    try {
      localStorage.setItem('users', JSON.stringify(users));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed register new User',
      };
    }

    return {
      success: true,
      error: '',
    };
  }
}
