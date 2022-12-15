import './css/styles.css';
import debounce from 'lodash.debounce';
import getRefs from './refs';
import Notiflix from 'notiflix';
import axios from 'axios';
import API from './fetch';

import card from './cardTemplate';

const DEBOUNCE_DELAY = 300;
let PAGE = 1;
const per_page = 40;
let userRequest = '';

const refs = getRefs();
// console.log(refs);

refs.moreButton.classList.add('hide');

refs.form.addEventListener('submit', onSubmitForm);

refs.moreButton.addEventListener('click', onMoreClick);

function onSubmitForm(event) {
  event.preventDefault();

  refs.gallery.innerHTML = '';
  refs.moreButton.classList.add('hide');
  const q = refs.input.value.trim();
  refs.input.value = q;

  console.log(q);
  if (q === '') {
    Notiflix.Notify.failure(`What we are looking for?`);
    refs.form.reset();
    return;
  }

  API.fetchImages(q, PAGE, per_page).then(response => {
    if (response.data.hits.length === 0) {
      refs.moreButton.classList.add('hide');
      return Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }

    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    refs.moreButton.classList.remove('hide');

    if (PAGE * per_page >= response.data.totalHits) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      refs.moreButton.classList.add('hide');
    }

    // PAGE += 1;
    return render(response);
  });
}

function onInput() {
  const text = refs.input.value;
  console.log(text);
}

function render(response) {
  const markup = response.data.hits.map(img => card.getTemplate(img));
  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
}

function onMoreClick() {
  PAGE += 1;

  const q = refs.input.value || 'cat';

  API.fetchImages(q, PAGE, per_page).then(response => {
    if (response.data.hits.length === 0) {
      refs.moreButton.classList.add('hide');
      return Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }

    Notiflix.Notify.info(`Load ${PAGE * per_page} images.`);

    if (PAGE * per_page >= response.data.totalHits) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      refs.moreButton.classList.add('hide');
    }

    return render(response);
  });
}
