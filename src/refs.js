export default function () {
  return {
    gallery: document.querySelector('.gallery'),
    input: document.querySelector('input[name="searchQuery"]'),
    form: document.querySelector('.search-form'),
    button: document.querySelector('[type="submit"]'),
    moreButton: document.querySelector('.load-more'),
  };
}
