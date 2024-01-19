import WithHead from '@components/common/head/WithHead';
import StudyComponent from '@components/study/StudyComponent';
import { STUDY_PAGE } from '@lib/constants/displayName';
import useQuestions from '@lib/hooks/useQuestions';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

interface Props {}

const StudyPage: React.FC<Props> = () => {
  const { questions } = useQuestions();
  const router = useRouter();
  const examTitle = questions?.[0]?.mockExam?.title || '모두CBT';
  const mode = router.query.mode as string;
  const title = useMemo(() => {
    if (!mode || !examTitle) return '학습페이지';
    if (mode === ExamMode.CARD) return `${examTitle}-카드모드`;
    if (mode === ExamMode.TYPYING) return `${examTitle}-타이핑모드`;
    if (mode === ExamMode.SOLUTION) return `${examTitle}-해설모드`;
    return '학습페이지';
  }, [mode, examTitle]);
  return (
    <>
      <WithHead
        title={title + ' | 모두CBT'}
        pageHeadingTitle={title + ' | 모두CBT 학습페이지'}
      />
      <StudyComponent />
    </>
  );
};

StudyPage.displayName = STUDY_PAGE;

export default StudyPage;
