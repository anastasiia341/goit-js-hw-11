import PicturesApiService from "./api";
import Notify from 'notiflix';
import { renderGallery } from './markup';





const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}



const picturesApiService = new PicturesApiService();
refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearchForm(e) {
    try {
        e.preventDefault();
        cleanGallery();
        const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

        if (!searchQuery) {
            Notify.Notify.warning('Please type something to search.');
            isHiddenLoadMoreBtn();
        return
        }

        picturesApiService.query = searchQuery;
        picturesApiService.page = 1;
        picturesApiService.hits = 0;
        e.currentTarget.reset();
        const data = await picturesApiService.fetchPictures();
        if (data.hits.length === 0) {
            Notify.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
             isHiddenLoadMoreBtn();
        return
        };

        renderGallery(data);
        visibleLoadMoreBtn();
        refs.loadMoreBtn.disabled = false;
        Notify.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } catch (error) {
        console.log('~ error', error);
       }
    }
   
function cleanGallery() {
    refs.galleryContainer.innerHTML = '';
}


function visibleLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.loadMoreBtn.classList.add('visible');
}

function isHiddenLoadMoreBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.loadMoreBtn.classList.remove('visible');
}

async function onLoadMore() {
    try {
        const data = await picturesApiService.fetchPictures();
        if (data.hits.length === 0) {
            Notify.Notify.info("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.disabled = true;
            return;
        }

        if (picturesApiService.hits > picturesApiService.totalHits) {
            Notify.Notify.info("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.disabled = true;
            return;
        }

        renderGallery(data);
        pageScrolling();

        picturesApiService.hits += 40;
    } catch (error) {
        console.log('~ error', error);
    }

}


function pageScrolling() {
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}


const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    this.el.classList.remove('btn-up-hide');
  },
  hide() {
    this.el.classList.add('btn-up-hide');
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector('.btn-up').onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();