import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MockExam, MockExamCategory } from 'types';
import { queryClient } from '../../../pages/_app';
import { useRouter } from 'next/router';
import { getCategoryKey } from '@lib/queryOptions/getCategoryQueryOption';
import useCatgegoryExams from './hooks/useCategoryExamList';
import { useAppSelector } from '@modules/redux/store/configureStore';

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
  const router = useRouter();
  const urlSlug = router.query.name as string;
  const { handleRemoveExamFromCategory, handleAddExamToCategory } =
    useCatgegoryExams();
  const category = queryClient.getQueryData<MockExamCategory>(
    getCategoryKey(urlSlug)
  );
  const isAdded = useAppSelector((state) => {
    return state.examCategory.originalCategoryExams.find(
      (e) => e.id === exam.id
    );
  });

  return (
    <EditExamItemBlock>
      <p>{exam.title}</p>
      {isAdded ? (
        <Button
          type="primary"
          onClick={() =>
            handleRemoveExamFromCategory({
              examId: exam.id,
              categoryId: category.id,
            })
          }
        >
          <MinusOutlined />
        </Button>
      ) : (
        <Button
          onClick={() =>
            handleAddExamToCategory({
              examId: exam.id,
              categoryId: category.id,
            })
          }
        >
          <PlusOutlined />
        </Button>
      )}
    </EditExamItemBlock>
  );
};

export default EditExamItem;
