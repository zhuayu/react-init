import { render, screen } from '@testing-library/react';
import BasicLayoutHeaderAvatar from "./../BasicLayoutHeaderAvatar";

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
  });
});