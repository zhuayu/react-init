import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { user, isVip, isLogin, isDesigner, delUserInfo } from "@store/user.slice";
import { setLoginModalVisable } from "@store/modal.slice";
import BasicLayoutHeaderNav from "./BasicLayoutHeaderNav";
import BasicLayoutHeaderAvatar from "./BasicLayoutHeaderAvatar";
import EffectModal from "@components/effect-modal";
import HOMEPLAN_LOGO from "@assets/images/layout/header/homeplan-logo.svg";
import cookies from "js-cookie";

const NAV_PATHNAME_MAP = {
  'home'         : '/',
  'academy'      : '/academy', 
  'bible'        : '/bible', 
  'question'     : '/question',
  'task'         : '/task',
  'workbench'    : '/my/class',
  'setting'      : '/my/setting',
  'plan'         : '/my/plan',
  'work'         : '/work',
  'notification' : '/notification',
};

function BasicLayoutHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector(user);
  const userIsVip = useSelector(isVip);
  const userIsLogin = useSelector(isLogin);
  const userisDesigner = useSelector(isDesigner);

  const NAV_TOPAGES = ['academy', 'bible', 'question', 
    userisDesigner ? 'task' : null
  ].filter(i => i);

  const NAV_TOPAGE_ACTIVE = NAV_TOPAGES
    .find(item => location.pathname.indexOf(`/${item}`) > -1);

  const handleNavItem = (pathName) => {
    NAV_PATHNAME_MAP[pathName] && navigate(NAV_PATHNAME_MAP[pathName]);
  }

  const handleLogout = () => {
    cookies.remove("web_token", 
      { path: "/", domain: process.env.REACT_APP_DOMAIN});
    dispatch(delUserInfo());
    navigate(NAV_PATHNAME_MAP['home']);
  }

  return (
    <header className="page-header">
      <div className="header-content">
        <div className="header-hd">
          <Link className="logo-container" to="/">
            <img className="logo-content" alt="斗西家计划" src={HOMEPLAN_LOGO} />
          </Link>
          <BasicLayoutHeaderNav 
            navs={NAV_TOPAGES} 
            click={handleNavItem}
            active={NAV_TOPAGE_ACTIVE}
          />
        </div>
        <div className="header-ft">
          {userIsLogin ? (
            <>
              <div className="plan-go-container" 
                data-testid="plan-go-btn"
                onClick={() => handleNavItem('plan')}></div>
              <div className={`notification-container ${userInfo.notification_count ? 'active' : ''}`} 
                data-testid="notification-go-btn"
                onClick={() => handleNavItem('notification')}></div>
              <BasicLayoutHeaderAvatar 
                userInfo={userInfo} 
                vip={userIsVip} 
                designer={userisDesigner}
                clickMenu={handleNavItem}
                logout={handleLogout}
              />
            </>
          ) : (
            <div className="login-container" 
              onClick={() => dispatch(setLoginModalVisable(true))}>
              登录 / 注册
            </div>
          )}
          <EffectModal/>
        </div>
      </div>
    </header>
  );
}

export default BasicLayoutHeader;