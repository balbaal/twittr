class User {
  constructor() {
    this._users = null;

    this.USERS_KEY = 'users';
    this.USERNAME_LOGGED_KEY = 'usernameLoggedIn';
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
    const { fullname, username, avatar, password } = userData;

    // Validation input
    if (
      fullname.trim() === '' ||
      username.trim() === '' ||
      avatar.trim() === '' ||
      password.trim() === ''
    ) {
      return {
        success: false,
        error: 'All input form is required',
      };
    }

    // Prepare new user Register
    const newUser = {
      id: Date.now(),
      isActive: true,
      ...userData,
    };

    // Get existing Users
    const existingUsers = this.getUsers();
    existingUsers.push(newUser);

    // Update localstorage Users
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(existingUsers));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed register new User',
      };
    }
  }

  signInUser(userData) {
    const { username, password } = userData;

    // Validation form
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

    // Get all Users
    // to check valid Username & Password
    const userList = this.getUsers();
    const isUserValid = userList.some(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password.toLowerCase() === password.toLowerCase()
    );

    if (isUserValid) {
      return { success: true };
    } else {
      return { success: false, error: 'Username or Password is wrong' };
    }
  }
}
