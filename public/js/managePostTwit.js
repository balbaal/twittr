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

  // Create New Twit
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

      displayAllTwit(twitModel.getTwits());
    } else {
      instantMessage.style.display = 'flex';
      instantMessage.textContent = result.error;
    }
  });

  // Get All Twit
  const getExistingTwits = twitModel.getTwits();

  function displayAllTwit(twits = getExistingTwits) {
    const allUsers = userModel.getUsers();

    const twitWrapper = document.querySelector('#twitWrapper');
    twitWrapper.innerHTML = '';

    twits.sort((a, b) => b.id - a.id);

    twits.forEach((item, i) => {
      const ownerTwit = allUsers.find(
        (user) => user.username === item.twitOwner
      );

      const twitItem = document.createElement('div');
      twitItem.className = 'border-b-2 p-4 border-line';
      twitItem.id = `twit-${item.id}`;
      twitItem.innerHTML = `
        <div class="flex gap-4">
          <img
            src="${ownerTwit.avatar}"
            class="h-10 w-10 rounded-full"
            alt="profile-user"
          />
          <div class="w-full">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <p class="text-white font-semibold">${ownerTwit.fullname}</p>
                <p class="text-gray-500 text-sm">
                  @${ownerTwit.username} * ${item.twitCreatedAt}
                </p>
              </div>
              <div
                class="flex items-center justify-center gap-2 border-line border-2 rounded-full px-3 py-1.5 cursor-pointer"
              >
                <p class="font-semibold">${item.twitEmoticon}</p>
              </div>
            </div>
            <p class="mt-4 text-sm">${item.twitText}</p>
          </div>
        </div>
        <div class="flex flex-row gap-8 items-center mt-4 pl-14">
          <a href="#" class="flex flex-row gap-2 items-center">
            <img src="assets/heart.svg" />
            <p class="text-sm text-pink-500">128 Likes</p>
          </a>
          <a href="#" class="flex flex-row gap-2 items-center">
            <img src="assets/trash.svg" />
            <p class="text-sm text-gray-500">Delete</p>
          </a>
          <a href="#" class="flex flex-row gap-2 items-center">
            <img src="assets/warning-2.svg" />
            <p class="text-sm text-gray-500">Report</p>
          </a>
        </div>
      `;

      twitWrapper.appendChild(twitItem);
    });
  }

  displayAllTwit();
});
