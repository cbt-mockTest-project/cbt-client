import ExamPreviewModal from '@components/common/modal/ExamPreviewModal';
import Portal from '@components/common/portal/Portal';
import useToggle from '@lib/hooks/useToggle';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React from 'react';
import styled from 'styled-components';
import { ExamStatus, ExamTitleAndId } from 'types';

interface MyExamListItemProps {
  selectedCategory: DefaultOptionType | null;
  item: ExamTitleAndId;
}

const MyExamListItem: React.FC<MyExamListItemProps> = ({
  selectedCategory,
  item,
}) => {
  const { value: previewModalState, onToggle: onToggleExamPreviewModal } =
    useToggle(false);
  let statusLabel = '...';
  switch (item.status) {
    case ExamStatus.Approved:
      statusLabel = '승인됨';
      break;
    case ExamStatus.Rejected:
      statusLabel = '거절됨';
      break;
    case ExamStatus.Unset:
      statusLabel = '제작중';
      break;
    case ExamStatus.Request:
      statusLabel = '승인대기';
      break;
    default:
      break;
  }
  return (
    <MyExamListItemContainer>
      <p className="my-exam-item-title">
        <a
          href={`/exam/write?cl=${selectedCategory?.label}&cv=${selectedCategory?.value}&ev=${item.id}&el=${item.title}`}
          target="_blank"
          rel="noreferrer"
        >
          {item.title}
        </a>
      </p>

      <div className="my-exam-item-status-and-button-wrapper">
        <label className="my-exam-item-status">{statusLabel}</label>
        <Button
          type="primary"
          onClick={onToggleExamPreviewModal}
          className="my-exam-item-preview-button"
        >
          미리보기
        </Button>
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
    </MyExamListItemContainer>
  );
};

export default MyExamListItem;

const MyExamListItemContainer = styled.li`
  display: flex;
  gap: 20px;
  align-items: center;
  :hover {
    background-color: ${palette.gray_100};
  }
  .my-exam-item-title {
    a {
      padding: 20px 0;
      display: block;
    }

    flex: 7;
  }
  .my-exam-item-preview-button {
    font-size: 0.8rem;
  }
  .my-exam-item-status-and-button-wrapper {
    flex: 3;
    min-width: 150px;
  }
  .my-exam-item-status {
    width: 60px;
    text-align: left;
    font-size: 0.9rem;
    color: ${palette.gray_700};
  }
  @media (max-width: ${responsive.small}) {
    .my-exam-item-status-and-button-wrapper {
      flex: 7;
    }
  }
`;
