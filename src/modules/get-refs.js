export default function getRefs() {
  return {
    searchForm: document.getElementById('search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    searchQueryInp: document.querySelector('.search-form__input'),
  };
}
