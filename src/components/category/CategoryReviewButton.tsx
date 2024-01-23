import useCategoryEvaluation from '@lib/hooks/useCategoryEvaluation';
import {
  StarRateOutlined,
  StarRounded,
  StartOutlined,
} from '@mui/icons-material';
import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryReviewModal from './CategoryReviewModal';

const CategoryReviewButtonBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  .category-review-button-icon {
    cursor: pointer;
    color: ${palette.colorBorder};
  }
  .category-review-button-icon.active {
    color: ${palette.yellow_500} !important;
  }
  .category-review-score {
    font-size: 13px;
    font-weight: 700;
    color: ${palette.colorSubText};
  }
`;

interface CategoryReviewButtonProps {
  categoryId: number;
}

const CategoryReviewButton: React.FC<CategoryReviewButtonProps> = ({
  categoryId,
}) => {
  const [isCategoryReviewModalOpen, setIsCategoryReviewModalOpen] =
    useState(false);
  const { scoreAverage, scoreCount, myEvaluation, categoryEvaluations } =
    useCategoryEvaluation(categoryId);
  return (
    <>
      <CategoryReviewButtonBlock
        role="button"
        onClick={() => {
          setIsCategoryReviewModalOpen(true);
        }}
      >
        <StarRounded
          role="button"
          className="category-review-button-icon active"
        />
        <div className="category-review-score">{`${scoreAverage} (리뷰: ${scoreCount})`}</div>
      </CategoryReviewButtonBlock>
      {isCategoryReviewModalOpen && (
        <CategoryReviewModal
          open={isCategoryReviewModalOpen}
          onCancel={() => setIsCategoryReviewModalOpen(false)}
          categoryId={categoryId}
        />
      )}
    </>
  );
};

export default CategoryReviewButton;
