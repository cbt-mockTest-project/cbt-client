import WithHead from '@components/common/head/WithHead';
import HomeComponent from '@components/home/HomeComponent';
import { MAIN_PAGE } from '@lib/constants/displayName';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';
import { IS_FIRST_VISIT } from '@lib/constants/sessionStorage';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { ME_QUERY } from '@lib/graphql/query/userQuery';
import { MeQuery } from '@lib/graphql/query/userQuery.generated';
import useAuth from '@lib/hooks/useAuth';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { homeActions } from '@modules/redux/slices/home';
import wrapper from '@modules/redux/store/configureStore';
import { Button, Space, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ExamSource, GetExamCategoriesInput, MockExamCategory } from 'types';

interface Props {}

const IndexPage: React.FC<Props> = () => {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useAuth();
  const router = useRouter();
  const openNotification = (placement: NotificationPlacement) => {
    if (!user) return;
    const key = `open${Date.now()}`;
    api.open({
      duration: 60,
      message: `빠른이동`,
      description: `"${user.recentlyStudiedCategory}" 바로가기`,
      placement,
      key,
      btn: (
        <Space>
          <Button onClick={() => api.destroy(key)}>닫기</Button>
          <Button
            type="primary"
            onClick={() => {
              router.push(`/category/${user.recentlyStudiedCategory}`);
            }}
          >
            이동
          </Button>
        </Space>
      ),
    });
  };

  useEffect(() => {
    if (user && user.recentlyStudiedCategory) {
      openNotification('bottom');
    }
  }, [user]);

  return (
    <>
      <WithHead
        title="모두CBT | 암기장 공유 서비스"
        pageHeadingTitle="모두CBT 서비스 메인페이지"
      />
      <HomeComponent />
      {contextHolder}
    </>
  );
};

IndexPage.displayName = MAIN_PAGE;

export default IndexPage;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    try {
      const apolloClient = initializeApollo({}, '');
      const getCategories = (input: GetExamCategoriesInput) =>
        apolloClient
          .query<GetExamCategoriesQuery>({
            query: GET_EXAM_CATEGORIES,
            variables: {
              input,
            },
          })
          .then((res) => res.data.getExamCategories.categories || []);
      const [moduCategories, userCategories, ehsCategories] = await Promise.all(
        [
          getCategories({
            examSource: ExamSource.MoudCbt,
            limit: 30,
            isPublicOnly: true,
          }),
          getCategories({
            examSource: ExamSource.User,
            limit: 30,
            isPublicOnly: true,
          }),
          getCategories({
            examSource: ExamSource.EhsMaster,
            limit: 30,
          }),
        ]
      );
      store.dispatch(
        homeActions.setModuStorageCategories({
          categories: moduCategories as MockExamCategory[],
        })
      );
      store.dispatch(
        homeActions.setUserStorageCategories({
          categories: userCategories as MockExamCategory[],
        })
      );
      store.dispatch(
        homeActions.setEhsStorageCategories({
          categories: ehsCategories as MockExamCategory[],
        })
      );

      return addApolloState(apolloClient, {
        revalidate: 60,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
