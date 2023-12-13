import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import useExamCategory from '@lib/hooks/useExamCategory';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';

const EditExamItemBlock = styled(BasicCard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

interface EditExamItemProps {
  exam: MockExam;
}

const EditExamItem: React.FC<EditExamItemProps> = ({ exam }) => {
  const { category, handleRemoveExamFromCategory, handleAddExamToCategory } =
    useExamCategory();
  const isAdded = category?.mockExam?.find((e) => e.id === exam.id);
  return (
    <EditExamItemBlock>
      <p>{exam.title}</p>
      {isAdded ? (
        <Button
          type="primary"
          onClick={() => handleRemoveExamFromCategory(exam.id)}
        >
          <MinusOutlined />
        </Button>
      ) : (
        <Button onClick={() => handleAddExamToCategory(exam.id)}>
          <PlusOutlined />
        </Button>
      )}
    </EditExamItemBlock>
  );
};

export default EditExamItem;
