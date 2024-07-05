import WithHead from '@components/common/head/WithHead';
import HomeComponent from '@components/home/HomeComponent';
import HomeCore from '@components/home/HomeCore';
import { MAIN_PAGE } from '@lib/constants/displayName';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';
import { apolloClient } from '@modules/apollo';
import wrapper from '@modules/redux/store/configureStore';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { ExamSource, GetExamCategoriesInput } from 'types';

const HomeNoti = dynamic(() => import('@components/home/HomeNoti'), {
  ssr: false,
});

interface Props {}

const IndexPage: React.FC<Props> = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 암기짱 공유 서비스"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <HomeCore />
      <HomeComponent />
      <HomeNoti />
    </>
  );
};

IndexPage.displayName = MAIN_PAGE;

export default IndexPage;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
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
  }
);
