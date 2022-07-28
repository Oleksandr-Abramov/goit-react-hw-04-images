import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '25611286-d3301de9845eb7113c68c548e';
const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const service = (page, query) => {
  return axios.get(`?key=${API_KEY}&${params}&q=${query}&page=${page}`);
};
