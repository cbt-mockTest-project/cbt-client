import { LeftOutlined } from '@ant-design/icons';
import HeaderLayout from '@components/common/header/HeaderLayout';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';

const StudyHeaderBlock = styled.div`
  .study-header-back-button {
    cursor: pointer;
    position: absolute;
    left: 20px;
  }
  .study-header-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80%;
  }
  svg {
    font-size: 22px;
  }
  @media (max-width: ${responsive.medium}) {
    .study-header-back-button {
      left: 10px;
    }
  }
`;

interface StudyHeaderProps {
  questions: MockExamQuestion[];
}

const StudyHeader: React.FC<StudyHeaderProps> = ({ questions }) => {
  const router = useRouter();
  const isMultipleSelectMode = !!router.query.examIds;
  const title = useMemo(() => {
    if (isMultipleSelectMode) {
      return '다중 선택 모드';
    }
    if (questions.length > 0) {
      return questions[0].mockExam?.title || '';
    }
    return '';
  }, [isMultipleSelectMode, questions]);
  return (
    <StudyHeaderBlock>
      <HeaderLayout>
        <div
          className="study-header-back-button"
          role="button"
          onClick={router.back}
        >
          <LeftOutlined />
        </div>
        <div className="study-header-title">{title}</div>
      </HeaderLayout>
    </StudyHeaderBlock>
  );
};

export default StudyHeader;
