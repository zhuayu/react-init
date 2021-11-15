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

  const handleMenuItemClick = (slug) => {
    typeof props.clickMenu === 'function' && props.clickMenu(slug);
  }

  const handleLogout = (slug) => {
    typeof props.logout === 'function' && props.logout();
  }

  const userOverlay = (
    <div className="user-overlay-container">
      <div className="user-content">
        <span className={`user-name ${props.vip ? 'vip' : ''}`}>
          {props.userInfo.nickname}</span>
      </div>
      <div className="menu-content">
        <div className="menu-item workbench" onClick={() => handleMenuItemClick('workbench')}>学习中心</div>
        <div className="menu-item setting" onClick={() => handleMenuItemClick('setting')}>个人中心</div>
        { props.designer ? <div className="menu-item work" onClick={() => handleMenuItemClick('work')}>赏金领地</div> : null}
        <div className="menu-item logout" onClick={() => handleLogout()}>退出登录</div>
      </div>
    </div>
  );

  return (
    <div className="user-container" id="header-userinfo-container">
      <Dropdown overlay={userOverlay} 
        arrow 
        placement="bottomRight" 
        getPopupContainer={() => document.getElementById('header-userinfo-container')}>
        <Avatar className="user-avatar" src={props.userInfo.avatar_url} />
      </Dropdown>
    </div>
  );
}

export default BasicLayoutHeaderAvatar;