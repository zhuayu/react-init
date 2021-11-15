import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { user, isVip, isLogin, isDesigner } from "@/store/user.slice";
import BasicLayoutHeaderNav from "./BasicLayoutHeaderNav";
import BasicLayoutHeaderAvatar from "./BasicLayoutHeaderAvatar";
import HOMEPLAN_LOGO from "@/assets/images/layout/header/homeplan-logo.svg";

const NAV_PATHNAME_MAP = {
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

  const handleLogin = () => {
    console.log('login ok');
  }

  const handleLogout = () => {
    console.log('logout ok');
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
                onClick={() => handleNavItem('plan')}></div>
              <div className="notification-container active" 
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
              onClick={handleLogin}>
              登录 / 注册
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default BasicLayoutHeader;