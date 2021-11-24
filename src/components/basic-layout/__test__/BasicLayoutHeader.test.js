import { render, screen, fireEvent, act } from '@testing-library/react';
import BasicLayoutHeader from "./../BasicLayoutHeader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import userReducer, { setUserInfo, delUserInfo } from "@src/store/user.slice";
import store from "@src/store";
import {createMemoryHistory} from 'history'

describe('公共头部渲染', () => {

  test('登录态渲染', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BasicLayoutHeader/>
        </BrowserRouter>
      </Provider>
    );
    window.WxLogin = class {};
    const loginBtn = screen.queryByText('登录 / 注册');
    expect(loginBtn).not.toBeNull();
    fireEvent.click(loginBtn);
    expect(store.getState()['MODAL'].loginModalVisable).toBe(true);
  });

  test('导航跳转', () => {
    const tree = render(
      <Provider store={store}>
        <BrowserRouter>
          <BasicLayoutHeader/>
        </BrowserRouter>
      </Provider>
    );

    // 登录
    store.dispatch(setUserInfo({id:1, nickname: 'Jax'}));
    // expect(tree).toMatchSnapshot();

    // 导航跳转
    const planBtn = screen.getByTestId('plan-go-btn');
    fireEvent.click(planBtn);
    expect(window.location.pathname).toBe('/my/plan');
    const notificationBtn = screen.getByTestId('notification-go-btn');
    fireEvent.click(notificationBtn);
    expect(window.location.pathname).toBe('/notification');

    // 退出后状态
    // store.dispatch(delUserInfo({}));
    // expect(screen.queryByText('登录 / 注册')).not.toBeNull();
    // expect(window.location.pathname).toBe('/');
  });
});