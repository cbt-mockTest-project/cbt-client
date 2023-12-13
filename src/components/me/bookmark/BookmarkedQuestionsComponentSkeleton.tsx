import { RoundCheckboxGroupOnChangeValueType } from '@components/common/checkbox/RoundCheckboxGroup';
import { useReadExamTitleAndIdOfBookmarkedQuestion } from '@lib/graphql/hook/useQuestionBookmark';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/hook/useExamQuestion';
import { checkboxOption } from 'customTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { Button, Select } from 'antd';
import { responsive } from '@lib/utils/responsive';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import ExamSolutionListSkeleton from '@components/exam/solution/ExamSolutionListSkeleton';

interface BookmarkedQuestionsComponentSkeletonProps {}

const BookmarkedQuestionsComponentSkeleton: React.FC<
  BookmarkedQuestionsComponentSkeletonProps
> = () => {
  return (
    <BookmarkedQuestionsComponentSkeletonBlock>
      <SkeletonBox width="300px" height="30px" />
      <div>
        <SkeletonBox
          className="bookmark-question-solution-all-hide-button"
          width="130px"
          height="32px"
        />
      </div>
      {[1, 2, 3, 4, 5].map((el) => (
        <ExamSolutionListSkeleton key={el} />
      ))}
    </BookmarkedQuestionsComponentSkeletonBlock>
  );
};

export default BookmarkedQuestionsComponentSkeleton;
const BookmarkedQuestionsComponentSkeletonBlock = styled.div`
  .bookmark-question-exam-title-select {
    width: 300px;
  }
  .bookmark-question-solution-all-hide-button {
    margin-top: 20px;
    margin-bottom: -10px;
  }
  margin-bottom: 20px;
  padding: 0 15px;
  li {
    list-style: none;
  }
  @media (max-width: ${responsive.medium}) {
    padding-top: 20px;
  }
`;
