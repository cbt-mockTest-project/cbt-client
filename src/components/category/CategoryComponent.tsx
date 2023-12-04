import { FolderOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Checkbox } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MockExamCategory,
  ReadMockExamCategoryByCategoryIdOutput,
} from 'types';
import ExamList from './ExamList';
import ExamSelectModal from './ExamSelectModal';

const CategoryComponentBlock = styled.div`
  padding: 30px;
  .category-creator-info {
    display: flex;
    gap: 3px;
    align-items: flex-end;
  }
  .category-creator-name {
    font-size: 18px;
    font-weight: bold;
  }

  .category-creator-label {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_700};
  }
  .category-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    svg {
      font-size: 24px;
    }
  }
  .category-study-button {
    margin-top: 20px;
  }
  .category-exam-all-checkbox-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 17px;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;

interface CategoryComponentProps {
  category: MockExamCategory;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({ category }) => {
  const [selectedExamIds, setSelectedExamIds] = useState<number[]>([]);
  const [examSelectModalVisible, setExamSelectModalVisible] = useState(false);
  return (
    <CategoryComponentBlock>
      <div className="category-creator-info">
        <span className="category-creator-name">{category?.user.nickname}</span>
        <span className="category-creator-label">의 암기장</span>
      </div>
      <div className="category-info">
        <FolderOutlined />
        <span className="category-name">{category?.name}</span>
      </div>
      <Button
        className="category-study-button"
        type="primary"
        size="large"
        disabled={selectedExamIds.length === 0}
        onClick={() => setExamSelectModalVisible(true)}
      >
        학습하기
      </Button>
      <div className="category-exam-all-checkbox-wrapper">
        <Checkbox
          checked={category.mockExam.length === selectedExamIds.length}
          onClick={() => {
            if (category.mockExam.length === selectedExamIds.length)
              setSelectedExamIds([]);
            else setSelectedExamIds(category.mockExam.map((exam) => exam.id));
          }}
        />
        <span>전체 선택</span>
      </div>
      <ExamList
        category={category}
        selectedExamIds={selectedExamIds}
        setSelectedExamIds={setSelectedExamIds}
      />
      <ExamSelectModal
        examIds={selectedExamIds}
        open={examSelectModalVisible}
        onCancel={() => setExamSelectModalVisible(false)}
      />
    </CategoryComponentBlock>
  );
};

export default CategoryComponent;
