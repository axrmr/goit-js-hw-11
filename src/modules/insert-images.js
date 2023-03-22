export default function insertImages(elRef, hits, cb) {
  const cardMarkup = hits.map(cb).join('');
  elRef.insertAdjacentHTML('beforeend', cardMarkup);
}
