const PREFIX = `${process.env.REACT_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/api/web`;

const API = {
  devLogin: `${WEB_PREFIX}/users/dev-login`,
  users: `${WEB_PREFIX}/users`,
  logout: `${WEB_PREFIX}/logout`,
  userInfo: `${WEB_PREFIX}/users/user-info`,
  wechatAuth: `${WEB_PREFIX}/wechat/auth`,
  smsRegisterCode: `${WEB_PREFIX}/sms/register-code`,
  bindPhone: `${WEB_PREFIX}/sms/bind-phone`,
};

export default API;
