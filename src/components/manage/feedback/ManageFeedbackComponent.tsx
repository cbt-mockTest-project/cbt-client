import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Input, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetExamTitleWithFeedback } from '@lib/graphql/user/hook/useQuestionFeedback';
import useInput from '@lib/hooks/useInput';
('@lib/graphql/user/hook/useQuestionFeedback');

interface ManageFeedbackComponentProps {}

const ManageFeedbackComponent: React.FC<ManageFeedbackComponentProps> = () => {
  const { data: examTitlesQuery } = useGetExamTitleWithFeedback();
  const [examTitles, setExamTitles] = useState<DefaultOptionType[]>([]);
  const [selectedExamTitle, setSelectedExamTitle] = useState<number>(0);
  const { value: likeCount, onChange: onChangeLikeCount } = useInput('0');
  const { value: dislikeCount, onChange: onChangeDislikeCount } = useInput('0');
  const onSearchFeedback = () => {
    console.log(selectedExamTitle, likeCount, dislikeCount);
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

  return (
    <ManageFeedbackComponentContainer>
      <h3>유저의 피드백을 보여주는 페이지입니다.</h3>
      <Select
        options={examTitles}
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
              onChange={onChangeLikeCount}
            />
            <span>이상,</span>
          </div>
          <div>
            <span>싫어요</span>
            <Input
              type="number"
              className="manage-feedback-filter-like-count-input"
              onChange={onChangeDislikeCount}
            />
            <span>이상</span>
          </div>
        </div>
        <Button
          className="manage-feedback-filter-like-count-search-button"
          type="primary"
          onClick={onSearchFeedback}
        >
          검색하기
        </Button>
      </div>
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
