import { useMeQuery } from '../../_lib/graphql/hook/useUser';
import { Button, Input } from 'antd';
import React from 'react';
import { UserRole } from '../../types';

interface LinkedQuestionIdsBoxProps {
  currentQuestionId: number;
  defaultLinkedQuestionIds?: number[];
  onChange?: (linkedQuestionIds: number[]) => void;
}

const LinkedQuestionIdsBox: React.FC<LinkedQuestionIdsBoxProps> = ({
  currentQuestionId,
  defaultLinkedQuestionIds,
  onChange,
}) => {
  const { data: meQuery } = useMeQuery();
  if (meQuery?.me?.user?.role !== UserRole.Admin) {
    return null;
  }

  return (
    <div className="px-2 flex w-full gap-[2px] flex-col mb-4">
      <Button
        type="primary"
        className="w-fit"
        onClick={() =>
          navigator.clipboard.writeText(currentQuestionId.toString())
        }
      >
        {currentQuestionId}
      </Button>
      {defaultLinkedQuestionIds && (
        <div className="text-sm text-gray-700">LINKED QUESTION IDS:</div>
      )}
      {defaultLinkedQuestionIds && (
        <Input
          defaultValue={defaultLinkedQuestionIds?.join(',')}
          onChange={(e) => {
            onChange?.(e.target.value.split(',').map((el) => parseInt(el)));
          }}
        />
      )}
    </div>
  );
};

export default LinkedQuestionIdsBox;
