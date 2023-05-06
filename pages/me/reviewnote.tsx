import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ReviewNoteComponent from '@components/me/reviewnote/ReviewNoteComponent';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ReviewNotePageProps {}

const ReviewNotePage: React.FC<ReviewNotePageProps> = () => {
  const { data: meQuery } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!meQuery?.me.user) router.push('/mobile/login');
  }, [meQuery]);
  return (
    <>
      <WithHead title="성취도 | 모두CBT" pageHeadingTitle="성취도페이지" />
      <Layout subNav="main">
        <ReviewNoteComponent />
      </Layout>
    </>
  );
};

export default ReviewNotePage;

const ReviewNotePageContainer = styled.div``;
