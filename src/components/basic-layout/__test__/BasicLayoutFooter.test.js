import { render, screen } from '@testing-library/react';
import BasicLayoutFooter from "./../BasicLayoutFooter";


describe('公共尾部渲染', () => {

  const ICP_TEXT = "沪ICP备2020026846号";
  const GONGAN_TEXT = "沪公网安备31010102006648号";

  test('包含必要信息', () => {
    
    render(
      <BasicLayoutFooter/>
    );

    const icp = screen.getByTestId('icp');
    const gongan = screen.getByTestId('gongan');
    expect(icp).toHaveTextContent(ICP_TEXT);
    expect(gongan).toHaveTextContent(GONGAN_TEXT);
  });
});