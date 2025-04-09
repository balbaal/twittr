class Twit {
  constructor() {
    this._twits = null;
    this._likeTwits = null;

    this.TWITS_KEY = 'twits';
    this.LIKE_TWITS_KEY = 'likeTwits';
  }

  getTwits() {
    if (this._twits === null) {
      try {
        const storedTwits = localStorage.getItem(this.TWITS_KEY);
        this._twits = storedTwits ? JSON.parse(storedTwits) : [];
      } catch (error) {
        return (this._twits = []);
      }
    }

    return this._twits;
  }

  getLikeTwits() {
    if (this._likeTwits === null) {
      try {
        const storedLikeTwits = localStorage.getItem(this.LIKE_TWITS_KEY);
        this._likeTwits = storedLikeTwits ? JSON.parse(storedLikeTwits) : [];
      } catch (error) {
        return (this._likeTwits = []);
      }
    }

    return this._likeTwits;
  }

  deleteTwit(twitId) {
    const allTwits = this.getTwits();
    const indexTwit = allTwits.findIndex((twit) => twit.id === twitId);

    if (indexTwit !== -1) {
      allTwits.splice(indexTwit, 1);

      console.log(allTwits);

      try {
        localStorage.setItem(this.TWITS_KEY, JSON.stringify(allTwits));
        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: 'Failed to delete twit',
        };
      }
    } else {
      return {
        success: false,
        error: "Twit can't be find",
      };
    }
  }

  saveTwit(twitData) {
    const { text, emoticon } = twitData;
    if (text.trim() === '' || emoticon.trim() === '') {
      return {
        success: false,
        error: "All field can't be empty",
      };
    }

    const newTwit = {
      id: Date.now(),
      isActive: true,
      ...twitData,
    };

    const twitList = this.getTwits();
    twitList.push(newTwit);

    try {
      localStorage.setItem(this.TWITS_KEY, JSON.stringify(twitList));

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to submit twit!',
      };
    }
  }

  hasUserLikeTwit(twitData) {
    const existingLikes = this.getLikeTwits();

    return existingLikes.some(
      (item) =>
        item.twitId === twitData.twitId && item.username === twitData.username
    );
  }

  saveLikeTwit(twitData) {
    // validation user has already like ?
    const hasUserLike = this.hasUserLikeTwit(twitData);
    if (hasUserLike) {
      return {
        success: false,
        error: 'You already like this twit',
      };
    }

    const newLike = {
      id: Date.now(),
      ...twitData,
    };

    // get all existing like twit
    // then store new like
    const existingLikes = this.getLikeTwits();
    existingLikes.push(newLike);

    localStorage.setItem(this.LIKE_TWITS_KEY, JSON.stringify(existingLikes));

    return {
      success: true,
    };
  }
}
