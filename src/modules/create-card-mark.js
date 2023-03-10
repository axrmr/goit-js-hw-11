export default function createGalleryCardMarkup(imagesSrcObj) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = imagesSrcObj;

  return `
  <a class="photo-card-link" href="${largeImageURL}" >
    <div class="photo-card">
    <img class="photo-card-img" src="${webformatURL}" alt=${tags} loading="lazy" width="400" height="200"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>

      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
      </div>
    </div>
  </a>`;
}
