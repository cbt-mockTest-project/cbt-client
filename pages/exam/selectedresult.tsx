import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import SelectedResultComponent from '@components/exam/selectedResult/SelectedResultComponent';
import {
  useLazyReadQuestionsByState,
  useReadQuestionsByState,
} from '@lib/graphql/user/hook/useExamQuestion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const SelectedResult: NextPage = () => {
  const router = useRouter();
  const states = router.query.c ? JSON.parse(String(router.query.c)) : [];
  const examId = Number(router.query.e);
  const [readQuestionsQuery, { data: questionsQuery }] =
    useLazyReadQuestionsByState();
  useEffect(() => {
    if (router.isReady) {
      readQuestionsQuery({ variables: { input: { states, examId } } });
    }
  }, [router.isReady]);

  return (
    <>
      <WithHead
        title={`선택된 성취도 문제 | 모두CBT`}
        pageHeadingTitle={`선택된 성취도 문제 페이지`}
      />
      <Layout mainBanner={true}>
        {questionsQuery && (
          <SelectedResultComponent questionsQuery={questionsQuery} />
        )}
      </Layout>
    </>
  );
};

export default SelectedResult;
