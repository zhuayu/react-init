import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Modal } from 'antd';
import "./style/BasicModalLoginAndRegister.less";

BasicModalLoginAndRegister.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
};

function BasicModalLoginAndRegister(props) {

  useEffect(() => {
    props.visible && new window.WxLogin({
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
  });

  return (
    <Modal visible={props.visible} 
      width={416}
      centered={true}
      closable={false}
      footer={null}>
      <div className="lar-container">
        { props.onCancel && <i className="lar-cancel" onClick={() => props.onCancel(false)}></i>}
        <div className="lar-logo-container">
          <div className="lar-logo-element"></div>
        </div>
        <p className="lar-title">请用微信扫码登录 / 注册</p>
        <div className="lar-qrcode-container" id="qrcode"></div>
      </div>
    </Modal>
  );
}

export default BasicModalLoginAndRegister;