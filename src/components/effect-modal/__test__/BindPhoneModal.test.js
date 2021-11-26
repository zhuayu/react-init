import { render, screen, fireEvent, act } from '@testing-library/react';
import BindPhoneModal from "@components/effect-modal/BindPhoneModal";
import { Provider } from 'react-redux';
import store from "@src/store";
import smsService from "@src/global/service/sms";

describe('手机绑定弹框', () => {

  test('展示逻辑', async () => {
    const mockFunc = jest.fn();
    render(
      <Provider store={store}>
        <BindPhoneModal visible={true} onCancel={mockFunc}/>
      </Provider>
    );
    const closeBtn = document.getElementsByClassName('lar-cancel')[0];
    fireEvent.click(closeBtn);
    expect(mockFunc).toHaveBeenCalled();
  });

  test('验证逻辑', async () => {

    const mockFunc = jest.fn();
    jest.spyOn(smsService, 'smsRegisterCode').mockImplementation(() => {
      return Promise.resolve({
        key: '12345'
      })
    });
    jest.spyOn(smsService, 'smsBindPhone').mockImplementation(() => {
      return Promise.resolve({
        'message': 'success'
      })
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <BindPhoneModal visible={true} onCancel={mockFunc}/>
        </Provider>
      );
    });

    const sendSmsBtn = document.getElementsByClassName('form-code-box')[0];
    const submitBtn = document.getElementsByClassName('form-submit-btn')[0];
    const input = screen.getByTestId('input-for-phone');
    const codeInput = screen.getByTestId('input-for-code');
    const rememberCheckbox = screen.getByTestId('checkbox-for-remember');

    // 没有输入任何值直接点击发送验证码，提示：请输入手机号！
    fireEvent.click(sendSmsBtn);
    expect(screen.queryByText('请输入手机号！')).not.toBeNull();
    // 输入错误手机号点击发送验证码，提示：手机号格式错误！
    fireEvent.change(input, {target: {value: '11111111'}});
    fireEvent.click(sendSmsBtn);
    expect(screen.queryByText('手机号格式错误！')).not.toBeNull();
    // 输入正确手机号点击发送验证码，提示：验证码发送成功，请注意查看 ～
    fireEvent.change(input, {target: {value: '13511111111'}});

    // 没有发送验证码时点击提交，提示：请点击发送验证码
    fireEvent.change(codeInput, {target: {value: '1234'}});
    fireEvent.click(submitBtn);
    expect(screen.queryByText('请点击发送验证码')).not.toBeNull();

    jest.useFakeTimers();
    // 连续点击发送验证码
    await act(async () => {
      fireEvent.click(sendSmsBtn);
    });
    expect(smsService.smsRegisterCode).toHaveBeenCalled();
    expect(screen.queryByText('验证码发送成功，请注意查看 ～')).not.toBeNull();
    // // 发送验证码按钮文案开始倒计时
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('58秒')).not.toBeNull();
    act(() => {
      jest.advanceTimersByTime(57000);
    });
    // 在倒计时过程中按一下
    fireEvent.click(sendSmsBtn);
    expect(screen.queryByText('1秒')).not.toBeNull();
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // 绑定手机号，没有同意协议情况下不绑定
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(smsService.smsBindPhone).not.toHaveBeenCalled();
    // 绑定手机号，同意协议情况下绑定
    fireEvent.click(rememberCheckbox);
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(smsService.smsBindPhone).toHaveBeenCalled();
  });

  test("验证码锁", async () => {
    const mockFunc = jest.fn();
    jest.spyOn(smsService, 'smsRegisterCode').mockImplementation(() => {
      return Promise.reject({
        'message': 'fail'
      })
    });
    render(
      <Provider store={store}>
        <BindPhoneModal visible={true} onCancel={mockFunc}/>
      </Provider>
    );
    const sendSmsBtn = document.getElementsByClassName('form-code-box')[0];
    const input = screen.getByTestId('input-for-phone');
    fireEvent.change(input, {target: {value: '13511111111'}});
    fireEvent.click(sendSmsBtn);
    fireEvent.click(sendSmsBtn);
    await act(async () => {
      render(
        <Provider store={store}>
          <BindPhoneModal visible={true} onCancel={mockFunc}/>
        </Provider>
      );
    });
  })

  test("绑定手机锁", async () => {
    const mockFunc = jest.fn();
    jest.spyOn(smsService, 'smsRegisterCode').mockImplementation(() => {
      return Promise.resolve({
        'key': '1234'
      })
    });
    jest.spyOn(smsService, 'smsBindPhone').mockImplementation(() => {
      return Promise.reject({
        'message': 'fail'
      })
    });
    render(
      <Provider store={store}>
        <BindPhoneModal visible={true} onCancel={mockFunc}/>
      </Provider>
    );

    const sendSmsBtn = document.getElementsByClassName('form-code-box')[0];
    const submitBtn = document.getElementsByClassName('form-submit-btn')[0];
    const input = screen.getByTestId('input-for-phone');
    const codeInput = screen.getByTestId('input-for-code');
    const rememberCheckbox = screen.getByTestId('checkbox-for-remember');
    fireEvent.change(codeInput, {target: {value: '1234'}});
    fireEvent.change(input, {target: {value: '13511111111'}});
    fireEvent.click(rememberCheckbox);

    await act(async () => {
      fireEvent.click(sendSmsBtn);
    });

    fireEvent.click(submitBtn);
    fireEvent.click(submitBtn);
    await act(async () => {
      render(
        <Provider store={store}>
          <BindPhoneModal visible={true} onCancel={mockFunc}/>
        </Provider>
      );
    });
  })
});