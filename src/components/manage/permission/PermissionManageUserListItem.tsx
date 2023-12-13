import {
  useCreateUserRole,
  useDeleteUserRole,
  useUpdateAdblockPermission,
} from '@lib/graphql/hook/useUser';
import { responsive } from '@lib/utils/responsive';
import { checkRole, handleError } from '@lib/utils/utils';
import { Checkbox, message } from 'antd';
import { create } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from 'types';

const PermissionManageUserListItemBlock = styled.li`
  display: flex;
  gap: 20px;
  padding: 10px 10px;
  transition: 0.2s all;
  :hover {
    background-color: #f0f0f0;
  }
  .permission-manage-user-list-item.email {
    flex: 0.4;
    max-width: 400px;
    white-space: nowrap;
    overflow-x: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .permission-manage-user-list-item.nickname {
    flex: 0.4;
    max-width: 400px;
    white-space: nowrap;
    overflow-x: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .permission-manage-user-list-item.adblock {
    flex: 0.2;
    max-width: 200px;
  }

  @media (max-width: ${responsive.medium}) {
    .permission-manage-user-list-item.email {
      max-width: 200px;
    }
    .permission-manage-user-list-item.nickname {
      max-width: 200px;
    }
    .permission-manage-user-list-item.adblock {
      max-width: 100px;
    }
  }
`;

interface PermissionManageUserListItemProps {
  user: User;
}

const PermissionManageUserListItem: React.FC<
  PermissionManageUserListItemProps
> = ({ user }) => {
  const [createUserRole] = useCreateUserRole();
  const [isAllowAdblock, setIsAllowAdblock] = useState(
    checkRole({ roleIds: [1, 2, 3, 4, 5, 6, 7], user })
  );
  const handleAllowAdblock = async () => {
    try {
      if (isAllowAdblock) {
        message.error('광고차단 권한을 해제할 수 없습니다.');
      } else {
        const res = await createUserRole({
          variables: {
            input: {
              userId: user.id,
              roleId: 1,
            },
          },
        });
        if (res.data?.createUserRole.ok) {
          message.success('광고차단 권한이 부여되었습니다.');
          setIsAllowAdblock(true);
          return;
        }
        message.error(res.data?.createUserRole.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <PermissionManageUserListItemBlock>
      <div className="permission-manage-user-list-item email">{user.email}</div>
      <div className="permission-manage-user-list-item nickname">
        {user.nickname}
      </div>
      <div className="permission-manage-user-list-item adblock">
        <Checkbox checked={isAllowAdblock} onClick={handleAllowAdblock} />
      </div>
    </PermissionManageUserListItemBlock>
  );
};

export default PermissionManageUserListItem;
