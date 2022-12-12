import './css/styles.css';
import debounce from 'lodash.debounce';
import getRefs from './refs';
import Notiflix from 'notiflix';
import axios from 'axios';
import API from './fetch';

import card from './cardTemplate';

const DEBOUNCE_DELAY = 300;
let PAGE = 1;

const refs = getRefs();
// console.log(refs);

refs.moreButton.classList.toggle('hide');

refs.form.addEventListener('submit', onSubmitForm);

refs.moreButton.addEventListener('click', onMoreClick);

function onSubmitForm(event) {
  event.preventDefault();

  const q = refs.input.value || 'cat';

  API.fetchImages(q, PAGE).then(response => {
    if (response.data.hits.length === 0) {
      return Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
    console.log(`response.data`, response.data.totalHits);
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    refs.moreButton.classList.toggle('hide');
    PAGE += 1;
    return render(response);
  });
}

function onInput() {
  const text = refs.input.value;
  console.log(text);
}

function render(response) {
  // refs.gallery.innerHTML = '';
  const markup = response.data.hits.map(img => card.getTemplate(img));
  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
  console.log(response.data.hits);
}

function onMoreClick() {
  const q = refs.input.value || 'cat';
  API.fetchImages(q, PAGE).then(response => {
    if (response.data.hits.length === 0) {
      return Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
    console.log(`response.data`, response.data.totalHits);
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    // refs.moreButton.classList.toggle('hide');
    PAGE += 1;
    return render(response);
  });
}

// axios.get(URL).then(r => console.log(r));
// API.fetchImages().then(console.log);
