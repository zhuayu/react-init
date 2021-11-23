import WechatScanLoginModal from "@components/effect-modal/WechatScanLoginModal";
import BindPhoneModal from "@components/effect-modal/BindPhoneModal";
import UserTagModal from "@components/effect-modal/UserTagModal";
import { useSelector, useDispatch } from "react-redux";
import { 
    loginModalVisable, 
    phoneModalVisable, 
    userTagModalVisable,
    setLoginModalVisable,  
    setPhoneModalVisable,
    setUserTagModalVisable, 
} from "@store/modal.slice";
import { user, isLogin } from "@store/user.slice";

// 由于登录组件在全局的任意地方都有可能用到（ 用户未登录时，触发需要登录的动作 ）
// 因此其显隐由 redux 全局来负责管理

function EffectModal() {

  const dispatch = useDispatch();
  const loginVisable = useSelector(loginModalVisable);
  const phoneVisable = useSelector(phoneModalVisable);
  const tagVisable = useSelector(userTagModalVisable);
  const userInfo = useSelector(user);
  const userIsLogin = useSelector(isLogin);
  
  return (
    <>
      { 
        !userIsLogin && <WechatScanLoginModal 
          visible={loginVisable} 
          onCancel={() => dispatch(setLoginModalVisable(false))}/>
      }

      { 
        (userIsLogin && !userInfo.phone) && <BindPhoneModal 
          visible={phoneVisable} 
          onCancel={() => dispatch(setPhoneModalVisable(false))}/>
      }

      { 
        (userInfo.phone && !userInfo.identity) && <UserTagModal 
          identity={userInfo.identity}
          remark={userInfo.remark}
          visible={tagVisable} 
          onCancel={() => dispatch(setUserTagModalVisable(false))}/>
      }
    </>
  );
}

export default EffectModal;