import { render, screen } from '@testing-library/react';
import BasicLayoutHeaderNav from "./../BasicLayoutHeaderNav";

describe('导航渲染', () => {

  const navDatas = ['academy', 'bible', 'question', 'task'];
  const navActive = 'bible';

  render(
    <BasicLayoutHeaderNav 
      click={() => {}}
      active={navActive}
      navs={navDatas}/>
  );

  const navItems = screen.getAllByTestId('nav-item');

  test('渲染四个导航项', () => {
    expect(navItems.length).toBe(4);
  });

  test('导航项中带有对应的 className', () => {
    navItems.forEach((item, index) => {
      expect(item).toHaveClass(navDatas[index]);
      if(item.className.indexOf(navActive) > -1) {
        expect(item).toHaveClass('active');
      }else{
        expect(item).not.toHaveClass('active');
      }
    })
  })
});