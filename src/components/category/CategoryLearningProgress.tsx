import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useLazyGetExamCategoryLearningProgress } from '@lib/graphql/hook/useExam';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Progress, Tooltip } from 'antd';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

const CategoryLearningProgressBlock = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  .ant-progress.ant-progress-status-normal {
    margin-bottom: 0;
    margin-right: 0;
    width: 300px;
  }
  .category-learning-progress-label {
    font-size: 14px;
    width: fit-content;
    width: 50px;
    color: ${palette.colorSubText};
  }
  .ant-progress-text {
    font-size: 12px !important;
    color: ${palette.colorSubText} !important;
  }
  .category-learning-progress-help-icon-tooltip {
    .ant-tooltip-content {
      .ant-tooltip-inner {
        font-size: 12px !important;
        max-width: 300px !important;
        white-space: pre-wrap !important;
      }
    }
  }

  .category-learning-progress-help-icon {
    width: 18px;
    height: 18px;
    svg {
      font-size: 18px;
    }
  }
  @media (max-width: ${responsive.small}) {
    .ant-progress.ant-progress-status-normal {
      width: 200px;
    }
  }
`;

interface CategoryLearningProgressProps {
  categoryId: number;
}

const CategoryLearningProgress: React.FC<CategoryLearningProgressProps> = ({
  categoryId,
}) => {
  const { data: meQuery } = useMeQuery();
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
      learningProgress: Math.round((highScoreCount / totalQuestionCount) * 100),
      highScoreCount,
      lowScoreCount,
      totalQuestionCount,
    };
  }, [categoryLearningProgressResponse]);

  useEffect(() => {
    if (!meQuery) return;
    if (meQuery.me.user) {
      getExamCategoryLearningProgress({
        variables: {
          input: {
            categoryId,
          },
        },
      });
    }
  }, [meQuery]);

  return (
    <CategoryLearningProgressBlock>
      <div className="category-learning-progress-label">학습률</div>
      <Progress
        percent={
          categoryLearningProgress
            ? categoryLearningProgress.learningProgress
            : 0
        }
        format={(percent) =>
          categoryLearningProgress
            ? `${percent}% (${categoryLearningProgress?.highScoreCount}/${categoryLearningProgress?.totalQuestionCount})`
            : `${percent}%`
        }
      />
      {categoryLearningProgress && (
        <Tooltip
          className="category-learning-progress-help-icon-tooltip"
          title={`학습률 = (맞춘 문제 수 / 전체 문제 수) * 100\n맞춘 문제 수: ${
            categoryLearningProgress?.highScoreCount || 0
          }\n틀린 문제 수: ${
            categoryLearningProgress?.lowScoreCount || 0
          }\n전체 문제 수: ${
            categoryLearningProgress?.totalQuestionCount || 0
          }`}
          placement="bottomRight"
        >
          <button className="category-learning-progress-help-icon">
            <HelpOutlineIcon />
          </button>
        </Tooltip>
      )}
    </CategoryLearningProgressBlock>
  );
};

export default CategoryLearningProgress;
