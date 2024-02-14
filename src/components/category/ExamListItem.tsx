import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import ExamBookmark from '@components/common/examBookmark/ExamBookmark';
import useExamCategory from '@lib/hooks/useExamCategory';
import palette from '@styles/palette';
import { Checkbox, Dropdown, MenuProps, Modal, Tag } from 'antd';
import { ExamSettingType } from 'customTypes';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';
import ExamSelecModal from './ExamSelecModal';
import { useRouter } from 'next/router';
import useAuth from '@lib/hooks/useAuth';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

const ExamListItemBlock = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
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
          color: ${palette.colorText};
        }
        &:hover {
          background-color: ${palette.gray_100};
          svg {
            color: ${palette.antd_blue_02};
          }
        }
      }
    }
  }

  .exam-list-item-bookmark-button {
    color: ${palette.colorText};
  }
  .exam-list-item-bookmark-button-active {
    color: ${palette.yellow_500};
  }
  .exam-list-item-control-option-wrapper {
    border-radius: 50%;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border: 1px solid ${palette.colorBorder};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: ${palette.antd_blue_02};
      svg {
        color: ${palette.antd_blue_02};
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
  exam: MockExam;
  examSetting: ExamSettingType;
  handleExamSelect: (examId: number) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const ExamListItem: React.FC<ExamListItemProps> = ({
  exam,
  examSetting,
  handleExamSelect,
  dragHandleProps,
}) => {
  const router = useRouter();
  const { handleRemoveExamFromCategory, handleToggleExamBookmark, category } =
    useExamCategory();
  const [isExamSelectModalOpen, setIsExamSelectModalOpen] = useState(false);
  const { user } = useAuth();
  const isMyExam = useMemo(
    () => user && exam.user.id === user.id,
    [exam, user]
  );
  const isMyCategory = useMemo(
    () => user && category.user.id === user.id,
    [category, user]
  );

  const handleRemoveExam = () => {
    Modal.confirm({
      title: '정말로 삭제하시겠습니까?',
      onOk() {
        handleRemoveExamFromCategory(exam.id);
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
          제거하기
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
        src={exam.user.profileImg || '/png/profile/profile_default.png'}
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
    <ExamListItemBlock>
      <Checkbox
        className="exam-list-item-checkbox"
        checked={examSetting.examIds.includes(exam.id)}
        onClick={() => handleExamSelect(exam.id)}
      />
      <BasicCard onClick={handleExamClick} hoverEffect type="primary">
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
          categoryId={Number(category.id)}
        />
      )}
    </ExamListItemBlock>
  );
};

export default ExamListItem;
