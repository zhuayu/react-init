import { render, screen, fireEvent } from '@testing-library/react';
import BasicLayoutHeaderAvatar, { userOverlayMenu, getElementById } from "./../BasicLayoutHeaderAvatar";

describe('渲染头像', () => {

  const userInfo = {
    avatar_url: 'https://mockurl',
    nickname: 'Jax'
  };

  test('渲染头像', () => {
    render(
      <BasicLayoutHeaderAvatar 
        userInfo={userInfo} 
        vip={true} 
        designer={true}
        clickMenu={() => {}}
        logout={() => {}}
      />
    );
    const userAvatar = screen.getByTestId('user-avatar');
    const userAvatarImgElement = userAvatar.getElementsByTagName('img')[0];
    expect(userAvatarImgElement).toHaveAttribute('src',userInfo.avatar_url);

    // overlay 的函数方法
    const element = getElementById('header-userinfo-container')();
    expect(element).not.toBeNull();
  });

  test('VIP设计师的下拉目录渲染', () => {
    const logoutMock = jest.fn();
    const MenuMock = jest.fn();

    render(userOverlayMenu({
      userInfo: {
        nickname: 'Jax'
      },
      vip: true,
      designer: true,
      clickMenu: MenuMock,
      logout: logoutMock
    }));
    const nickname = screen.getByTestId('user-nickname');
    expect(nickname).toHaveClass('vip');
    fireEvent.click(screen.queryByText('学习中心'));
    expect(MenuMock).toHaveBeenCalledWith('workbench');
    fireEvent.click(screen.queryByText('个人中心'));
    expect(MenuMock).toHaveBeenCalledWith('setting');
    fireEvent.click(screen.queryByText('赏金领地'));
    expect(MenuMock).toHaveBeenCalledWith('work');
    fireEvent.click(screen.queryByText('退出登录'));
    expect(logoutMock).toHaveBeenCalled();
  });

  test('非VIP设计师的下拉目录渲染', () => {
    render(userOverlayMenu({
      userInfo: {
        nickname: 'Jax'
      },
      vip: false,
      designer: false,
      clickMenu: () => {},
      logout: () => {}
    }));
    const nickname = screen.getByTestId('user-nickname');
    const menuWork = screen.queryByText('赏金领地');
    expect(nickname).not.toHaveClass('vip');
    expect(menuWork).toBeNull();
  });

});