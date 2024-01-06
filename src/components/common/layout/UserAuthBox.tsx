import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { loginModal } from '@lib/constants';
import { useLogoutMutation, useMeQuery } from '@lib/graphql/hook/useUser';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import { Button, Dropdown } from 'antd';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const UserAuthBoxBlock = styled.div`
  padding: 0px 10px 0px 24px;
  button {
    width: 100%;
  }
  .user-auth-user-info-and-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .user-auth-user-info-profile-image {
    border-radius: 50%;
    background-color: ${palette.gray_50};
  }

  .user-auth-user-info {
    font-size: 14px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

interface UserAuthBoxProps {
  className?: string;
}

const UserAuthBox: React.FC<UserAuthBoxProps> = ({ className }) => {
  const { data } = useMeQuery();
  const dispatch = useAppDispatch();

  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const user = data?.me.user;

  return (
    <UserAuthBoxBlock className={className}>
      {!user && <Button onClick={openLoginModal}>로그인</Button>}
      {user && (
        <div className="user-auth-user-info-and-button">
          <div className="user-auth-user-info">
            <Image
              className="user-auth-user-info-profile-image"
              src={user.profileImg || '/png/profile/profile_default.png'}
              alt="프로필이미지"
              width={25}
              height={25}
            />
            <span>{user.nickname}</span>
          </div>
        </div>
      )}
    </UserAuthBoxBlock>
  );
};

export default UserAuthBox;
