import axios from "axios";

const instance = axios.create({
  baseURL: "https://zeldvorik.ru/apiv3/api.php",
});

export const api = {
  async getTrending() {
    const { data } = await instance.get("?action=trending");
    return data;
  },

  async getCategory(category: string) {
    const { data } = await instance.get(`?action=category&cat=${category}`);
    return data;
  },

  async search(query: string) {
    const { data } = await instance.get(`?action=search&q=${query}`);
    return data;
  },

  async getDetail(path: string) {
    const { data } = await instance.get(`?action=detail&path=${path}`);
    return data;
  },
};
