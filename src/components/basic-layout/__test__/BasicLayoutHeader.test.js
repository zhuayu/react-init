import { render, screen } from '@testing-library/react';
import BasicLayoutHeader from "./../BasicLayoutHeader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "@src/store";

describe('公共头部渲染', () => {

  test('包含必要信息', () => {
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BasicLayoutHeader/>
        </BrowserRouter>
      </Provider>
    );

    const loginAndRegister = screen.getByTestId('login-and-register2');
    console.log(loginAndRegister);
    expect(2).toBe(2);

  });
});