document.addEventListener('DOMContentLoaded', () => {
  const formManager = document.querySelector('#form-manager');
  const formUsername = document.querySelector('#form-username');
  const formPassword = document.querySelector('#form-password');

  const instantMessage = document.querySelector('#instant-message');

  // Instance model User:
  const modelUser = new User();

  // Trigger Login Button
  formManager.addEventListener('submit', (event) => {
    event.preventDefault();

    // Catch value input form
    const formValue = {
      username: formUsername.value,
      password: formPassword.value,
    };

    // Check user login is valid or not
    // in Model User
    const result = modelUser.signInUser(formValue);

    // Response Condition
    if (result.success) {
      instantMessage.style.display = 'none';

      // Storing username that Success logged In
      localStorage.setItem(modelUser.USERNAME_LOGGED_KEY, formValue.username);

      window.location.href = 'index.html';
    } else {
      instantMessage.style.display = 'flex';
      instantMessage.textContent = result.error;
    }
  });
});
