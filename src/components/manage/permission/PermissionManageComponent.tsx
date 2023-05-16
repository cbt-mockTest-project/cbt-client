import SearchInput from '@components/common/input/SearchInput';
import { useLazySearchUser } from '@lib/graphql/user/hook/useUser';
import useInput from '@lib/hooks/useInput';
import { responsive } from '@lib/utils/responsive';
import { Checkbox, Col, List, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import PermissionManageUserListItem from './PermissionManageUserListItem';

interface PermissionManageComponentProps {}

const PermissionManageComponent: React.FC<
  PermissionManageComponentProps
> = () => {
  const [searchUser, { data: searchedUsers, refetch: refetchSearchUser }] =
    useLazySearchUser();
  const { value: searchValue, onChange: onChangeSearchValue } = useInput('');
  const handleSearch = () => {
    searchUser({ variables: { input: { name: searchValue } } });
  };
  return (
    <PermissionManageComponentBlock>
      <h3>유저권한을 관리하는 페이지입니다.</h3>
      <SearchInput
        className="permission-manage-search-input"
        placeholder="닉네임 또는 이메일을 입력해주세요."
        value={searchValue}
        onChange={onChangeSearchValue}
        onSearch={handleSearch}
      />
      {searchedUsers?.searchUser.users && (
        <ul className="permission-manage-user-list">
          <div className="permission-manage-user-list-header">
            <div className="permission-manage-user-list-header-email">
              이메일
            </div>
            <div className="permission-manage-user-list-header-nickname">
              닉네임
            </div>
            <div className="permission-manage-user-list-header-adblock">
              광고차단
            </div>
          </div>
          {searchedUsers.searchUser.users.map((user) => (
            <PermissionManageUserListItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </PermissionManageComponentBlock>
  );
};

export default PermissionManageComponent;

const PermissionManageComponentBlock = styled.div`
  .permission-manage-search-input {
    margin-top: 20px;
    max-width: 500px;
    margin-bottom: 20px;
  }
  .permission-manage-user-list-header {
    margin-bottom: 20px;
    padding: 10px 10px;
  }
  .permission-manage-user-list-header {
    display: flex;
    gap: 20px;
  }
  .permission-manage-user-list-header-email {
    flex: 0.4;
    max-width: 400px;
    white-space: nowrap;
    overflow-x: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .permission-manage-user-list-header-nickname {
    flex: 0.4;
    max-width: 400px;
    white-space: nowrap;
    overflow-x: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .permission-manage-user-list-header-adblock {
    flex: 0.2;
    max-width: 200px;
  }

  @media (max-width: ${responsive.medium}) {
    margin-top: 20px;
    padding: 0 20px;
    .permission-manage-user-list-header-email {
      max-width: 200px;
    }
    .permission-manage-user-list-header-nickname {
      max-width: 200px;
    }
    .permission-manage-user-list-header-adblock {
      max-width: 100px;
    }
  }
`;
