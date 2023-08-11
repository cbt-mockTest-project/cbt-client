import ExamPreviewModal from '@components/common/modal/ExamPreviewModal';
import Portal from '@components/common/portal/Portal';
import useToggle from '@lib/hooks/useToggle';
import { Button, Input, List } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExamTitleAndId } from 'types';

interface MyExamListItemProps {
  selectedCategory: DefaultOptionType | null;
  selectedExam: ExamTitleAndId;
  onChangeOrder: ({ order, examId }: { order: number; examId: number }) => void;
}

const MyExamListItem: React.FC<MyExamListItemProps> = ({
  selectedCategory,
  selectedExam,
  onChangeOrder,
}) => {
  const { value: previewModalState, onToggle: onToggleExamPreviewModal } =
    useToggle(false);
  const [order, setOrder] = useState<number>(selectedExam.order);
  useEffect(() => {
    onChangeOrder({ order, examId: selectedExam.id });
  }, [order]);

  const onChangeOrderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 값이 숫자가 아니면 0
    if (isNaN(parseInt(e.target.value))) {
      setOrder(0);
      return;
    }
    setOrder(parseInt(e.target.value));
  };
  return (
    <MyExamListItemContainer>
      <div className="my-exam-list-item-wrapper">
        <div>{selectedExam.title}</div>
        <div className="my-exam-list-item-button-wrapper">
          <Button type="primary" onClick={onToggleExamPreviewModal}>
            미리보기
          </Button>
          <Link
            href={`/exam/write?cl=${selectedCategory?.label}&cv=${selectedCategory?.value}&ev=${selectedExam.id}&el=${selectedExam.title}`}
          >
            <Button type="primary">수정하기</Button>
          </Link>
          <Input
            className="my-exam-list-item-order-input"
            type="number"
            width={20}
            value={order}
            onChange={onChangeOrderInput}
            placeholder="순서"
          />
        </div>
      </div>
      <Portal>
        <ExamPreviewModal
          categoryName={
            selectedCategory ? (selectedCategory.label as string) : ''
          }
          examId={selectedExam.id}
          examTitle={selectedExam.title}
          onClose={onToggleExamPreviewModal}
          open={previewModalState}
        />
      </Portal>
    </MyExamListItemContainer>
  );
};

export default MyExamListItem;

const MyExamListItemContainer = styled(List.Item)`
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
  .my-exam-list-item-order-input {
    width: 60px;
  }
`;
