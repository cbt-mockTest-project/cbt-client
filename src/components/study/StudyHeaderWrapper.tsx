import WithHead from '@components/common/head/WithHead';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

interface StudyHeaderWrapperProps {}

const StudyHeaderWrapper: React.FC<StudyHeaderWrapperProps> = () => {
  const router = useRouter();
  const questions = useAppSelector((state) => state.mockExam.questions);
  const examTitle = questions?.[0]?.mockExam?.title || '모두CBT';
  const mode = router.query.mode as string;
  const order = router.query.order as string;
  const examIds = router.query.examIds as string;
  const title = useMemo(() => {
    let title = '학습페이지';
    if (mode === ExamMode.CARD) title = `${examTitle}-카드모드`;
    if (mode === ExamMode.TYPYING) title = `${examTitle}-타이핑모드`;
    if (mode === ExamMode.SOLUTION) title = `${examTitle}-해설모드`;
    if (order === 'random') title = title + '-랜덤';
    if (order === 'normal') title = title + '-순서대로';
    if (examIds) title = title + '-다중선택모드';
    if (!examIds) title = title + '-단일선택모드';
    return title;
  }, [mode, examTitle]);
  return (
    <WithHead
      title={title + ' | 모두CBT'}
      pageHeadingTitle={title + ' | 모두CBT 학습페이지'}
    />
  );
};

export default StudyHeaderWrapper;
