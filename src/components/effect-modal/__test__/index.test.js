import { render, screen, fireEvent, act } from '@testing-library/react';
import EffectModal from "@components/effect-modal/index";
import { 
  setLoginModalVisable,
  setPhoneModalVisable,
  setUserTagModalVisable 
} from "@src/store/modal.slice";
import { setUserInfo } from "@src/store/user.slice";
import { Provider } from 'react-redux';
import store from "@src/store";
import authService from "@src/global/service/auth";
import userService from "@src/global/service/user";

describe('全局弹框', () => {

  test('展示逻辑', async () => {
    const mockFunc = jest.fn();
    jest.spyOn(authService, 'wxlogin').mockImplementation(() => {
      return Promise.resolve({})
    });
    jest.spyOn(userService, 'updateUserInfo').mockImplementation(() => {
      return Promise.resolve({
        identity: 1,
        remark: '学装修 DIY自己的家'
      })
    });

    render(
      <Provider store={store}>
        <EffectModal/>
      </Provider>
    );

    // 默认都不展示
    expect(document.getElementsByClassName('wechat-scan-modal')[0]).toBeFalsy();
    expect(document.getElementsByClassName('bind-phone-modal')[0]).toBeFalsy();
    expect(document.getElementsByClassName('user-tag-modal')[0]).toBeFalsy();
    // 展示登录扫码弹框
    store.dispatch(setLoginModalVisable(true));
    // 关闭登录扫码弹框
    fireEvent.click(document.getElementsByClassName('wechat-scan-close')[0]);
    expect(store.getState()['MODAL'].loginModalVisable).toBe(false);
    // 展示手机绑定弹框
    store.dispatch(setUserInfo({id:1, nickname: 'Jax'}));
    // 关闭手机绑定弹框
    fireEvent.click(document.getElementsByClassName('bind-phone-cancel')[0]);
    expect(store.getState()['MODAL'].phoneModalVisable).toBe(false);
    // 展示用户信息弹框
    store.dispatch(setPhoneModalVisable(true));
    store.dispatch(setUserInfo({phone: 13511111111}));
    fireEvent.click(document.getElementsByClassName('identity-item')[0]);
    fireEvent.click(document.getElementsByClassName('mark-item')[0]);
    // 关闭用户信息弹框
    await act(async () => {
      fireEvent.click(document.getElementsByClassName('mark-button')[0]);
    });
    expect(document.getElementsByClassName('user-tag-modal')[0]).toBeFalsy();
  });
});