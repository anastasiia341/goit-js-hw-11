import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39155276-6bb78cfc3029a8ff9cc1c0e7d';




export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
    this.totalHits = 0;
    this.per_page = 40;
  }


  async fetchPictures() {
    try {
   const options = {
    params: {
    key: API_KEY,
    q: this.searchQuery, 
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: this.page,
    per_page: this.per_page,
  },
      };
      
      const url = `${BASE_URL}`;
      const response = await axios.get(url, options);
      const data = await response.data;

      this.page += 1;
      this.totalHits = response.data.totalHits;
      return data;
    } catch (error) {
      console.log('~ error',error);
}
}

  get query() {
    return this.searchQuery;
  }


  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}











// export async function fetcPictures() {
//      try {
//     const response = await axios.get(BASE_URL, options
//     );
//          return response;
//   } catch (error) {
//     console.log(error);
//   }
// };


