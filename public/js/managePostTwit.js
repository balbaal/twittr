document.addEventListener('DOMContentLoaded', () => {
  const formManagerPost = document.querySelector('#formManagerPost');
  const ownerPhoto = document.querySelector('#ownerPhoto');
  const inputPost = document.querySelector('#input-post');
  const instantMessage = document.querySelector('#instantMessage');

  const feelingEmoticons = document.querySelectorAll('.data-feeling');
  let selectedFeeling = null;

  feelingEmoticons.forEach((feeling) => {
    feeling.addEventListener('click', () => {
      selectedFeeling = feeling.getAttribute('data-feeling');

      feelingEmoticons.forEach((item) => {
        item.classList.remove('border-blue-water-100');
        item.classList.add('border-line');
      });

      feeling.classList.remove('border-line');
      feeling.classList.add('border-blue-water-100');
    });
  });

  const userModel = new User();
  const twitModel = new Twit();

  const usernameLoggedIn = localStorage.getItem(userModel.USERNAME_LOGGED_KEY);
  const userLoggedData = userModel
    .getUsers()
    .find((user) => user.username === usernameLoggedIn);

  ownerPhoto.src = userLoggedData.avatar;

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, '0');
  const date = String(dateNow.getDate()).padStart(2, '0');

  formManagerPost.addEventListener('submit', (event) => {
    event.preventDefault();

    const twitData = {
      twitText: inputPost.value,
      twitEmoticon: selectedFeeling,
      twitOwner: usernameLoggedIn,
      twitCreatedAt: `${year}-${month}-${date}`,
    };

    const result = twitModel.saveTwit(twitData);

    if (result.success) {
      instantMessage.style.display = 'none';
      inputPost.value = '';

      selectedFeeling = null;
      feelingEmoticons.forEach((item) => {
        item.classList.remove('border-blue-water-100');
        item.classList.add('border-line');
      });
    } else {
      instantMessage.style.display = 'flex';
      instantMessage.textContent = result.error;
    }
  });
});
