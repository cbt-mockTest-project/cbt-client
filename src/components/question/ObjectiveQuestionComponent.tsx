import ObjectiveStudyItem from '@components/study/objective/ObjectiveStudyItem';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ReadMockExamQuestionOutput } from 'types';

const ObjectiveQuestionComponentBlock = styled.div`
  padding: 16px 10px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color('colorBorder')};

  .objective-question-related-category-link {
    margin: 10px 20px;
    width: fit-content;
    display: block;
  }
`;

interface ObjectiveQuestionComponentProps {
  questionResponse: ReadMockExamQuestionOutput;
}

const ObjectiveQuestionComponent: React.FC<ObjectiveQuestionComponentProps> = ({
  questionResponse,
}) => {
  return (
    <ObjectiveQuestionComponentBlock>
      {questionResponse.categorySlug && (
        <Link
          href={`/mcq/category/${questionResponse.categorySlug}`}
          className="objective-question-related-category-link"
        >
          <Button size="large" type="primary">
            관련 암기장 보기
          </Button>
        </Link>
      )}
      <ObjectiveStudyItem
        question={questionResponse.mockExamQusetion}
        index={1}
        readOnly
        hasInteraction={false}
      />
    </ObjectiveQuestionComponentBlock>
  );
};

export default ObjectiveQuestionComponent;
