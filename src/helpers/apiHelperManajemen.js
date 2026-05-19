export const BASE_URL = "http://localhost:3005";

const apiHelper = {
  fetchData: async (url, options = {}) => {
    return fetch(url, options);
  }
};

export default apiHelper;