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
    <img class="photo-card-img" src="${webformatURL}" alt=${tags} loading="lazy" width="400" height="200"/>
    <div class="info">
      <span class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </span>
      <span class="info-item">
        <b>Views</b>
        <span>${views}</span>
      </span class=>
      <span class="info-item">
        <b>Comments</b>
        <span>${comments}</span>

      </span>
      <span class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </span>
      </div>
  </a>`;
}
