import { EllipsisOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import ExamBookmark from '@components/common/examBookmark/ExamBookmark';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useExamCategory from '@lib/hooks/useExamCategory';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Checkbox, Dropdown, MenuProps, Modal, Tag } from 'antd';
import { ExamSettingType } from 'customTypes';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';
import ExamSelecModal from './ExamSelecModal';
import { useRouter } from 'next/router';

const ExamListItemBlock = styled.div`
  width: calc(50% - 10px);
  display: flex;
  gap: 10px;
  align-items: center;
  .exam-list-item-link {
    width: 100%;
    height: 100%;
  }
  .exam-list-item-top-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .exam-list-item-title {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 600;
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

  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface ExamListItemProps {
  exam: MockExam;
  examSetting: ExamSettingType;
  handleExamSelect: (examId: number) => void;
}

const ExamListItem: React.FC<ExamListItemProps> = ({
  exam,
  examSetting,
  handleExamSelect,
}) => {
  const router = useRouter();
  const { handleRemoveExamFromCategory, handleToggleExamBookmark, category } =
    useExamCategory();
  const [isExamSelectModalOpen, setIsExamSelectModalOpen] = useState(false);
  const { data: meQuery } = useMeQuery();
  const categoryId = router.query.id;

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
                ...(categoryId && { categoryId }),
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
  return (
    <ExamListItemBlock>
      {examSetting.isMultipleSelectMode && (
        <Checkbox
          checked={examSetting.examIds.includes(exam.id)}
          onClick={() => handleExamSelect(exam.id)}
        />
      )}
      <BasicCard onClick={handleExamClick} hoverEffect type="primary">
        <div className="exam-list-item-top-wrapper">
          <div className="exam-list-item-title">{exam.title}</div>
          {category?.user.id === meQuery?.me.user?.id ? (
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

        <div className="exam-list-item-bottom-wrapper">
          <div className="exam-list-item-user-profile-wrapper">
            <Image
              className="exam-list-item-user-profile-image"
              src={exam.user.profileImg || '/png/profile/profile_default.png'}
              alt="프로필이미지"
              width={20}
              height={20}
            />
            <span className="exam-list-item-user-name">
              {exam.user.nickname}
            </span>
          </div>
          <Tag color="green">{exam.mockExamQuestion.length} 문제</Tag>
        </div>
      </BasicCard>
      {isExamSelectModalOpen && (
        <ExamSelecModal
          examId={exam.id}
          open={isExamSelectModalOpen}
          onCancel={() => setIsExamSelectModalOpen(false)}
        />
      )}
    </ExamListItemBlock>
  );
};

export default ExamListItem;
