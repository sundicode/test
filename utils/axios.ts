import axios from "axios";

const MedicksApi = axios.create({
  baseURL: "http://52.22.51.50",
  withCredentials: true,
});

MedicksApi.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default MedicksApi;
