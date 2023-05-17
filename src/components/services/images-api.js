const key = '34756753-b2a76777b50bc049ab8c28d3e';
const BASE_URL = 'https://pixabay.com/api/?';
const per_page = 12;

function fetchImages({ searchQuery, page }) {
  return fetch(
    `${BASE_URL}q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('ERROR request'));
  });
}
export default fetchImages;
