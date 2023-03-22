import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import checkPosition from './modules/check-position';
import clearInnerContent from './modules/clear-inner-content';
import createGalleryCardMarkup from './modules/create-card-mark';
import getRefs from './modules/get-refs';
import handleExceptions from './modules/handleExceptions';
import insertImages from './modules/insert-images';
import notify from './modules/notify';
import PixabayImages from './modules/pixabay-images';
import throttle from './modules/throttle';

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

    insertImages(ref.galleryContainer, data.hits, createGalleryCardMarkup);
    let gallery = new SimpleLightbox('.gallery a');
    gallery.refresh();
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
  pixaImages.fetch().catch(handleExceptions);
}
