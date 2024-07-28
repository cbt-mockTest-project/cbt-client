import { useLazyGetFeedbacksWithFilter } from '@lib/graphql/hook/useQuestionFeedback';
import { Button, Checkbox, Input, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { QuestionFeedbackType } from 'types';
import Link from 'next/link';

const FeedbackFilterComponentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  .feedback-filter-good-count,
  .feedback-filter-bad-count {
    max-width: 300px;
  }
  .feedback-filter-good-count-title,
  .feedback-filter-bad-count-title {
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  .feedback-filter-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .feedback-filter-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 20px;
      border-bottom: 1px solid ${({ theme }) => theme.color('colorBorder')};
      .feedback-filter-item-count {
        display: flex;
        gap: 10px;
        background-color: ${({ theme }) => theme.color('colorSplit')};
        padding: 10px;
        border-radius: 5px;
      }
    }
  }
`;

interface FeedbackFilterComponentProps {}

const FeedbackFilterComponent: React.FC<FeedbackFilterComponentProps> = () => {
  const router = useRouter();
  const categoryId = router.query.categoryId as string;
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [types, setTypes] = useState<QuestionFeedbackType[]>([]);
  const [getFeedbacksWithFilter, { data: feedbacks }] =
    useLazyGetFeedbacksWithFilter();
  const handleSubmit = () => {
    getFeedbacksWithFilter({
      variables: {
        input: {
          categoryId: Number(categoryId),
          goodCount,
          badCount,
          types,
        },
      },
    });
  };
  return (
    <FeedbackFilterComponentBlock>
      <div className="feedback-filter-good-count">
        <div className="feedback-filter-good-count-title">좋아요 n개 이상</div>
        <Input
          type="number"
          value={goodCount}
          onChange={(e) => setGoodCount(Number(e.target.value))}
        />
      </div>
      <div className="feedback-filter-bad-count">
        <div className="feedback-filter-bad-count-title">싫어요 n개 이상</div>
        <Input
          type="number"
          value={badCount}
          onChange={(e) => setBadCount(Number(e.target.value))}
        />
      </div>
      <Checkbox.Group
        onChange={setTypes}
        options={[
          { label: '공개', value: QuestionFeedbackType.Public },
          { label: '비공개', value: QuestionFeedbackType.Private },
          { label: '오류', value: QuestionFeedbackType.Report },
        ]}
      />
      <Button type="primary" onClick={handleSubmit}>
        검색
      </Button>
      <div className="feedback-filter-list">
        {feedbacks?.getFeedbacksWithFilter.feedbacks.map((feedback) => (
          <div className="feedback-filter-item" key={feedback.id}>
            <Tag
              color={
                feedback.type === QuestionFeedbackType.Public
                  ? 'blue'
                  : feedback.type === QuestionFeedbackType.Private
                  ? 'orange'
                  : 'red'
              }
            >
              {feedback.type}
            </Tag>
            <div className="feedback-filter-item-count">
              <div>좋아요: {feedback.recommendationCount.good}개</div>
              <div>싫어요: {feedback.recommendationCount.bad}개</div>
            </div>
            <div>{parse(feedback.content)}</div>
            <Link
              href={`/question/${feedback.mockExamQuestion.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="primary">문제 보기</Button>
            </Link>
          </div>
        ))}
      </div>
    </FeedbackFilterComponentBlock>
  );
};

export default FeedbackFilterComponent;
