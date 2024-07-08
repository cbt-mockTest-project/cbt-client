import { EllipsisOutlined } from '@ant-design/icons';
import BasicCard from '../common/card/BasicCard';
import ExamBookmark from '../common/examBookmark/ExamBookmark';
import useExamCategory from '../../_lib/hooks/useExamCategory';
import palette from '../../_styles/palette';
import { App, Dropdown, MenuProps, Tag } from 'antd';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { MockExam, MockExamCategory } from '../../types';
import ExamSelecModal from './ExamSelecModal';
import { useRouter } from 'next/router';
import useAuth from '../../_lib/hooks/useAuth';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import ExamListItemCheckbox from './ExamListItemCheckbox';
import useCatgegoryExams from './hooks/useCategoryExamList';

const ExamListItemBlock = styled.div<{ hasRecentlyMark: boolean }>`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  ${(props) =>
    props.hasRecentlyMark &&
    css`
      .exam-list-basic-card {
        position: relative;
        border-color: ${({ theme }) => theme.color('colorPrimary')};
      }
    `}
  .exam-list-item-checkbox {
    height: 85px;
    text-align: center;
    .ant-checkbox-inner {
      width: 25px;
      height: 25px;
    }
    .ant-checkbox-inner::after {
      width: 10px;
      height: 14px;
    }
  }
  .exam-list-item-link {
    width: 100%;
    height: 100%;
  }
  .exam-list-item-top-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .exam-list-item-title-and-edit-button {
      display: flex;
      align-items: center;
      gap: 10px;
      .exam-list-item-title {
        max-width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
      }
      .exam-list-item-title-edit-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
        position: relative;
        top: 1px;
        svg {
          font-size: 18px;
          color: ${({ theme }) => theme.color('colorText')};
        }
        &:hover {
          background-color: ${palette.gray_100};
          svg {
            color: ${({ theme }) => theme.color('colorPrimary')};
          }
        }
      }
    }
  }

  .exam-list-item-bookmark-button {
    color: ${({ theme }) => theme.color('colorText')};
  }
  .exam-list-item-bookmark-button-active {
    color: ${palette.yellow_500};
  }
  .exam-list-item-control-option-wrapper {
    border-radius: 50%;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.color('colorBorder')};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: ${({ theme }) => theme.color('colorPrimary')};
      svg {
        color: ${({ theme }) => theme.color('colorPrimary')};
      }
    }
  }

  .exam-list-item-bottom-wrapper {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .exam-list-item-user-profile-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }
    .exam-list-item-user-profile-image {
      border-radius: 50%;
      background-color: ${palette.gray_200};
    }
    .exam-list-item-user-name {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ant-tag {
      margin: 0;
    }
  }

  .exam-list-item-drag-handle {
    margin-bottom: auto;
    cursor: grab;
  }
`;

interface ExamListItemProps {
  category: MockExamCategory;
  exam: MockExam;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  hasRecentlyMark?: boolean;
  recentlyStudyQuestionNumber?: number;
}

const ExamListItem: React.FC<ExamListItemProps> = ({
  category,
  exam,
  dragHandleProps,
  hasRecentlyMark = false,
  recentlyStudyQuestionNumber = 0,
}) => {
  const { modal } = App.useApp();
  const router = useRouter();
  const { handleRemoveExamFromCategory } = useCatgegoryExams();
  const { handleToggleExamBookmark } = useExamCategory();
  const [isExamSelectModalOpen, setIsExamSelectModalOpen] = useState(false);
  const { user, handleCheckLogin } = useAuth();
  const isMyExam = useMemo(
    () => user && exam.user.id === user.id,
    [exam, user]
  );
  const isMyCategory = category.user.id === user?.id;

  const handleRemoveExam = () => {
    modal.confirm({
      title: '정말로 삭제하시겠습니까?',
      onOk() {
        handleRemoveExamFromCategory({
          examId: exam.id,
          categoryId: category.id,
        });
      },
    });
  };
  const handleExamClick = () => {
    setIsExamSelectModalOpen(true);
  };

  const examSettingDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveExam();
          }}
        >
          빼기
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push({
              pathname: '/exam/create',
              query: {
                examId: exam.id,
                categoryId: category.id,
              },
            });
          }}
        >
          수정하기
        </button>
      ),
    },
  ];

  const UserProfile = () => (
    <div className="exam-list-item-user-profile-wrapper">
      <Image
        className="exam-list-item-user-profile-image"
        src={
          exam.user.profileImg ||
          `${process.env.NEXT_PUBLIC_CLOUD_FRONT}/user/profile_default.png`
        }
        alt="프로필이미지"
        width={20}
        height={20}
      />
      <span className="exam-list-item-user-name">{exam.user.nickname}</span>
    </div>
  );

  const ExamCountTag = () => (
    <Tag className="exam-list-item-question-count-tag" color="green">
      {exam.mockExamQuestion.length} 문제
    </Tag>
  );

  return (
    <ExamListItemBlock hasRecentlyMark={hasRecentlyMark}>
      <ExamListItemCheckbox
        categoryId={category.id}
        exams={category.mockExam}
        examId={exam.id}
      />
      <BasicCard
        className="exam-list-basic-card"
        onClick={handleExamClick}
        hoverEffect
        type="primary"
      >
        <div className="exam-list-item-top-wrapper">
          <div className="exam-list-item-title-and-edit-button">
            <div className="exam-list-item-title">{exam.title}</div>
          </div>
          <div>
            {isMyExam ? (
              <Dropdown
                menu={{
                  items: examSettingDropdownItems,
                }}
              >
                <div
                  className="exam-list-item-control-option-wrapper"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <EllipsisOutlined />
                </div>
              </Dropdown>
            ) : (
              <ExamBookmark
                handleToggleBookmark={(e) => {
                  e.stopPropagation();
                  if (!handleCheckLogin()) return;
                  handleToggleExamBookmark(exam.id);
                }}
                isBookmarked={exam.isBookmarked || false}
              />
            )}
          </div>
        </div>

        <div className="exam-list-item-bottom-wrapper">
          <UserProfile />
          <ExamCountTag />
        </div>
        {hasRecentlyMark && (
          <div className="absolute top-[-15px] left-[15px]">
            <Tag color="blue">{`최근 학습${
              recentlyStudyQuestionNumber !== 0
                ? `- ${recentlyStudyQuestionNumber}번 문제`
                : '- 해설모드'
            }`}</Tag>
          </div>
        )}
      </BasicCard>
      {isMyCategory && (
        <div {...dragHandleProps}>
          <DragIndicatorIcon className="exam-list-item-drag-handle" />
        </div>
      )}
      {isExamSelectModalOpen && (
        <ExamSelecModal
          examId={exam.id}
          open={isExamSelectModalOpen}
          onCancel={() => setIsExamSelectModalOpen(false)}
          categoryId={category.id}
          isPublicCategory={category.isPublic}
        />
      )}
    </ExamListItemBlock>
  );
};

export default ExamListItem;
