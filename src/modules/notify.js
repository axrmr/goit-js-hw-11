import { Notify } from 'notiflix';

const NO_MATCHINGS =
  'Sorry, there are no images matching your search query. Please try again.';
const LIMIT_REACHED_MSG =
  "We're sorry, but you've reached the end of search results.";

function totalFound(num) {
  if (num === 1) {
    Notify.success(`Hooray! We found ${num} image.`);
  } else {
    Notify.success(`Hooray! We found ${num} images.`);
  }
}

function notFound() {
  Notify.info(NO_MATCHINGS);
}

function reachedLimit() {
  Notify.info(LIMIT_REACHED_MSG);
}

function error(text) {
  Notify.failure(text);
}

export default { reachedLimit, error, totalFound, notFound };
