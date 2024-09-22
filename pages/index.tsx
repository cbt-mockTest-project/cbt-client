import WithHead from '@components/common/head/WithHead';
import HomeComponentV2 from '@components/home/HomeComponentV2';
import { MAIN_PAGE } from '@lib/constants/displayName';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';
import { ExamSource } from 'types';

interface Props {
  dehydratedState: DehydratedState;
}

const IndexPage: NextPage<Props> = ({ dehydratedState }) => {
  return (
    <>
      <WithHead
        title="모두CBT | 암기짱 공유 서비스"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <HydrationBoundary state={dehydratedState}>
        <HomeComponentV2 />
      </HydrationBoundary>
    </>
  );
};

IndexPage.displayName = MAIN_PAGE;

export default IndexPage;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.main_modu,
      input: {
        examSource: ExamSource.MoudCbt,
        limit: 30,
      },
    })
  );
  await queryClient.prefetchQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.main_ehs,
      input: {
        examSource: ExamSource.EhsMaster,
        limit: 30,
      },
    })
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
