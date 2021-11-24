import { render, screen } from '@testing-library/react';
import BindPhoneModal from "@components/effect-modal/BindPhoneModal";
import { Provider } from 'react-redux';
import store from "@src/store";

describe('手机绑定弹框', () => {
  test('弹框展现逻辑', () => {
    const mockFunc = jest.fn();
    const { container} = render(
      <Provider store={store}>
        <BindPhoneModal visible={true} onCancel={mockFunc}/>
      </Provider>
    );
    console.log(process.env.NODE_ENV);
    expect(screen.getByTestId('bind-phone-modal')).not.toBeNull();
  });
});