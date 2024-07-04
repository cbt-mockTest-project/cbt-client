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
  const tab = router.query.tab as string;
  const localStorage = new LocalStorage();
  const questions = useAppSelector((state) => state.mockExam.questions);
  const [toUrl, setToUrl] = useState('');
  const mode = router.query.mode as string;
  const prevVisitedCategoryOrHomePath =
    localStorage.get(LAST_VISITED_CATEGORY) || '/';

  useEffect(() => {
    if (tab === 'end') return;
    const routeChangeStart = (url: string) => {
      if (toUrl === url) return;
      if (url.includes('study')) return;
      if (url.includes('tab=end')) return;
      setToUrl(url);
      history.pushState(null, '', router.asPath);
      router.replace(router.asPath);
      modal.confirm({
        title: '학습을 중단하시겠습니까?',
        onOk: () => {
          router.push(prevVisitedCategoryOrHomePath);
        },
        onCancel: () => {
          setToUrl('');
        },
      });
      throw 'Abort route change. Please ignore this error.';
    };
    router.events.on('routeChangeStart', routeChangeStart);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [toUrl, router.asPath]);

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
