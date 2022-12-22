import Label from '@components/common/label/Label';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import {
  useCheckPasswordMutation,
  useDeleteUser,
  useEditProfileMutation,
  useLogoutMutation,
} from '@lib/graphql/user/hook/useUser';
import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';
import useInput from '@lib/hooks/useInput';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

interface EditComponentProps {
  user: MeQuery['me']['user'];
}

const EditComponent: React.FC<EditComponentProps> = ({ user }) => {
  const client = useApollo({}, '');
  const [editProfileMutation] = useEditProfileMutation();
  const [checkPasswordMutation] = useCheckPasswordMutation();
  const [deleteUserMutation] = useDeleteUser();
  const [logoutMutation] = useLogoutMutation();
  const [withdrawalModalState, setWithdrawalModalState] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const { value: nickname, onChange: onChangeNicknameValue } = useInput(
    user?.nickname || ''
  );
  const { value: prevPassword, onChange: onChangePrevPasswordValue } =
    useInput('');
  const { value: newPassword, onChange: onChangeNewPasswordValue } =
    useInput('');
  const requestChangeNickname = async () => {
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
  };
  const tryRequestChangeNickname = convertWithErrorHandlingFunc({
    callback: requestChangeNickname,
  });
  const requestChangePassword = async () => {
    const res = await editProfileMutation({
      variables: { input: { password: newPassword } },
    });
    if (res.data?.editProfile.ok) {
      message.success({ content: '비밀번호가 변경되었습니다.' });
      await logoutMutation();
      location.reload();
      return;
    }
    return message.error({ content: res.data?.editProfile.error });
  };
  const tryRequestChangePassword = convertWithErrorHandlingFunc({
    callback: requestChangePassword,
  });
  const requestCheckPassword = async () => {
    const res = await checkPasswordMutation({
      variables: { input: { password: prevPassword } },
    });
    if (res.data?.checkPassword.ok) {
      setPasswordChecked(true);
      return message.success({ content: '확인 되었습니다.' });
    }
    return message.error({ content: res.data?.checkPassword.error });
  };
  const tryRequestCheckPassword = convertWithErrorHandlingFunc({
    callback: requestCheckPassword,
  });
  const requestWithdrawal = async () => {
    const res = await deleteUserMutation();
    if (res.data?.deleteUser.ok) {
      message.success({ content: '회원탈퇴 되었습니다.' });
      await logoutMutation();
      location.reload();
      return;
    }
    return message.error({ content: res.data?.deleteUser.error });
  };
  const tryRequestWithdrawal = convertWithErrorHandlingFunc({
    callback: requestWithdrawal,
  });
  const onToggleWithdrawalModal = () =>
    setWithdrawalModalState(!withdrawalModalState);
  return (
    <EditComponentContainer>
      <h1>회원정보 변경</h1>
      <div className="edit-block">
        <Label content={'닉네임'} />
        <div className="edit-input-and-button-wrapper">
          <Input value={nickname} onChange={onChangeNicknameValue} />
          <Button onClick={tryRequestChangeNickname}>변경하기</Button>
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
          <Button onClick={tryRequestCheckPassword} disabled={passwordChecked}>
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
          <Button
            onClick={tryRequestChangePassword}
            disabled={!passwordChecked}
          >
            변경하기
          </Button>
        </div>
      </div>
      <div className="edit-block">
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
        onConfirm={tryRequestWithdrawal}
        onClose={onToggleWithdrawalModal}
        onCancel={onToggleWithdrawalModal}
      />
    </EditComponentContainer>
  );
};

export default EditComponent;

const EditComponentContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
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
