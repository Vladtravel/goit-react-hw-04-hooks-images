import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

const serviceApi = {
  getImages({ query, page, perPage }) {
    return axios
      .get(
        `/?q=${query}&key=21869034-2ecf67829261e86afc712c967&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then((r) => r.data.hits);
  },
};
export default serviceApi;
