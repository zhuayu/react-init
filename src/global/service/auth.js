import request from "./../request/axios.js";
import API from "./../request/api.js";

const AuthService = {
  wechatAuth: code => {
    return request.get(
      API.wechatAuth,
      { code },
      {
        withCredentials: true
      }
    );
  }
};

export default AuthService;
