import axios from "axios";

// axios.defaults.baseURL = "http://52.79.44.212:8000";
axios.defaults.baseURL = "http://localhost:8000";
const api = axios.create({
  // baseURL: "http://52.79.44.212:8000",
  baseURL: "http://localhost:8000",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use(
  function (config) {
    const getKey = localStorage.getItem("persist:root");
    const token = getKey ? JSON.parse(JSON.parse(getKey)?.user)?.token : "";
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (err) {
    return err;
  }
);

api.interceptors.response.use(
  function (config) {
    return config;
  },
  function (err) {
    if (err.response.status === 410) {
      alert("로그인이 만료되었습니다");
      window.location.assign("/");
      throw err.response.data.message;
    } else {
      return err;
    }
  }
);
export default api;
