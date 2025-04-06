document.addEventListener('DOMContentLoaded', () => {
  const formManagerElement = document.querySelector('#formManager');
  const inputFullname = document.querySelector('#input-fullname');
  const inputUsername = document.querySelector('#input-username');
  const inputAvatar = document.querySelector('#input-avatar');
  const inputPassword = document.querySelector('#input-password');

  const instantMessage = document.querySelector('#instantMessage');

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, '0');
  const date = String(dateNow.getDate()).padStart(2, '0');

  const userModel = new User();

  formManagerElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const formValue = {
      fullname: inputFullname.value,
      username: inputUsername.value,
      avatar: inputAvatar.value,
      password: inputPassword.value,
      created: `${year}-${month}-${date}`,
    };

    const result = userModel.saveUser(formValue);

    if (result.success) {
      instantMessage.style.display = 'none';
      window.location.href = 'login.html';
    } else {
      instantMessage.style.display = 'flex';
      instantMessage.textContent = result.error;
    }
  });
});
