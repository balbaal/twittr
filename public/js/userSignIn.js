document.addEventListener('DOMContentLoaded', () => {
  const formManagerElement = document.querySelector('#formManager');
  const inputUsername = document.querySelector('#input-username');
  const inputPassword = document.querySelector('#input-password');

  const instantMessage = document.querySelector('#instantMessage');

  const modelUser = new User();

  formManagerElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const formValue = {
      username: inputUsername.value,
      password: inputPassword.value,
    };

    const result = modelUser.userSignIn(formValue);

    if (result.success) {
      instantMessage.style.display = 'none';
      localStorage.setItem(modelUser.USERNAME_LOGGED_KEY, formValue.username);
      window.location.href = 'index.html';
    } else {
      instantMessage.style.display = 'flex';
      instantMessage.textContent = result.error;
    }
  });
});
