import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Checkbox, Col, Input, List, Row, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useGetExamTitleWithFeedback,
  useLazyGetFeedbacksWithFilter,
} from '@lib/graphql/user/hook/useQuestionFeedback';
import useInput from '@lib/hooks/useInput';
import { format, parseISO } from 'date-fns';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import { FEEDBACK_TYPES, FEEDBACK_TYPE_MAP } from './ManageFeedback.constants';
import { QuestionFeedbackType } from 'types';
('@lib/graphql/user/hook/useQuestionFeedback');

interface ManageFeedbackComponentProps {}

const ManageFeedbackComponent: React.FC<ManageFeedbackComponentProps> = () => {
  const { data: examTitlesQuery } = useGetExamTitleWithFeedback();
  const [examTitles, setExamTitles] = useState<DefaultOptionType[]>([]);
  const [selectedExamTitle, setSelectedExamTitle] = useState<number>(0);
  const [checkedTypes, setCheckedTypes] = useState<QuestionFeedbackType[]>([]);
  const { value: goodCount, onChange: onChangeGoodCount } = useInput('0');
  const { value: badCount, onChange: onChangeBadCount } = useInput('0');
  const [getFeedbacks, { data: feedbacks, loading: getFeedbacksLoading }] =
    useLazyGetFeedbacksWithFilter();
  const onSearchFeedback = async () => {
    await getFeedbacks({
      variables: {
        input: {
          examId: selectedExamTitle,
          goodCount: Number(goodCount),
          badCount: Number(badCount),
          types: checkedTypes,
        },
      },
    });
  };
  useEffect(() => {
    if (examTitlesQuery && examTitlesQuery.getExamTitleWithFeedback) {
      const newExamTitles = examTitlesQuery.getExamTitleWithFeedback.titles.map(
        (title) => ({
          label: title.title,
          value: title.id,
        })
      );
      newExamTitles.unshift({
        label: '전체',
        value: 0,
      });
      setExamTitles(newExamTitles);
    }
  }, [examTitlesQuery]);
  if (!examTitlesQuery) return null;

  return (
    <ManageFeedbackComponentContainer>
      <h3>유저의 피드백을 보여주는 페이지입니다.</h3>
      <Select
        options={examTitles}
        defaultValue={0}
        onSelect={(value) => setSelectedExamTitle(value)}
        placeholder="시험을 선택해주세요"
        className="manage-feedback-category-selector"
      />
      <div className="manage-feedback-filter-wrapper">
        <div className="manage-feedback-filter-like-count-wrapper">
          <div>
            <span>좋아요</span>
            <Input
              type="number"
              className="manage-feedback-filter-like-count-input"
              defaultValue={0}
              onChange={onChangeGoodCount}
            />
            <span>이상,</span>
          </div>
          <div>
            <span>싫어요</span>
            <Input
              type="number"
              className="manage-feedback-filter-like-count-input"
              defaultValue={0}
              onChange={onChangeBadCount}
            />
            <span>이상</span>
          </div>
        </div>
        <div className="manage-feedback-filter-type-checkbox-wrapper">
          <Checkbox
            checked={checkedTypes.length === 0}
            onClick={() => {
              if (checkedTypes.length === 0) return;
              setCheckedTypes([]);
            }}
          >
            전체
          </Checkbox>
          <Checkbox.Group
            options={FEEDBACK_TYPES}
            value={checkedTypes}
            onChange={(value) => {
              setCheckedTypes(value as QuestionFeedbackType[]);
            }}
          />
        </div>
        <Button
          className="manage-feedback-filter-like-count-search-button"
          type="primary"
          onClick={onSearchFeedback}
        >
          검색하기
        </Button>
      </div>
      {getFeedbacksLoading && (
        <div className="feedback-list-loading">
          {[1, 2, 3, 4, 5].map((item) => (
            <SkeletonBox key={item} width="100%" height="30px" />
          ))}
        </div>
      )}

      {feedbacks?.getFeedbacksWithFilter.feedbacks && (
        <List
          header={
            <Row className="feedback-list-item-head-row" gutter={30}>
              <Col className="feedback-list-item-head-col" span={3}>
                작성자
              </Col>
              <Col className="feedback-list-item-head-col" span={12}>
                내용
              </Col>
              <Col className="feedback-list-item-head-col" span={2}>
                좋아요
              </Col>
              <Col className="feedback-list-item-head-col" span={2}>
                싫어요
              </Col>
              <Col className="feedback-list-item-head-col" span={2}>
                타입
              </Col>
              <Col className="feedback-list-item-head-col" span={2}>
                시간
              </Col>
            </Row>
          }
          dataSource={feedbacks.getFeedbacksWithFilter.feedbacks}
          renderItem={(item) => (
            <List.Item className="feedback-list-item">
              <a
                target="_blank"
                rel="noreferrer"
                className="feedback-list-item-row-anchor"
                href={`/question/${item.mockExamQuestion.id}`}
              >
                <Row className="feedback-list-item-row" gutter={30}>
                  <Col className="feedback-list-item-col" span={3}>
                    {item.user.nickname}
                  </Col>
                  <Col className="feedback-list-item-col" span={12}>
                    {item.content}
                  </Col>
                  <Col className="feedback-list-item-col" span={2}>
                    {item.recommendationCount.good}
                  </Col>
                  <Col className="feedback-list-item-col" span={2}>
                    {item.recommendationCount.bad}
                  </Col>
                  <Col className="feedback-list-item-col" span={2}>
                    {FEEDBACK_TYPE_MAP[item.type]}
                  </Col>
                  <Col className="feedback-list-item-col" span={3}>
                    {format(parseISO(item.created_at), 'yy.MM.dd HH:mm')}
                  </Col>
                </Row>
              </a>
            </List.Item>
          )}
        />
      )}
    </ManageFeedbackComponentContainer>
  );
};

