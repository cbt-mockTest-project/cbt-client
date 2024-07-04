import Label from '@components/common/label/Label';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import {
  useCheckPasswordMutation,
  useDeleteUser,
  useEditProfileMutation,
  useLogoutMutation,
  useMeQuery,
} from '@lib/graphql/hook/useUser';
import useInput from '@lib/hooks/useInput';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, Input, App } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditComponentSkeleton from './EditComponentSkeleton';
import { handleError } from '@lib/utils/utils';

interface EditComponentProps {}

const EditComponent: React.FC<EditComponentProps> = () => {
  const { message } = App.useApp();
  const client = useApollo({}, '');
  const [editProfileMutation] = useEditProfileMutation();
  const [checkPasswordMutation] = useCheckPasswordMutation();
  const [deleteUserMutation] = useDeleteUser();
  const [logoutMutation] = useLogoutMutation();
  const [withdrawalModalState, setWithdrawalModalState] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const { data: meQuery } = useMeQuery();
  const user = meQuery?.me.user;
  const { value: nickname, onChange: onChangeNicknameValue } = useInput(
    user?.nickname || ''
  );
  const { value: prevPassword, onChange: onChangePrevPasswordValue } =
    useInput('');
  const { value: newPassword, onChange: onChangeNewPasswordValue } =
    useInput('');
  const requestChangeNickname = async () => {
    try {
      if (nickname.length <= 1) {
        return message.error('2글자 이상 입력해주세요.');
      }
      const res = await editProfileMutation({
        variables: { input: { nickname } },
      });
      if (res.data?.editProfile.ok) {
        client.cache.modify({
          id: 'ROOT_QUERY',
          fields: {
            me(me) {
              return { ...me, user: { ...me.user, nickname } };
            },
          },
        });
        return message.success({ content: '닉네임이 변경되었습니다.' });
      }
      return message.error({ content: res.data?.editProfile.error });
    } catch (e) {
      handleError(e);
    }
  };

  const requestLogout = async () => {
    try {
      await logoutMutation();
      location.reload();
    } catch (e) {
      handleError(e);
    }
  };
  const requestChangePassword = async () => {
    try {
      if (newPassword.length < 4) {
        return message.error('비밀번호를 4글자 이상 입력해주세요.');
      }
      const res = await editProfileMutation({
        variables: { input: { password: newPassword } },
      });
      if (res.data?.editProfile.ok) {
        message.success({ content: '비밀번호가 변경되었습니다.' });
        requestLogout();
        return;
      }
      return message.error({ content: res.data?.editProfile.error });
    } catch (e) {
      handleError(e);
    }
  };

  const requestCheckPassword = async () => {
    try {
      const res = await checkPasswordMutation({
        variables: { input: { password: prevPassword } },
      });
      if (res.data?.checkPassword.ok) {
        setPasswordChecked(true);
        return message.success({ content: '확인 되었습니다.' });
      }
      return message.error({ content: res.data?.checkPassword.error });
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

  const onToggleWithdrawalModal = () =>
    setWithdrawalModalState(!withdrawalModalState);

  if (!meQuery?.me.user) return <EditComponentSkeleton />;
  return (
    <EditComponentContainer>
      <h1>회원정보</h1>
      <div className="edit-block">
        <Label content={'이메일'} />
        <Input
          value={user?.email}
          onChange={onChangeNicknameValue}
          disabled={true}
        />
        <Label content={'이용중인 플랜'} />
        <Input
          value={
            user?.userRoles.some((role) => role.role.id === 2)
              ? '산안기 프리패스'
              : user?.userRoles.some((role) => role.role.id === 1)
              ? '베이직 플랜'
              : user?.userRoles.some((role) => role.role.id === 3)
              ? '무료 체험'
              : '없음'
          }
          onChange={onChangeNicknameValue}
          disabled={true}
        />
        <Label content={'닉네임'} />
        <div className="edit-input-and-button-wrapper">
          <Input value={nickname} onChange={onChangeNicknameValue} />
          <Button onClick={requestChangeNickname}>변경하기</Button>
        </div>
      </div>
      <div className="edit-block">
        <Label content={'비밀번호'} />
        <Label content={'현재 비밀번호'} className="edit-sub-label" />
        <div className="edit-input-and-button-wrapper">
          <Input
            value={prevPassword}
            onChange={onChangePrevPasswordValue}
            disabled={passwordChecked}
            type="password"
          />
          <Button onClick={requestCheckPassword} disabled={passwordChecked}>
            확인하기
          </Button>
        </div>
        <Label content={'변경할 비밀번호'} className="edit-sub-label" />
        <div className="edit-input-and-button-wrapper">
          <Input
            value={newPassword}
            onChange={onChangeNewPasswordValue}
            disabled={!passwordChecked}
            type="password"
          />
          <Button onClick={requestChangePassword} disabled={!passwordChecked}>
            변경하기
          </Button>
        </div>
      </div>
      <div className="edit-block">
        <Button onClick={requestLogout}>로그아웃</Button>
        <div className="edit-input-and-button-wrapper ">
          <div className="edit-withdrawl-label-wrapper">
            <Label content="탈퇴하기" />
            <Label
              content={'회원 탈퇴 시 재가입이 불가능 합니다.'}
              className="edit-sub-label"
            />
          </div>
          <Button onClick={onToggleWithdrawalModal}>탈퇴하기</Button>
        </div>
      </div>
      <ConfirmModal
        open={withdrawalModalState}
        confirmLabel="탈퇴하기"
        content={
          <pre>{`탈퇴 후 재가입이 불가능합니다.\n탈퇴 하시겠습니까?`}</pre>
        }
        onConfirm={requestWithdrawal}
        onClose={onToggleWithdrawalModal}
        onCancel={onToggleWithdrawalModal}
      />
    </EditComponentContainer>
  );
};

export default EditComponent;

const EditComponentContainer = styled.div`
  max-width: 300px;
  margin: 50px auto;
  h1 {
    font-size: 1.2rem;
    font-size: bold;
  }
  .edit-input-and-button-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }
  .edit-sub-label {
    font-size: 0.8rem;
    color: ${palette.gray_500};
    margin-top: 5px;
  }
  .edit-block {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
  .edit-withdrawal-button {
    margin-top: 10px;
  }
  .edit-withdrawl-label-wrapper {
    display: flex;
    flex-direction: column;
  }
`;
