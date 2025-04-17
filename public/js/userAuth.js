// Checking user logged in ?

document.addEventListener('DOMContentLoaded', function () {
  const userModel = new User();

  const usernameLoggedIn = localStorage.getItem(userModel.USERNAME_LOGGED_KEY);
  console.log(usernameLoggedIn);

  if (!usernameLoggedIn) {
    return (window.location.href = 'login.html');
  }
});
