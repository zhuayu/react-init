import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Modal } from 'antd';
import "./style/WechatScanLoginModal.less";
import authService from "@src/global/service/auth";

WechatScanLoginModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
};

function WechatScanLoginModal(props) {
  useEffect(() => {
    authService.wxlogin(props.visible);
  });

  return (
    <Modal visible={props.visible} 
      width={416}
      centered={true}
      closable={false}
      footer={null}>
      <div className="wechat-scan-modal">
        { props.onCancel && <i className="wechat-scan-close" onClick={() => props.onCancel(false)}></i>}
        <div className="wechat-scan-logo-container">
          <div className="wechat-scan-logo-element"></div>
        </div>
        <p className="wechat-scan-title">请用微信扫码登录 / 注册</p>
        <div className="wechat-scan-qrcode-container" id="qrcode"></div>
      </div>
    </Modal>
  );
}

export default WechatScanLoginModal;