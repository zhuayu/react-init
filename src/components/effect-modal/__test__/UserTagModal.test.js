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
import userService from "@src/global/service/user";
import UserTagModal from "@components/effect-modal/UserTagModal";

describe('用户信息手机弹框', () => {
  test('使用逻辑', async () => {
    const mockFunc = jest.fn();
    jest.spyOn(userService, 'updateUserInfo').mockImplementation(() => {
      return Promise.resolve({
        identity: 1,
        remark: '学装修 DIY自己的家'
      })
    });

    render(
      <Provider store={store}>
        <UserTagModal 
          visible={true} 
          onCancel={mockFunc}/>
      </Provider>
    );

    fireEvent.click(document.getElementsByClassName('identity-item')[0]);
    fireEvent.click(document.getElementsByClassName('mark-item')[0]);
    fireEvent.click(document.getElementsByClassName('modal-back')[0]);
    fireEvent.click(document.getElementsByClassName('identity-item')[1]);
    expect(document.getElementsByClassName('mark-button')[0]).toBeDisabled();
    fireEvent.change(document.getElementsByClassName('mark-input')[0], {
      target: { value: 'REMARK'}
    });
    fireEvent.click(document.getElementsByClassName('modal-back')[0]);
    fireEvent.click(document.getElementsByClassName('identity-item')[1]);
    expect(document.getElementsByClassName('mark-input')[0].value).toBe('REMARK');

    // 关闭用户信息弹框
    await act(async () => {
      fireEvent.click(document.getElementsByClassName('mark-button')[0]);
    });
    expect(mockFunc).toHaveBeenCalled();
  });
  test('按钮提交锁', async () => {
    const mockFunc = jest.fn();
    jest.spyOn(userService, 'updateUserInfo').mockImplementation(() => {
      return Promise.reject({})
    });

    render(
      <Provider store={store}>
        <UserTagModal 
          visible={true} 
          onCancel={mockFunc}/>
      </Provider>
    );

    fireEvent.click(document.getElementsByClassName('identity-item')[0]);
    fireEvent.click(document.getElementsByClassName('mark-item')[0]);
    fireEvent.click(document.getElementsByClassName('mark-button')[0]);
    fireEvent.click(document.getElementsByClassName('mark-button')[0]);
    await act(async () => {
      render(
        <Provider store={store}>
          <UserTagModal 
            visible={true} 
            onCancel={mockFunc}/>
        </Provider>
      );
    });
  });
});