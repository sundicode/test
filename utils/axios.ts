import axios from "axios";

const MedicksApi = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 3000,
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
