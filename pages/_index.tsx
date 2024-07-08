import WithHead from '../app/_components/common/head/WithHead';
import HomeComponent from '../app/_components/home/HomeComponent';
import HomeCore from '../app/_components/home/HomeCore';
import { MAIN_PAGE } from '../app/_lib/constants/displayName';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '../app/_lib/queryOptions/getCategoriesQueryOption';
import wrapper from '../app/_modules/redux/store/configureStore';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { ExamSource } from '../app/types';

const HomeNoti = dynamic(() => import('../app/_components/home/HomeNoti'), {
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
