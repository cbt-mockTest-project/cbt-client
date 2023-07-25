import {
  useReadExamTitles,
  useReadMyExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, List, message, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyExamListItem from './MyExamListItem';
import { handleError } from '@lib/utils/utils';
import Portal from '@components/common/portal/Portal';
import ExamPreviewModal from '@components/common/modal/ExamPreviewModal';
import useToggle from '@lib/hooks/useToggle';
import Link from 'next/link';

interface MyExamComponentProps {}

const MyExamComponent: React.FC<MyExamComponentProps> = () => {
  const [readTitles, { data: examTitlesQuery }] = useReadExamTitles();
  const { value: previewModalState, onToggle: onToggleExamPreviewModal } =
    useToggle(false);
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
    try {
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
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <MyExamComponentContainer>
      <h3>내가만든 시험지 목록을 보여주는 페이지입니다.</h3>
      <Select
        size="large"
        options={categories}
        onSelect={(value, option) => requestCategorySelect(option)}
        placeholder="카테고리명을 선택해주세요"
        className="my-exam-category-selector"
      />
      <List
        className="my-exam-list"
        dataSource={examTitlesQuery?.readMockExamTitlesByCateory.titles}
        bordered
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div className="my-exam-list-item-wrapper">
              <div>{item.title}</div>
              <div className="my-exam-list-item-button-wrapper">
                <Button type="primary" onClick={onToggleExamPreviewModal}>
                  미리보기
                </Button>
                <Link
                  href={`/exam/write?cl=${selectedCategory?.label}&cv=${selectedCategory?.value}&ev=${item.id}&el=${item.title}`}
                >
                  <Button type="primary">수정하기</Button>
                </Link>
              </div>
            </div>
            <Portal>
              <ExamPreviewModal
                categoryName={
                  selectedCategory ? (selectedCategory.label as string) : ''
                }
                examId={item.id}
                examTitle={item.title}
                onClose={onToggleExamPreviewModal}
                open={previewModalState}
              />
            </Portal>
          </List.Item>
        )}
      />
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
  .my-exam-list {
    margin-top: 20px;
  }
  .my-exam-list-item-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .my-exam-list-item-button-wrapper {
    display: flex;
    gap: 10px;
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
