import { LeftOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';

const StudyHeaderBlock = styled.div`
  background-color: ${palette.containerBackgroundColor};
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 10;
  border-bottom: 1px solid ${palette.borderColor};
  .study-header-inner {
    height: 57px;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: ${palette.gray_900};
    padding: 0 20px;
    justify-content: center;
    position: relative;
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
  }
  @media (max-width: ${responsive.medium}) {
    .study-header-inner {
      padding: 0 10px;
    }
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
      <div className="study-header-inner">
        <div
          className="study-header-back-button"
          role="button"
          onClick={router.back}
        >
          <LeftOutlined />
        </div>
        <div className="study-header-title">{title}</div>
      </div>
    </StudyHeaderBlock>
  );
};

export default StudyHeader;
