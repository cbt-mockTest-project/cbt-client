import ExamPreviewModal from '@components/common/modal/ExamPreviewModal';
import Portal from '@components/common/portal/Portal';
import {
  useReadExamTitles,
  useReadMyExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { responsive } from '@lib/utils/responsive';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, message, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyExamListItem from './MyExamListItem';

interface MyExamComponentProps {}

const MyExamComponent: React.FC<MyExamComponentProps> = () => {
  const [readTitles, { data: examTitlesQuery }] = useReadExamTitles();
  const { data: categoriesQuery } = useReadMyExamCategories();
  const [selectedCategory, setSelectedCategory] =
    useState<DefaultOptionType | null>(null);
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
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
    setSelectedCategory(category);
    const res = await readTitles({
      variables: { input: { name: category.label as string, all: true } },
    });
    if (res.data?.readMockExamTitlesByCateory.ok) {
      setTitles(() =>
        res.data
          ? res.data.readMockExamTitlesByCateory.titles.map((title) => ({
              value: title.id,
              label: title.title,
            }))
          : []
      );
      return;
    }
    message.error(res.data?.readMockExamTitlesByCateory.error);
  };
  const tryCategorySelect = (category: DefaultOptionType) =>
    convertWithErrorHandlingFunc({
      callback: () => requestCategorySelect(category),
    });

  return (
    <MyExamComponentContainer>
      <h3>내가만든 시험지 목록을 보여주는 페이지입니다.</h3>
      <Select
        options={categories}
        onSelect={(value, option) => tryCategorySelect(option)()}
        placeholder="카테고리명을 선택해주세요"
        className="my-exam-category-selector"
      />
      {examTitlesQuery?.readMockExamTitlesByCateory.ok && (
        <>
          <div className="my-exam-list-menu-wrapper">
            <p className="my-exam-list-menu-title">시험명</p>
            <div className="my-exam-list-menu-label-wrapper">
              <label>상태</label>
              <label></label>
            </div>
          </div>
          <ul className="my-exam-list">
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
    </MyExamComponentContainer>
  );
};

export default MyExamComponent;

const MyExamComponentContainer = styled.div`
  .my-exam-list-menu-wrapper {
    padding: 10px 0;
    border-bottom: 1px solid ${palette.gray_200};
  }
  .my-exam-category-selector {
    margin-top: 20px;
    width: 300px;
  }
  .my-exam-list {
    display: flex;
    flex-direction: column;
  }
  .my-exam-list-menu-wrapper {
    display: flex;
    align-items: center;
  }
  .my-exam-list-menu-title {
    flex: 7;
  }
  .my-exam-list-menu-label-wrapper {
    flex: 3;
    min-width: 150px;
  }
  .my-exam-item-title {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .my-exam-list-menu-label-wrapper {
    padding-left: 10px;
    border-left: 1px solid ${palette.gray_200};
    margin-left: 20px;
  }
  .my-exam-item-status {
    width: 50px;
    text-align: left;
  }
  .my-exam-item-status-and-button-wrapper {
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
    .my-exam-list-menu-label-wrapper {
      flex: 7;
    }
  }
`;
