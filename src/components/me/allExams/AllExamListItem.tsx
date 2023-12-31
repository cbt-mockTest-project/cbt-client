import { useMeQuery } from '@lib/graphql/hook/useUser';
import useMyAllExams from '@lib/hooks/useMyAllExams';
import { ExamSettingType } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';
import { MyExamType } from './AllExamsComponent';
import { Checkbox, Dropdown } from 'antd';
import BasicCard from '@components/common/card/BasicCard';
import { EllipsisOutlined } from '@ant-design/icons';
import ExamBookmark from '@components/common/examBookmark/ExamBookmark';
import { MenuProps } from 'antd/lib';
import ExamSelecModal from '@components/category/ExamSelecModal';
import Image from 'next/image';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';

const AllExamListItemBlock = styled.div`
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
  .exam-list-item-bottom-wrapper {
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }
  .exam-list-item-user-profile-image {
    border-radius: 50%;
    background-color: ${palette.gray_200};
  }
  .exam-list-item-bookmark-button {
    color: ${palette.colorText};
  }
  .exam-list-item-bookmark-button-active {
    color: ${palette.yellow_500};
  }
  .exam-list-item-control-option-wrapper {
    border-radius: 50%;
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
  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface AllExamListItemProps {
  exam: MockExam;
  examSetting: ExamSettingType;
  examType: MyExamType;
  handleExamSelect: (examId: number) => void;
}

const AllExamListItem: React.FC<AllExamListItemProps> = ({
  examType,
  examSetting,
  handleExamSelect,
  exam,
}) => {
  const router = useRouter();
  const { handleToggleExamBookmark } = useMyAllExams();
  const [isExamSelectModalOpen, setIsExamSelectModalOpen] = useState(false);
  const examSettingDropdownItems: MenuProps['items'] = [
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
  return (
    <AllExamListItemBlock>
      {examSetting.isMultipleSelectMode && (
        <Checkbox
          checked={examSetting.examIds.includes(exam.id)}
          onClick={() => handleExamSelect(exam.id)}
        />
      )}
      <BasicCard onClick={() => setIsExamSelectModalOpen(true)} hoverEffect>
        <div className="exam-list-item-top-wrapper">
          <span>{exam.title}</span>
          {examType !== 'bookmarked' ? (
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
          <Image
            className="exam-list-item-user-profile-image"
            src={exam.user.profileImg || '/png/profile/profile_default.png'}
            alt="프로필이미지"
            width={20}
            height={20}
          />
          <span className="exam-list-item-user-name">{exam.user.nickname}</span>
        </div>
      </BasicCard>
      {isExamSelectModalOpen && (
        <ExamSelecModal
          examId={exam.id}
          open={isExamSelectModalOpen}
          onCancel={() => setIsExamSelectModalOpen(false)}
        />
      )}
    </AllExamListItemBlock>
  );
};

export default AllExamListItem;
