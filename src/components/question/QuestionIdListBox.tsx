import { useMeQuery } from '@lib/graphql/hook/useUser';
import useSearchQuestions from '@lib/hooks/useSearchQuestions';
import { Button, Input } from 'antd';
import React from 'react';
import { UserRole } from 'types';

interface QuestionIdListBoxProps {}

const QuestionIdListBox: React.FC<QuestionIdListBoxProps> = ({}) => {
  const { questions } = useSearchQuestions();
  const questionIds = questions?.map((question) => question.id) || [];
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
