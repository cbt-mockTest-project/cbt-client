import {
  useReadExamTitles,
  useReadMyExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { message, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyExamListItem from './ManageFeedbackListItem';
import { handleError } from '@lib/utils/utils';

interface ManageFeedbackComponentProps {}

const ManageFeedbackComponent: React.FC<ManageFeedbackComponentProps> = () => {
  const [readTitles, { data: examTitlesQuery }] = useReadExamTitles();
  const { data: categoriesQuery } = useReadMyExamCategories();
  const [selectedCategory, setSelectedCategory] =
    useState<DefaultOptionType | null>(null);
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  useEffect(() => {
    if (categoriesQuery && categoriesQuery.readMyMockExamCategories) {
      setCategories(() =>
        categoriesQuery?.readMyMockExamCategories.categories.map(
          (category) => ({
            label: category.name,
            value: category.id,
          })
        )
      );
    }
  }, [categoriesQuery]);

  const requestCategorySelect = async (category: DefaultOptionType) => {
    try {
      setSelectedCategory(category);
      const res = await readTitles({
        variables: { input: { name: category.label as string, all: true } },
      });
      if (res.data?.readMockExamTitlesByCateory.ok) {
        return;
      }
      message.error(res.data?.readMockExamTitlesByCateory.error);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <ManageFeedbackComponentContainer>
      <h3>유저의 피드백을 보여주는 페이지입니다.</h3>
      <Select
        options={categories}
        onSelect={(value, option) => requestCategorySelect(option)}
        placeholder="카테고리명을 선택해주세요"
        className="manage-feedback-category-selector"
      />
      {examTitlesQuery?.readMockExamTitlesByCateory.ok && (
        <>
          <div className="manage-feedback-list-menu-wrapper">
            <p className="manage-feedback-list-menu-title">시험명</p>
            <div className="manage-feedback-list-menu-label-wrapper">
              <label>상태</label>
              <label></label>
            </div>
          </div>
          <ul className="manage-feedback-list">
            {examTitlesQuery?.readMockExamTitlesByCateory.titles.map((item) => (
              <MyExamListItem
                key={item.id}
                selectedCategory={selectedCategory}
                item={item}
              />
            ))}
          </ul>
        </>
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
