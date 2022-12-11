import './css/styles.css';
import debounce from 'lodash.debounce';
import getRefs from './refs';
import Notiflix from 'notiflix';
import axios from 'axios';
import API from './fetch';

import card from './cardTemplate';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();
// console.log(refs);

refs.form.addEventListener('submit', onSubmitForm);
// refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onSubmitForm(event) {
  event.preventDefault();

  const q = refs.input.value || 'css';
  API.fetchImages(q).then(response => render(response));

  Notiflix.Notify.info(`submit has happened`);
}

function onInput() {
  const text = refs.input.value;
  console.log(text);
}

function render(response) {
  refs.gallery.innerHTML = '';
  const markup = response.data.hits.map(img => card.getTemplate(img));
  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
  console.log(response.data.hits);
}

// axios.get(URL).then(r => console.log(r));
// API.fetchImages().then(console.log);
