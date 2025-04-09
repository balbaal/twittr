class Twit {
  constructor() {
    this._twits = null;

    this.TWITS_KEY = 'twits';
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
}
