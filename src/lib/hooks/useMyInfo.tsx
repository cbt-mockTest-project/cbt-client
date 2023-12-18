import { uploadAPI } from '@lib/apis/upload';
import {
  useCheckPasswordMutation,
  useEditProfileMutation,
  useLogoutMutation,
  useMeQuery,
} from '@lib/graphql/hook/useUser';
import { ME_QUERY } from '@lib/graphql/query/userQuery';
import { MeQuery } from '@lib/graphql/query/userQuery.generated';
import { handleError } from '@lib/utils/utils';
import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { User } from 'types';
import useApolloClient from './useApolloCient';

const useMyInfo = () => {
  const { updateCache } = useApolloClient();
  const [logoutMutation] = useLogoutMutation();
  const [checkPasswordMutation] = useCheckPasswordMutation();
  const [editProfileMutation] = useEditProfileMutation();
  const { data: MeQuery } = useMeQuery();
  const me = MeQuery?.me.user;

  const handleUpdateNickname = async (nickname: string) => {
    try {
      if (nickname.length < 2) {
        return message.error('2글자 이상 입력해주세요.');
      }
      if (nickname.length > 10) {
        return message.error('10글자 이하로 입력해주세요.');
      }
      const res = await editProfileMutation({
        variables: { input: { nickname } },
      });

      if (!res.data?.editProfile.ok)
        return message.error(res.data?.editProfile.error);

      updateCache<MeQuery>(ME_QUERY, (prev) => ({
        ...prev,
        me: {
          ...prev.me,
          user: {
            ...prev.me.user,
            nickname,
          } as User,
        },
      }));
      message.success('닉네임이 변경되었습니다.');
    } catch (e) {
      handleError(e);
      message.error('닉네임 변경에 실패했습니다.');
    }
  };

  const handleUpdateProfileImg = async (file: string | RcFile | Blob) => {
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('path', 'user');
      const { data } = await uploadAPI(form);
      const profileImg = data.url;
      const res = await editProfileMutation({
        variables: { input: { profileImg } },
      });

      if (!res.data?.editProfile.ok)
        return message.error(res.data?.editProfile.error);

      updateCache<MeQuery>(ME_QUERY, (prev) => ({
        ...prev,
        me: {
          ...prev.me,
          user: {
            ...prev.me.user,
            profileImg,
          } as User,
        },
      }));

      message.success('프로필 이미지가 변경되었습니다.');
    } catch (e) {
      handleError(e);
      message.error('프로필 이미지 변경에 실패했습니다.');
    }
  };

  const handleDeleteProfileImg = async () => {
    try {
      const res = await editProfileMutation({
        variables: { input: { profileImg: '' } },
      });

      if (!res.data?.editProfile.ok)
        return message.error(res.data?.editProfile.error);

      updateCache<MeQuery>(ME_QUERY, (prev) => ({
        ...prev,
        me: {
          ...prev.me,
          user: {
            ...prev.me.user,
            profileImg: '',
          } as User,
        },
      }));

      message.success('프로필 이미지가 삭제되었습니다.');
    } catch (e) {
      handleError(e);
      message.error('프로필 이미지 삭제에 실패했습니다.');
    }
  };

  const handleUpdatePassword = async (password: string) => {
    try {
      if (password.length < 4) {
        return message.error('비밀번호는 4자리 이상 입력해주세요.');
      }
      const res = await editProfileMutation({
        variables: { input: { password } },
      });

      if (!res.data?.editProfile.ok)
        return message.error(res.data?.editProfile.error);

      message.success('비밀번호가 변경되었습니다.');
      handleLogout();
    } catch (e) {
      handleError(e);
      message.error('비밀번호 변경에 실패했습니다.');
    }
  };

  const handleCheckPassword = async (password: string) => {
    try {
      const res = await checkPasswordMutation({
        variables: { input: { password } },
      });

      if (!res.data?.checkPassword.ok)
        return message.error(res.data?.checkPassword.error);

      message.success('비밀번호가 확인되었습니다.');
      return true;
    } catch (e) {
      handleError(e);
      message.error('비밀번호 확인에 실패했습니다.');
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation();
      location.reload();
    } catch (e) {
      handleError(e);
    }
  };

  return {
    me,
    handleUpdateNickname,
    handleUpdatePassword,
    handleCheckPassword,
    handleUpdateProfileImg,
    handleDeleteProfileImg,
    handleLogout,
  };
};

export default useMyInfo;
