import { render, screen } from '@testing-library/react';
import BasicLayoutFooter from "./../BasicLayoutFooter";

describe('公共尾部渲染', () => {

  const ICP_TEXT = "沪ICP备2020026846号";
  const GONGAN_TEXT = "沪公网安备31010102006648号";

  render(
    <BasicLayoutFooter/>
  );

  test('包含备案信息', () => {
    const icp = screen.getByTestId('icp');
    expect(icp).toHaveTextContent(ICP_TEXT);
  });

  test('包含公安备案信息', () => {
    const gongan = screen.getByTestId('gongan');
    expect(gongan).toHaveTextContent(GONGAN_TEXT);
  })
});