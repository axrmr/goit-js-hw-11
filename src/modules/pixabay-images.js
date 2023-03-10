import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const authToken = '33871117-8e8648cedbb6778ee9e40efa1';

export default class PixabayImg {
  constructor({ searchParams, onLoading, onLoaded, onResponseOk }) {
    this.searchParams = searchParams;
    this.page = 1;
    this.searchQuery = null;
    this.onLoading = onLoading;
    this.onLoaded = onLoaded;
    this.onResponseOk = onResponseOk;
    this.isLoading = false;
  }

  async fetch() {
    if (this.isLoading) return;

    this.isLoading = true;

    this.onLoading();

    const { data } = await axios.get(
      `${baseUrl}?key=${authToken}&${this.searchParams}&q=${this.searchQuery}&page=${this.page}`
    );

    if (!data.hits.length) {
      this.onLoaded();

      throw new Error('404');
    }

    this.onResponseOk(data);

    this.#onPageLimit(data.totalHits);

    this.isLoading = false;

    this.onLoaded();

    this.incrementPage();

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  #calcTotalPageNum(totalImgNum) {
    return Math.ceil(totalImgNum / parseInt(this.searchParams.get('per_page')));
  }

  #onPageLimit(totalImgNum) {
    const limit = this.#calcTotalPageNum(totalImgNum);

    if (this.page === limit) {
      this.isLoading = true;

      this.onLoaded();

      throw new Error('reached limit');
    }
  }
}
