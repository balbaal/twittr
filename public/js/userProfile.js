document.addEventListener('DOMContentLoaded', () => {
  const profilePhoto = document.querySelector('#profile-photo');
  const profileFullnameTop = document.querySelector('#profile-fullname-top');
  const profileFullname = document.querySelector('#profile-fullname');
  const profileUsername = document.querySelector('#profile-username');

  const userModel = new User();
  const twitModel = new Twit();

  const usernameLoggedIn = localStorage.getItem(userModel.USERNAME_LOGGED_KEY);
  const usernameProfileVisit = localStorage.getItem(
    userModel.USERNAME_PROFILE_VISIT
  );

  const usernameProfileVisitData = userModel
    .getUsers()
    .find((user) => user.username === usernameProfileVisit);

  profilePhoto.src = usernameProfileVisitData.avatar;
  profileFullnameTop.textContent = usernameProfileVisitData.fullname;
  profileFullname.textContent = usernameProfileVisitData.fullname;
  profileUsername.textContent = usernameProfileVisitData.username;

  // Get Total Like
  function getTotalLike(twit) {
    const existingLikes = twitModel.getLikeTwits();
    const totalLike = existingLikes.filter(
      (like) => like.twitId === twit.id
    ).length;

    return totalLike;
  }

  // Get All Twit
  function displayAllTwit(twits = []) {
    const twitWrapper = document.querySelector('#twit-wrapper');
    twitWrapper.innerHTML = '';

    twits.sort((a, b) => b.id - a.id);

    twits.forEach((item, i) => {
      const totalLike = getTotalLike(item);
      const hasLiked = twitModel.hasUserLikeTwit({
        twitId: item.id,
        username: usernameLoggedIn,
      });

      const allUsers = userModel.getUsers();
      const ownerTwit = allUsers.find(
        (user) => user.username === item.ownerTwit
      );

      const isShowDeleteButton = item.ownerTwit === usernameLoggedIn;

      const twitItem = document.createElement('div');
      twitItem.className = 'border-b-2 p-4 border-line';
      twitItem.id = `twit-${item.id}`;
      twitItem.innerHTML = `
        <div class="flex gap-4">
          <img
            src="${ownerTwit.avatar}"
            class="h-10 w-10 rounded-full object-cover"
            alt="profile-user"
          />
          <div class="w-full">
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <p id="profile-${
                  item.id
                }" class="text-white font-semibold cursor-pointer">${
        ownerTwit.fullname
      }</p>
                <p class="text-gray-500 text-sm">
                  @${ownerTwit.username} * ${item.createdAt}
                </p>
              </div>
              <div
                class="flex items-center justify-center gap-2 border-line border-2 rounded-full px-3 py-1.5 cursor-pointer"
              >
                <p class="font-semibold">${item.emoticon}</p>
              </div>
            </div>
            <p class="mt-4 text-sm">${item.text}</p>
          </div>
        </div>
        <div class="flex flex-row gap-8 items-center mt-4 pl-14">
          <a id="love-twit-${
            item.id
          }" href="#" class="flex flex-row gap-2 items-center">
            <img class="love-icon" src="${
              hasLiked ? 'assets/heart-fill.svg' : 'assets/heart.svg'
            }" />
            <p id="total-like" class="text-sm text-pink-500">${totalLike} Likes</p>
          </a>
          ${
            isShowDeleteButton
              ? `<a
                id='delete-twit-${item.id}'
                href='#'
                class='flex flex-row gap-2 items-center'
              >
                <img src='assets/trash.svg' />
                <p class='text-sm text-gray-500'>Delete</p>
              </a>`
              : `<a href='#' class='flex flex-row gap-2 items-center'>
                <img src='assets/warning-2.svg' />
                <p class='text-sm text-gray-500'>Report</p>
              </a>`
          }
        </div>
      `;

      twitWrapper.appendChild(twitItem);

      // event trigger for Like button
      const twitButton = document.querySelector(`#love-twit-${item.id}`);

      twitButton.addEventListener('click', (event) => {
        const twitLikeData = {
          twitId: item.id,
          username: usernameLoggedIn,
        };

        // Store like data to local storage
        const result = twitModel.saveLikeTwit(twitLikeData);

        // Condition response
        if (result.success) {
          instantMessage.style.display = 'none';

          const twitLikeCount = twitItem.querySelector('#total-like');
          twitLikeCount.textContent = `${totalLike + 1} Likes`;

          const loveIcon = twitItem.querySelector('.love-icon');
          loveIcon.src = 'assets/heart-fill.svg';
        } else {
          instantMessage.style.display = 'flex';
          instantMessage.textContent = result.error;

          setTimeout(() => {
            instantMessage.style.display = 'none';
          }, 5000);
        }
      });

      // event trigger for Delete butotn
      const deleteButton = document.querySelector(`#delete-twit-${item.id}`);

      if (!!deleteButton) {
        deleteButton.addEventListener('click', (event) => {
          event.preventDefault();

          // Delete twit and update local storage
          const result = twitModel.deleteTwit(item.id);

          // Response condition
          if (result.success) {
            instantMessage.style.display = 'none';
            displayAllTwit(
              twitModel
                .getTwits()
                .filter((twit) => twit.ownerTwit === usernameProfileVisit)
            );
          } else {
            instantMessage.style.display = 'flex';
            instantMessage.textContent = result.error;
          }
        });
      }

      // event visit Profile
      const twitFullname = document.querySelector(`#profile-${item.id}`);
      twitFullname.addEventListener('click', (event) => {
        event.preventDefault();

        localStorage.setItem(userModel.USERNAME_PROFILE_VISIT, item.ownerTwit);
        window.location.href = 'profile.html';
      });
    });
  }

  const twits = twitModel
    .getTwits()
    .filter((twit) => twit.ownerTwit === usernameProfileVisit);
  displayAllTwit(twits);
});
