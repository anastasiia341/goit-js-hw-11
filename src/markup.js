import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery')


export function renderGallery(data) {
  const pictures = data.hits;
  const markup = pictures.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}" class="gallery-link">
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                    </div>
                </div>
            </a>`;
      }
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);


  new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
    });
}