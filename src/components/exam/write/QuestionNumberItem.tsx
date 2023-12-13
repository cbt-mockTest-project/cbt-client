import { useDeleteQuestion } from '@lib/graphql/hook/useExamQuestion';
import { handleError } from '@lib/utils/utils';
import { Button, Popconfirm, message } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { QuestionNumber } from 'types';

const QuestionNumberItemBlock = styled.li``;

interface QuestionNumberItemProps {
  number: number;
  id: number;
  setNumbers: React.Dispatch<React.SetStateAction<QuestionNumber[]>>;
}

const QuestionNumberItem: React.FC<QuestionNumberItemProps> = ({
  number,
  setNumbers,
  id,
}) => {
  const [deleteQuestion] = useDeleteQuestion();
  const router = useRouter();
  const handleEdit = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${id}/edit`,
      '_blank',
      'noopener,noreferrer'
    );
  };
  const handleDelete = async () => {
    try {
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteQuestion({
          variables: { input: { id } },
        });
        if (res.data?.deleteMockExamQuestion.ok) {
          message.success('삭제되었습니다.');
          setNumbers((prev) => prev.filter((item) => item.questionId !== id));
          return;
        }
        return message.error(res.data?.deleteMockExamQuestion.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <QuestionNumberItemBlock>
      <Popconfirm
        title=""
        icon={null}
        onConfirm={handleDelete}
        onCancel={handleEdit}
        okButtonProps={{
          style: { width: '70px', height: '30px' },
        }}
        cancelButtonProps={{
          style: { width: '70px', height: '30px' },
        }}
        okText="삭제"
        cancelText="수정"
      >
        <Button>{number}</Button>
      </Popconfirm>
    </QuestionNumberItemBlock>
  );
};

export default QuestionNumberItem;
