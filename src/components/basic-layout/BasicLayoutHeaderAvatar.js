import PropTypes from 'prop-types';
import { Dropdown, Avatar } from 'antd';

BasicLayoutHeaderAvatar.propTypes = {
  vip: PropTypes.bool.isRequired,
  designer: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    avatar_url: PropTypes.string,
    nickname: PropTypes.string
  }),
  clickMenu: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export const userOverlayMenu = (props) => (
  <div className="user-overlay-container" data-testid="user-overlay-container">
    <div className="user-content">
      <span data-testid="user-nickname" className={`user-name ${props.vip ? 'vip' : ''}`}>
        {props.userInfo?.nickname}</span>
    </div>
    <div className="menu-content">
      <div className="menu-item workbench" onClick={() => props.clickMenu('workbench')}>学习中心</div>
      <div className="menu-item setting" onClick={() => props.clickMenu('setting')}>个人中心</div>
      { props.designer ? <div data-testid="menu-item-work" className="menu-item work" onClick={() => props.clickMenu('work')}>赏金领地</div> : null}
      <div className="menu-item logout" onClick={() => props.logout()}>退出登录</div>
    </div>
  </div>
);

export const getElementById = (id) => {
  return () => document.getElementById(id);
}

function BasicLayoutHeaderAvatar(props) {
  return (
    <div className="user-container" 
      id="header-userinfo-container">
      <Dropdown
        overlay={userOverlayMenu(props)} 
        arrow 
        placement="bottomRight" 
        getPopupContainer={getElementById('header-userinfo-container')}>
        <Avatar data-testid="user-avatar" className="user-avatar" src={props.userInfo?.avatar_url} />
      </Dropdown>
    </div>
  );
}

export default BasicLayoutHeaderAvatar;