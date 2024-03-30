import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StudyPreventRoutingModalModal from './StudyPreventRoutingModal';
import { Modal } from 'antd';
import { LocalStorage } from '@lib/utils/localStorage';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';

interface StudyModeCoreProps {}

const StudyModeCore: React.FC<StudyModeCoreProps> = () => {
  const router = useRouter();
  const tab = router.query.tab as string;
  const localStorage = new LocalStorage();
  const [toUrl, setToUrl] = useState('');

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

      //   if (Modal.length > 0) return;
      //   setIsPreventRoutingModalOpen(true);
      Modal.confirm({
        title: '학습을 중단하시겠습니까?',
        onOk: () => {
          router.push(prevVisitedCategoryOrHomePath);
        },
        onCancel: () => {
          setToUrl('');
          Modal.destroyAll();
        },
      });
      throw 'Abort route change. Please ignore this error.';
    };
    router.events.on('routeChangeStart', routeChangeStart);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [toUrl, router.asPath]);

  return <></>;
};

export default StudyModeCore;
