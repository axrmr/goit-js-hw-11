import clearInnerContent from './modules/clear-inner-content';
import createImageMarkup from './modules/create-card-mark';
import getRefs from './modules/get-refs';
import throttle from './modules/throttle';
import checkPosition from './modules/check-position';
import notify from './modules/notify';
import PixabayImages from './modules/pixabay-images';

const ref = getRefs();
const pixaImages = new PixabayImages({
  searchParams: new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  }),
  onLoading: function () {
    ref.loader.classList.add('visible');
  },
  onLoaded: function () {
    ref.loader.classList.remove('visible');
  },
  onResponseOk: function (data) {
    if (this.page === 1) notify.totalFound(data.totalHits);

    insertImages(data.hits);
  },
});

window.addEventListener('scroll', throttle(onWindowScroll, 250));
ref.searchForm.addEventListener('submit', onSearchFormSubmit);

function onWindowScroll() {
  checkPosition(() => {
    fetchImages();
  });
}

function onSearchFormSubmit(e) {
  e.preventDefault();

  const trimmedSearchQuery = this.searchQuery.value.trim();

  if (!trimmedSearchQuery) return;

  clearInnerContent(ref.galleryContainer);

  pixaImages.resetPage();
  pixaImages.isLoading = false;
  pixaImages.searchQuery = trimmedSearchQuery;

  fetchImages();

  this.reset();
}

function fetchImages() {
  pixaImages.fetch().catch(handleExeptions);
}

function insertImages(hits) {
  const cardMarkup = hits.map(createImageMarkup).join('');
  ref.galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);
}

function handleExeptions(error) {
  if (error.message === '404') {
    notify.notFound();
  } else if (error.message === 'reached limit') {
    notify.reachedLimit();
  } else {
    notify.error(error.message);
  }
}
