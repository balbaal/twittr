class User {
  constructor() {
    this._users = null;

    this.USERNAME_LOGGED_KEY = 'usernameLoggedIn';
    this.USERS_KEY = 'users';
  }

  getUsers() {
    if (this._users === null) {
      try {
        const storedUsers = localStorage.getItem(this.USERS_KEY);
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
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
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

  userSignIn(userData) {
    const { username, password } = userData;

    if (username.trim() === '') {
      return {
        success: false,
        error: 'Username is empty',
      };
    }

    if (password.trim() === '') {
      return {
        success: false,
        error: 'Password is empty',
      };
    }

    const userList = this.getUsers();
    const isUserExist = userList.some(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password.toLowerCase() === password.toLowerCase()
    );

    if (isUserExist) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: 'Username or Password is wrong',
      };
    }
  }
}
