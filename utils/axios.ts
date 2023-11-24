import axios from "axios";

const MedicksApi = axios.create({
  baseURL: "/api",
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
