document.addEventListener('DOMContentLoaded', () => {
  const formManager = document.querySelector('#form-manager');
  const formFullname = document.querySelector('#form-fullname');
  const formUsername = document.querySelector('#form-username');
  const formAvatar = document.querySelector('#form-avatar');
  const formPassword = document.querySelector('#form-password');

  const instantMessage = document.querySelector('#instant-message');

  // Models:
  const userModel = new User();

  function generateCreateAt() {
    const currentDate = new Date();
    const fullYear = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0');

    return `${fullYear}-${month}-${date}`;
  }

  // Get value trigger button form
  formManager.addEventListener('submit', (event) => {
    event.preventDefault();

    const formValue = {
      fullname: formFullname.value,
      username: formUsername.value,
      avatar: formAvatar.value,
      password: formPassword.value,
      createAt: generateCreateAt(),
    };

    // Storing the Value: Instance Model
    const result = userModel.saveUser(formValue);

    // Response Condition
    if (result.success) {
      instantMessage.style.display = 'none';
      window.location.href = 'login.html';
    } else {
      instantMessage.style.display = 'flex';
      instantMessage.textContent = result.error;
    }
  });
});
