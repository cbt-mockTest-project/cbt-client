import {
  useReadExamTitles,
  useReadMyExamCategories,
  useUpdateExamOrder,
} from '@lib/graphql/hook/useExam';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, List, App, Select, Tooltip } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { handleError } from '@lib/utils/utils';
import Portal from '@components/common/portal/Portal';
import useToggle from '@lib/hooks/useToggle';
import TooltipIconSVG from '@assets/svg/icon-noti-tooltip-question.svg';
import MyExamInviteModal from './MyExamInviteModal';
import { ExamTitleAndId } from 'types';
import { isEqual } from 'lodash';
import MyExamListItem from './MyExamListItem';

interface MyExamComponentProps {}

const MyExamComponent: React.FC<MyExamComponentProps> = () => {
  const { message } = App.useApp();
  const [readTitles] = useReadExamTitles();
  const [updateExamOrder] = useUpdateExamOrder();
  const { value: inviteModalState, onToggle: onToggleInviteModal } =
    useToggle(false);
  const { data: categoriesQuery } = useReadMyExamCategories();
  const [selectedCategory, setSelectedCategory] =
    useState<DefaultOptionType | null>(null);
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<ExamTitleAndId[]>([]);
  const [orderChangedTitles, setOrderChangedTitles] = useState<
    ExamTitleAndId[]
  >([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);
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
        setTitles(res.data.readMockExamTitlesByCateory.titles);
        setOrderChangedTitles(res.data.readMockExamTitlesByCateory.titles);
        return;
      }
      if (res.data?.readMockExamTitlesByCateory.error) {
        message.error(res.data?.readMockExamTitlesByCateory.error);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleOrderChange = (data: { order: number; examId: number }) => {
    const newOrderChangedTitles = orderChangedTitles.map((title) =>
      title.id === data.examId ? { ...title, order: data.order } : title
    );
    setOrderChangedTitles(newOrderChangedTitles);
    setOrderChanged(!isEqual(newOrderChangedTitles, titles));
  };

  const handleOrderSave = async () => {
    const res = await updateExamOrder({
      variables: {
        input: {
          examOrders: orderChangedTitles.map((title) => ({
            examId: title.id,
            order: title.order,
          })),
        },
      },
    });
    if (res.data?.updateExamOrder.ok) {
      setTitles(orderChangedTitles.sort((a, b) => a.order - b.order));
      setOrderChanged(false);
      return message.success('순서가 저장되었습니다.');
    }
    message.error(res.data?.updateExamOrder.error);
  };

  return (
    <MyExamComponentContainer>
      <h3>내가만든 시험지 목록을 보여주는 페이지입니다.</h3>
      <div className="my-exam-invite-button-wrapper">
        <Button type="primary" size="large" onClick={onToggleInviteModal}>
          초대하기
        </Button>
        <Tooltip title="내가 만든 시험지를 다른 사람이 볼 수 있도록 초대합니다.">
          <TooltipIconSVG />
        </Tooltip>
      </div>
      <div className="my-exam-select-and-order-save-button-wrapper">
        <Select
          size="large"
          options={categories}
          onSelect={(value, option) => requestCategorySelect(option)}
          placeholder="카테고리명을 선택해주세요"
          className="my-exam-category-selector"
        />
        <Button
          type="primary"
          size="large"
          disabled={!orderChanged}
          onClick={handleOrderSave}
        >
          순서저장
        </Button>
      </div>
      <List
        className="my-exam-list"
        dataSource={titles}
        bordered
        renderItem={(item) => (
          <MyExamListItem
            key={item.id}
            selectedCategory={selectedCategory}
            selectedExam={item}
            onChangeOrder={handleOrderChange}
          />
        )}
      />
      <Portal>
        <MyExamInviteModal
          categories={categories}
          open={inviteModalState}
          onClose={onToggleInviteModal}
        />
      </Portal>
    </MyExamComponentContainer>
  );
};

export default MyExamComponent;

const MyExamComponentContainer = styled.div`
  .my-exam-select-and-order-save-button-wrapper {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
  .my-exam-list-menu-wrapper {
    padding: 10px 0;
    border-bottom: 1px solid ${palette.gray_200};
  }
  .my-exam-category-selector {
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
  .my-exam-invite-button-wrapper {
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      width: 300px;
    }
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
