import axios from "axios";
import { API_URL } from "../../constants/config";

const fetchUtil = {
  post: async (url, payload) => {
    return await axios.post(`${API_URL}/${url}`, payload);
  },
  get: async (url, payload = {}) => {
    return await axios.get(`${API_URL}/${url}`, payload);
  },
  delete: async (url, payload = {}) => {
    return await axios.delete(`${API_URL}/${url}`, payload);
  },
  put: async (url, payload) => {
    return await axios.put(`${API_URL}/${url}`, payload);
  },
};
export default fetchUtil;
