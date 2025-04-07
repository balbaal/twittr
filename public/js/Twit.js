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
    console.log(twitData);

    const { twitText, twitEmoticon } = twitData;
    if (twitText.trim() === '' || twitEmoticon.trim() === '') {
      return {
        success: false,
        error: "All field can't be empty",
      };
    }

    const twitList = this.getTwits();
    twitList.push(twitData);

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
