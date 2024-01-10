import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import HeaderLayout from '@components/common/header/HeaderLayout';
import { responsive } from '@lib/utils/responsive';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';

const StudyHeaderBlock = styled.div`
  top: 0;
  position: sticky;
  z-index: 999;
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
  .study-header-home-link {
    position: absolute;
    right: 20px;
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
        <Link className="study-header-home-link" href="/">
          <HomeOutlined />
        </Link>
      </HeaderLayout>
    </StudyHeaderBlock>
  );
};

export default StudyHeader;
