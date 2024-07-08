import { useMeQuery } from '../../_lib/graphql/hook/useUser';
import { Button, Input } from 'antd';
import React from 'react';
import { UserRole } from '../../types';

interface QuestionIdListBoxProps {
  questionIds: number[];
}

const QuestionIdListBox: React.FC<QuestionIdListBoxProps> = ({
  questionIds,
}) => {
  const { data: meQuery } = useMeQuery();
  if (meQuery?.me?.user?.role !== UserRole.Admin) {
    return null;
  }

  return (
    <div className="w-fit mt-4">
      <Button
        onClick={() => {
          navigator.clipboard.writeText(questionIds?.join(','));
        }}
      >
        {questionIds?.join(',')}
      </Button>
    </div>
  );
};

export default QuestionIdListBox;
