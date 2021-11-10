import request from "./../request/axios.js";
import API from "./../request/api.js";

const userService = {
  getUserInfo() {
    return request.get(API.userInfo);
  },
  updateUserInfo(params) {
    return request.put(API.userInfo, params);
  },
};

export default userService;
