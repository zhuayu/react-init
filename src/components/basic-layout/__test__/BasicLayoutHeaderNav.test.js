import { render, screen, fireEvent } from '@testing-library/react';
import BasicLayoutHeaderNav from "./../BasicLayoutHeaderNav";

describe('导航渲染', () => {

  const navDatas = ['academy', 'bible', 'question', 'task'];
  const navActive = 'bible';

  test('渲染四个导航项', () => {
    render(
      <BasicLayoutHeaderNav 
        click={() => {}}
        active={navActive}
        navs={navDatas}/>
    );

    const navItems = screen.getAllByTestId('nav-item');
    expect(navItems.length).toBe(4);
  });

  test('导航项中带有对应的 className 与是否 active 状态', () => {
    const mockFunc = jest.fn();
    render(
      <BasicLayoutHeaderNav 
        click={mockFunc}
        active={navActive}
        navs={navDatas}/>
    );

    const navItems = screen.getAllByTestId('nav-item');
    navItems.forEach((item, index) => {
      expect(item).toHaveClass(navDatas[index]);
      if(item.className.indexOf(navActive) > -1) {
        expect(item).toHaveClass('active');
      }else{
        expect(item).not.toHaveClass('active');
      }
      fireEvent.click(item);
      expect(mockFunc).toHaveBeenCalledWith(navDatas[index]);
    })
  })
});