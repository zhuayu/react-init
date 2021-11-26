const AuthService = {
  wxlogin: visible => {
    visible && new window.WxLogin({
      id: "qrcode",
      appid: `${process.env.REACT_APP_WECHAT_APPID}`,
      height: "200px",
      scope: "snsapi_login",
      redirect_uri:
        `${process.env.REACT_APP_HOST}/api/web/oauth/social/wechat/callback?redirect_uri=` +
        window.location.href,
      state: "www",
      href:
        "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIyMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMjBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30g"
    });
  }
};

export default AuthService;
