import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { App } from 'antd';
import { LocalStorage } from '@lib/utils/localStorage';
import {
  IN_PROGRESS_ANSWERS,
  LAST_VISITED_CATEGORY,
} from '@lib/constants/localStorage';
import { useAppSelector } from '@modules/redux/store/configureStore';

interface StudyModeCoreProps {
  setHasDefaultAnswers: React.Dispatch<React.SetStateAction<boolean>>;
}

const StudyModeCore: React.FC<StudyModeCoreProps> = ({
  setHasDefaultAnswers,
}) => {
  const { modal } = App.useApp();
  const router = useRouter();
  const localStorage = new LocalStorage();
  const questions = useAppSelector((state) => state.mockExam.questions);
  const mode = router.query.mode as string;

  useEffect(() => {
    if (mode !== 'typing') return;
    if (questions.length === 0) return;
    const inProgressAnswers = localStorage.get(IN_PROGRESS_ANSWERS);
    if (!inProgressAnswers) return;
    const validAnswers = Object.keys(inProgressAnswers).filter((key) =>
      questions.find((question) => question.id === Number(key))
    );
    if (validAnswers.length === 0) return;
    modal.confirm({
      title: '이전에 작성한 답안이 남아 있습니다.',
      content: '작성중인 답안을 삭제하시겠습니까?',
      okText: '네',
      cancelText: '아니오',
      onOk() {
        localStorage.remove(IN_PROGRESS_ANSWERS);
        setHasDefaultAnswers(false);
      },
      onCancel() {
        setHasDefaultAnswers(true);
      },
    });
  }, [mode]);

  return <></>;
};

export default StudyModeCore;
