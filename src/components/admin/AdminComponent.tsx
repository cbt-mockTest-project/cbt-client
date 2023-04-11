import {
  useLazySearchUser,
  useUpdateAdblockPermission,
} from '@lib/graphql/user/hook/useUser';
import { Button } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import styled from 'styled-components';

interface AdminComponentProps {}

const AdminComponent: React.FC<AdminComponentProps> = () => {
  const [searchUser, { data: searchedUsers, refetch: refetchSearchUser }] =
    useLazySearchUser();
  const [updatePermission] = useUpdateAdblockPermission();
  return (
    <AdminComponentContainer>
      <Search
        onSearch={(value) => {
          searchUser({ variables: { input: { name: value } } });
        }}
      />
      <ul>
        {searchedUsers?.searchUser.users &&
          searchedUsers.searchUser.users.map((user) => (
            <li key={user.id}>
              <span>{user.email}</span>
              <span>{user.nickname}</span>
              <Button
                onClick={async () => {
                  await updatePermission({
                    variables: {
                      input: {
                        userId: user.id,
                      },
                    },
                  });
                  await refetchSearchUser();
                }}
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
`;
