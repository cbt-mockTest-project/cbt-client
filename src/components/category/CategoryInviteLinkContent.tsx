import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { CreateCategoryInvitationLinkMutation } from '@lib/graphql/query/categoryInvitationLinkQuery.generated';

interface CategoryInviteLinkContentProps {
  categoryId: number;
  defaultInviteCode: string;
  createCategoryInviteLink: UseMutationResult<
    CreateCategoryInvitationLinkMutation,
    Error,
    number,
    unknown
  >;
}

const CategoryInviteLinkContent: React.FC<CategoryInviteLinkContentProps> = ({
  categoryId,
  defaultInviteCode,
  createCategoryInviteLink,
}) => {
  const [inviteCode, setInviteCode] = useState<string>(defaultInviteCode);
  return (
    <div>
      <p>{`${process.env.NEXT_PUBLIC_CLIENT_URL}/invite?code=${inviteCode}`}</p>
      <div className="text-xs text-gray-400 mt-2">
        * 초대링크는 1회용이며, 한 번 사용하면 만료됩니다.
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <Button
          onClick={async () => {
            const res = await createCategoryInviteLink.mutateAsync(categoryId);
            console.log(res.createCategoryInvitationLink.code);
            setInviteCode(() => res.createCategoryInvitationLink.code);
          }}
        >
          재생성
        </Button>
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_CLIENT_URL}/invite?code=${inviteCode}`
            );
            message.success('복사되었습니다.');
          }}
        >
          복사
        </Button>
        <Button
          onClick={() => {
            Modal.destroyAll();
          }}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default CategoryInviteLinkContent;
