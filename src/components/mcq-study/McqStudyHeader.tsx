import HeaderLayout from '@components/common/header/HeaderLayout';
import StudyHeader from '@components/study/StudyHeader';
import useQuestions from '@lib/hooks/useQuestions';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const McqStudyHeaderBlock = styled.div`
  top: 0;
  position: sticky;
  z-index: 999;
`;

interface McqStudyHeaderProps {}

const McqStudyHeader: React.FC<McqStudyHeaderProps> = () => {
  const { questions } = useQuestions();
  return (
    <McqStudyHeaderBlock>
      <StudyHeader questions={questions} />
    </McqStudyHeaderBlock>
  );
};

export default McqStudyHeader;
