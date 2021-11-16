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

function BasicLayoutHeaderAvatar(props) {

  const userOverlay = (
    <div className="user-overlay-container" data-testid="user-overlay-container">
      <div className="user-content">
        <span className={`user-name ${props.vip ? 'vip' : ''}`}>
          {props.userInfo?.nickname}</span>
      </div>
      <div className="menu-content">
        <div className="menu-item workbench" onClick={() => props.clickMenu('workbench')}>学习中心</div>
        <div className="menu-item setting" onClick={() => props.clickMenu('setting')}>个人中心</div>
        { props.designer ? <div className="menu-item work" onClick={() => props.clickMenu('work')}>赏金领地</div> : null}
        <div className="menu-item logout" onClick={() => props.logout()}>退出登录</div>
      </div>
    </div>
  );

  return (
    <div className="user-container" id="header-userinfo-container" data-testid="header-userinfo-container">
      <Dropdown
        overlay={userOverlay} 
        arrow 
        placement="bottomRight" 
        getPopupContainer={() => document.getElementById('header-userinfo-container')}>
        <Avatar data-testid="user-avatar" className="user-avatar" src={props.userInfo?.avatar_url} />
      </Dropdown>
    </div>
  );
}

export default BasicLayoutHeaderAvatar;