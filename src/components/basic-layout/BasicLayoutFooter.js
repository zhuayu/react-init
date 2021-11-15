import wechatIcon from "@/assets/images/layout/footer/wechat-logo.svg";
import wechatOfficalQrcode from "@/assets/images/layout/footer/wechat-offical-qrcode.svg";

function BasicLayoutFooter() {
  return (
    <footer className="page-footer">
      <div className="container container-1200">
        <div className="content-left">
          <span>Copyright © 2020 home-plan.cn All Rights Reserved</span>
          <a data-testid="icp" className="beian-text" target="_blank" rel="noreferrer" href="https://beian.miit.gov.cn/"
            >沪ICP备2020026846号</a
          >
          <span data-testid="gongan">沪公网安备31010102006648号</span>
        </div>
        <div className="content-right">
          <span>联系邮箱：kf@home-plan.cn</span>
          <div className="qrcode-container">
            <img src={wechatIcon} alt="wechat-icon" className="wechat-icon" />
            <img src={wechatOfficalQrcode} alt="wechat-qrcode" className="wechat-qrcode" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default BasicLayoutFooter;