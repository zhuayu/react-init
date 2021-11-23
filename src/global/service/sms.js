import request from "./../request/axios.js";
import API from "./../request/api.js";

const smsService = {
  smsRegisterCode: ({ phone }) => {
    return request.post(API.smsRegisterCode, { phone });
  },
  smsBindPhone: ({ key, code, phone }) => {
    return request.post(API.bindPhone, {
      key,
      code,
      phone
    });
  }
};

export default smsService;
