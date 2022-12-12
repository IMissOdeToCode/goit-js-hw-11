function getTemplate(IMG) {
  return `<div class="photo-card">
            <img class="picture"
              src="${IMG.webformatURL}"
              alt="${IMG.tags}"
              loading="lazy"
            />
            <div class="info">
              <p class="info-item">
                <b>Likes ${IMG.likes}</b>
              </p>
              <p class="info-item">
                <b>Views ${IMG.views}</b>
              </p>
              <p class="info-item">
                <b>Comments ${IMG.comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads ${IMG.downloads}</b>
              </p>
            </div>
          </div>`;
}

export default { getTemplate };
