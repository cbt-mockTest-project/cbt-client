import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import SelectedResultComponent from '@components/exam/selectedResult/SelectedResultComponent';
import { useLazyReadQuestionsByState } from '@lib/graphql/user/hook/useExamQuestion';
import { message } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SelectedResult: NextPage = () => {
  const router = useRouter();
  const states = router.query.c ? JSON.parse(String(router.query.c)) : [];
  const questionIds = router.query.qs
    ? JSON.parse(String(router.query.qs))
    : [];
  const [readQuestionsQuery, { data: questionsQuery }] =
    useLazyReadQuestionsByState();
  useEffect(() => {
    if (router.isReady) {
      if (questionIds.length === 0) {
        message.error('잘못된 접근입니다.');
        return;
      }
      readQuestionsQuery({
        variables: { input: { states, questionIds } },
      });
    }
  }, [router.isReady]);

  return (
    <>
      <WithHead
        title={`선택된 성취도 문제 | 모두CBT`}
        pageHeadingTitle={`선택된 성취도 문제 페이지`}
      />
      <Layout mainBanner={false}>
        {questionsQuery && (
          <SelectedResultComponent questionsQuery={questionsQuery} />
        )}
      </Layout>
    </>
  );
};

export default SelectedResult;
