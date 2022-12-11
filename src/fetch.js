import axios from 'axios';

async function fetchImages(q = 'css') {
  // prettier-ignore

  const BASIC_URL = `https://pixabay.com/api/`;
  const key = '31997042-894b50945f52065251b1ba68b';
  const image_type = 'photo';
  const orientation = 'horizontal';
  const safesearch = 'true';
  const URL = `${BASIC_URL}?key=${key}&q=${q}&image_type=${image_type}&orientation${orientation}&safesearch=${safesearch}`;

  const response = await axios.get(URL);
  return response;
}

export default { fetchImages };
