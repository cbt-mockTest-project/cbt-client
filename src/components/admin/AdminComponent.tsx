import {
  useLazySearchUser,
  useUpdateAdblockPermission,
} from '@lib/graphql/user/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { Button, message } from 'antd';
import Search from 'antd/lib/input/Search';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface AdminComponentProps {}

const AdminComponent: React.FC<AdminComponentProps> = () => {
  const [searchUser, { data: searchedUsers, refetch: refetchSearchUser }] =
    useLazySearchUser();
  const [updatePermission] = useUpdateAdblockPermission();
  const onClickUpdatePermissionButton = async (userId: number) => {
    try {
      const res = await updatePermission({
        variables: {
          input: {
            userId,
          },
        },
      });
      if (res.data?.updateAdBlockPermission.ok) {
        if (res.data?.updateAdBlockPermission.adblockPermission) {
          message.success('광고차단 권한이 부여되었습니다.');
        } else {
          message.success('광고차단 권한이 해제되었습니다.');
        }
        await refetchSearchUser();
        return;
      }
      message.error(res.data?.updateAdBlockPermission.error);
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <AdminComponentContainer>
      <Link href="/admin/feedback">피드백페이지로</Link>
      <Link href="/admin/payment">결제페이지로</Link>
      <Search
        onSearch={(value) => {
          searchUser({ variables: { input: { name: value } } });
        }}
      />
      <ul className="search-user-list">
        {searchedUsers?.searchUser.users &&
          searchedUsers.searchUser.users.map((user) => (
            <li className="search-user-list-item" key={user.id}>
              <div className="search-user-info-wrapper">
                <span className="search-user-info-item">{user.email}</span>
                <span className="search-user-info-item">{user.nickname}</span>
              </div>
              <Button
                type="primary"
                onClick={() => onClickUpdatePermissionButton(user.id)}
              >
                {user.isAllowAdblock ? '광고차단 해제하기' : '광고차단하기'}
              </Button>
            </li>
          ))}
      </ul>
    </AdminComponentContainer>
  );
};

export default AdminComponent;

const AdminComponentContainer = styled.div`
  padding: 30px 15px;
  .search-user-list {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
  }
  .search-user-info-item {
    width: 200px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .search-user-info-wrapper {
    display: flex;
    gap: 10px;
  }
  .search-user-list-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    word-break: break-all;

    button {
    }
  }
`;
