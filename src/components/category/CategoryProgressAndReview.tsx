import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CategoryLearningProgress from './CategoryLearningProgress';
import CategoryReviewButton from './CategoryReviewButton';
import { useLazyGetExamCategoryLearningProgress } from '@lib/graphql/hook/useExam';
import useAuth from '@lib/hooks/useAuth';
import { useAppSelector } from '@modules/redux/store/configureStore';

const CategoryProgressAndReviewBlock = styled.div``;

interface CategoryProgressAndReviewProps {
  categoryId: number;
}

const CategoryProgressAndReview: React.FC<CategoryProgressAndReviewProps> = ({
  categoryId,
}) => {
  const { user } = useAuth();
  const [
    getExamCategoryLearningProgress,
    { data: categoryLearningProgressResponse },
  ] = useLazyGetExamCategoryLearningProgress();
  const categoryLearningProgress = useMemo(() => {
    if (!categoryLearningProgressResponse) return null;
    const {
      getExamCategoryLearningProgress: {
        highScoreCount,
        lowScoreCount,
        totalQuestionCount,
      },
    } = categoryLearningProgressResponse;
    return {
      learningProgress: Math.round(
        (Number(highScoreCount) / Number(totalQuestionCount)) * 100
      ),
      highScoreCount: Number(highScoreCount),
      lowScoreCount: Number(lowScoreCount),
      totalQuestionCount: Number(totalQuestionCount),
    };
  }, [categoryLearningProgressResponse]);

  useEffect(() => {
    if (!user) return;
    getExamCategoryLearningProgress({
      variables: {
        input: {
          categoryId,
        },
      },
    });
  }, [user]);

  return (
    <CategoryProgressAndReviewBlock>
      <CategoryLearningProgress
        categoryLearningProgress={categoryLearningProgress}
      />
      <CategoryReviewButton categoryId={categoryId} />
    </CategoryProgressAndReviewBlock>
  );
};

export default CategoryProgressAndReview;
