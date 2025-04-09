class Twit {
  constructor() {
    this._twits = null;
    this.TWITS_KEY = 'twits';
  }

  getTwits() {
    if (this._twits === null) {
      try {
        const existingTwits = localStorage.getItem(this.TWITS_KEY);
        this._twits = existingTwits ? JSON.parse(existingTwits) : [];
      } catch (error) {
        this._twits = [];
      }
    }

    return this._twits;
  }

  saveTwit(twitData) {
    const { text, emoticon } = twitData;

    // Handle validation
    if (text.trim() === '' || emoticon.trim() === '') {
      return {
        success: false,
        error: "All field can't be empty",
      };
    }

    // Prepare new twit
    // & Append that to existing twits
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
        error: 'Failed to submit new twit!',
      };
    }
  }
}
