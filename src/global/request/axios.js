import axios from "axios";
import cookies from "js-cookie";

const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 20000;

axiosInstance.interceptors.request.use(
  config => {
    const newConfig = {
      ...config,
      params: {
        ...config.params,
        app_id: 1
      },
      data: {
        ...config.data,
        t: Date.now()
      }
    };
    const TOKEN = cookies.get("web_token");
    if (TOKEN) {
      newConfig["headers"]["Authorization"] = "Bearer " + TOKEN;
    }
    return newConfig;
  },
  error => Promise.reject(error)
);

const handleErrorRequest = error => {
  const { response } = error;
  const status = response ? response.status : 408;
  if (response) {
    const { data } = response;
    const message = data.msg || "服务器发送错误，请稍后再试";
    if (status === 401) {

    } else if (status === 402) {

    } else if (status === 403) {

    } else {
      console.log(message);
    }
  } else {
  }
};

const successRes = res => {
  switch (true) {
    case res.data.error_code === 0:
      return res.data.data;
    case res.data.error_code === 404:
      return Promise.reject(res.data);
    default:
      return Promise.reject(res.data);
  }
};

const errorRes = error => {
  handleErrorRequest(error);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(successRes, errorRes);

const AXIOSINSTANCE = {
  post(url = "", data = {}, config = {}) {
    return axiosInstance.post(url, data, config);
  },
  put(url = "", data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },
  get(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.get(url, OPTIONS);
  },
  delete(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.delete(url, OPTIONS);
  }
};

export default AXIOSINSTANCE;
