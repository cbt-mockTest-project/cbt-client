import { useUpdateAdblockPermission } from '@lib/graphql/user/hook/useUser';
import { responsive } from '@lib/utils/responsive';
import { handleError } from '@lib/utils/utils';
import { Checkbox, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

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
  user: {
    id: number;
    email: string;
    nickname: string;
    isAllowAdblock: boolean;
  };
}

const PermissionManageUserListItem: React.FC<
  PermissionManageUserListItemProps
> = ({ user }) => {
  const [isAllowAdblock, setIsAllowAdblock] = useState(user.isAllowAdblock);
  const [updateAllowAdblock] = useUpdateAdblockPermission();
  const handleAllowAdblock = async () => {
    try {
      const res = await updateAllowAdblock({
        variables: {
          input: {
            userId: user.id,
          },
        },
      });
      if (res.data?.updateAdBlockPermission.ok) {
        if (res.data?.updateAdBlockPermission.adblockPermission) {
          message.success('광고차단 권한이 부여되었습니다.');
          setIsAllowAdblock(true);
        } else {
          message.success('광고차단 권한이 해제되었습니다.');
          setIsAllowAdblock(false);
        }
        return;
      }
      message.error(res.data?.updateAdBlockPermission.error);
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
