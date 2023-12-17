import { MinusOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import ExamBookmark from '@components/common/examBookmark/ExamBookmark';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useExamCategory from '@lib/hooks/useExamCategory';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Checkbox, Modal } from 'antd';
import { ExamSettingType } from 'customTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { MockExam } from 'types';

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
    color: ${palette.textColor};
  }
  .exam-list-item-bookmark-button-active {
    color: ${palette.yellow_500};
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
  const { handleRemoveExamFromCategory, handleToggleExamBookmark, category } =
    useExamCategory();
  const { data: meQuery } = useMeQuery();
  const handleRemoveExam = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Modal.confirm({
      title: '정말로 삭제하시겠습니까?',
      onOk() {
        handleRemoveExamFromCategory(exam.id);
      },
    });
  };

  return (
    <ExamListItemBlock>
      {examSetting.isMultipleSelectMode && (
        <Checkbox
          checked={examSetting.examIds.includes(exam.id)}
          onClick={() => handleExamSelect(exam.id)}
        />
      )}
      <Link className="exam-list-item-link" href={`/exam/solution/${exam.id}`}>
        <BasicCard hoverEffect>
          <div className="exam-list-item-top-wrapper">
            <span>{exam.title}</span>
            {category?.user.id === meQuery?.me.user?.id ? (
              <Button type="primary" onClick={handleRemoveExam}>
                <MinusOutlined />
              </Button>
            ) : (
              <ExamBookmark
                handleToggleBookmark={(e) => {
                  e.preventDefault();
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
            <span className="exam-list-item-user-name">
              {exam.user.nickname}
            </span>
          </div>
        </BasicCard>
      </Link>
    </ExamListItemBlock>
  );
};

export default ExamListItem;
