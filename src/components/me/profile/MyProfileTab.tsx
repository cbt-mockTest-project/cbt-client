import { useDeleteUser, useLogoutMutation } from '@lib/graphql/hook/useUser';
import useMyInfo from '@lib/hooks/useMyInfo';
import { handleError } from '@lib/utils/utils';
import palette from '@styles/palette';
import { App, Button, Input, InputRef, Upload, UploadProps } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const MyProfileTabBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 350px;
  .my-profile-tab-profile-image {
    border-radius: 50%;
    background-color: ${palette.gray_50};
  }
  .my-profile-tab-profile-image-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .my-profile-tab-label {
    margin-bottom: 10px;
  }
  .my-profile-tab-profile-image-update-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 25px;
  }
  .my-profile-tab-profile-image-control-button-wrapper {
    display: flex;
    gap: 10px;
  }
  .my-profile-tab-profile-image-control-desc {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
    margin-top: 5px;
  }
  .my-profile-tab-input-button-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .my-profile-tab-password-update-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .my-profile-tab-withdrawal-button {
    display: block;
    text-align: left;
    width: fit-content;
    font-size: 13px;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
`;

interface MyProfileTabProps {}

const MyProfileTab: React.FC<MyProfileTabProps> = () => {
  const { message, modal } = App.useApp();
  const {
    me,
    handleCheckPassword,
    handleUpdateNickname,
    handleUpdatePassword,
    handleDeleteProfileImg,
    handleUpdateProfileImg,
  } = useMyInfo();
  const [deleteUserMutation] = useDeleteUser();
  const nicknameInputRef = React.useRef<InputRef>(null);
  const [logoutMutation] = useLogoutMutation();
  const checkPasswordInputRef = React.useRef<InputRef>(null);
  const updatePasswordInputRef = React.useRef<InputRef>(null);
  const [isCheckedPassword, setIsCheckedPassword] = useState(true);
  const [uploading, setUploading] = useState(false);
  const handleLogout = async () => {
    try {
      await logoutMutation();
      location.reload();
    } catch (e) {
      handleError(e);
    }
  };
  const requestWithdrawal = async () => {
    try {
      const res = await deleteUserMutation();
      if (res.data?.deleteUser.ok) {
        message.success({ content: '회원탈퇴 되었습니다.' });
        await logoutMutation();
        location.reload();
        return;
      }
      return message.error({ content: res.data?.deleteUser.error });
    } catch (e) {
      handleError(e);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.png, .jpg, .jpeg',
    showUploadList: false,
    beforeUpload: (file) => {
      setUploading(true);
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('jpg, png, jpeg 파일만 업로드 가능합니다.');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('2MB 이하의 파일만 업로드 가능합니다.');
      }
      return isJpgOrPng && isLt2M;
    },
    customRequest: async ({ file }) => {
      await handleUpdateProfileImg(file);
      setUploading(false);
    },
  };

  const onClickWithdrawal = () => {
    modal.confirm({
      title: '탈퇴하시겠습니까?',
      content: '탈퇴시 데이터는 복구할 수 없습니다.',
      onOk: () => requestWithdrawal(),
    });
  };

  if (!me) return null;

  return (
    <MyProfileTabBlock>
      <div className="my-profile-tab-profile-image-section">
        <p className="my-profile-tab-label">프로필 이미지</p>
        <div className="my-profile-tab-profile-image-update-wrapper">
          <Image
            className="my-profile-tab-profile-image"
            src={
              me.profileImg ||
              `${process.env.NEXT_PUBLIC_CLOUD_FRONT}/user/profile_default.png`
            }
            width={75}
            height={75}
            alt="avatar"
          />
          <div className="my-profile-tab-profile-image-control-box">
            <div className="my-profile-tab-profile-image-control-button-wrapper">
              <Upload {...uploadProps}>
                <Button type="primary" loading={uploading}>
                  변경
                </Button>
              </Upload>
              {me.profileImg && (
                <Button onClick={handleDeleteProfileImg}>삭제</Button>
              )}
            </div>
            <p className="my-profile-tab-profile-image-control-desc">
              확장자: png, jpg, jpeg / 용량: 2MB 이하
            </p>
          </div>
        </div>
      </div>
      <div className="my-profile-tab-email-section">
        <p className="my-profile-tab-label">이메일</p>
        <Input value={me.email} disabled />
      </div>
      <div className="my-profile-tab-nickname-section">
        <p className="my-profile-tab-label">닉네임</p>
        <div className="my-profile-tab-input-button-wrapper">
          <Input defaultValue={me.nickname} ref={nicknameInputRef} />
          <Button
            onClick={() => {
              if (!nicknameInputRef.current?.input?.value) return;
              handleUpdateNickname(nicknameInputRef.current.input.value);
            }}
          >
            변경
          </Button>
        </div>
      </div>
      <div className="my-profile-tab-password-section">
        <p className="my-profile-tab-label">비밀번호</p>
        <div className="my-profile-tab-password-update-wrapper">
          <div className="my-profile-tab-input-button-wrapper">
            <Input.Password
              ref={checkPasswordInputRef}
              placeholder="현재 비밀번호"
            />
            <Button
              onClick={async () => {
                if (!checkPasswordInputRef.current?.input?.value) return;
                const checked = await handleCheckPassword(
                  checkPasswordInputRef.current.input.value
                );
                if (checked) setIsCheckedPassword(false);
              }}
            >
              확인
            </Button>
          </div>
          <div className="my-profile-tab-input-button-wrapper">
            <Input.Password
              ref={updatePasswordInputRef}
              placeholder="변경할 비밀번호"
              disabled={isCheckedPassword}
            />
            <Button
              onClick={() => {
                if (
                  isCheckedPassword ||
                  !updatePasswordInputRef.current?.input?.value
                )
                  return;
                handleUpdatePassword(
                  updatePasswordInputRef.current.input.value
                );
              }}
              disabled={isCheckedPassword}
            >
              변경
            </Button>
          </div>
        </div>
      </div>
      <Button onClick={handleLogout}>로그아웃</Button>
      <button
        className="my-profile-tab-withdrawal-button"
        onClick={onClickWithdrawal}
      >
        탈퇴하기
      </button>
    </MyProfileTabBlock>
  );
};

export default MyProfileTab;