export default ManageFeedbackComponent;

const ManageFeedbackComponentContainer = styled.div`
  .manage-feedback-list-menu-wrapper {
    padding: 10px 0;
    border-bottom: 1px solid ${palette.gray_200};
  }
  .manage-feedback-category-selector {
    margin-top: 20px;
    width: 300px;
  }
  .manage-feedback-list {
    display: flex;
    flex-direction: column;
  }
  .manage-feedback-list-menu-wrapper {
    display: flex;
    align-items: center;
  }
  .manage-feedback-list-menu-title {
    flex: 7;
  }
  .manage-feedback-list-menu-label-wrapper {
    flex: 3;
    min-width: 150px;
  }
  .manage-feedback-item-title {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .manage-feedback-list-menu-label-wrapper {
    padding-left: 10px;
    border-left: 1px solid ${palette.gray_200};
    margin-left: 20px;
  }
  .manage-feedback-item-status {
    width: 50px;
    text-align: left;
  }
  .manage-feedback-item-status-and-button-wrapper {
    text-align: right;
    display: flex;
    align-items: center;
    gap: 20px;
    padding-left: 10px;
    border-left: 1px solid ${palette.gray_200};
  }
  .manage-feedback-filter-wrapper {
    margin-top: 20px;
  }
  .manage-feedback-label {
    font-weight: bold;
    color: ${palette.gray_700};
  }
  .manage-feedback-filter-like-count-input {
    width: 65px;
    margin: 0 10px;
  }
  .manage-feedback-filter-like-count-wrapper {
    display: flex;
    margin-top: 10px;
    gap: 10px;
  }
  .manage-feedback-filter-like-count-search-button {
    width: 100%;
    height: 40px;
    max-width: 150px;
    margin-top: 20px;
  }
  .ant-list-header {
    padding: 0;
  }
  .feedback-list-item-head-row,
  .feedback-list-loading {
    margin-top: 20px;
    width: 100%;
  }
  .feedback-list-loading {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .feedback-list-item-row {
    width: 100%;
  }
  .feedback-list-item-head-col {
    /* text-align: center; */
    padding: 12px 0;
  }
  .feedback-list-item-head-col:not(:last-child),
  .feedback-list-item-col:not(:last-child) {
    border-right: 1px solid ${palette.gray_200};
  }
  .manage-feedback-filter-type-checkbox-wrapper {
    margin-top: 20px;
  }
  .feedback-list-item {
    padding: 0;
  }
  .feedback-list-item-row-anchor {
    width: 100%;
    padding: 12px 0;
    :hover {
      background-color: ${palette.gray_100};
    }
  }
  .feedback-list-item {
  }
  @media (max-width: ${responsive.medium}) {
    margin-top: 20px;
    padding: 0 20px;
  }
  @media (max-width: ${responsive.small}) {
    .manage-feedback-list-menu-label-wrapper {
      flex: 7;
    }
  }
`;
