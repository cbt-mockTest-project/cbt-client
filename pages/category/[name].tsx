import CategoryComponent from '@components/category/CategoryComponent';
import WithHead from '@components/common/head/WithHead';
import {
  READ_EXAM_CATEGORY_BY_ID,
  READ_EXAM_CATEGORY_NAMES,
} from '@lib/graphql/query/examQuery';
import {
  ReadMockExamCategoryByCategoryIdQuery,
  ReadMockExamCategoryNamesQuery,
} from '@lib/graphql/query/examQuery.generated';
import useAuth from '@lib/hooks/useAuth';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { examCategoryActions } from '@modules/redux/slices/examCategory';
import wrapper from '@modules/redux/store/configureStore';
import { Button, Space, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { MockExamCategory, ReadMockExamCategoryByCategoryIdInput } from 'types';

interface CategoryPageProps {
  category: MockExamCategory;
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
}

const CategoryPage: NextPage<CategoryPageProps> = ({
  categoryQueryInput,
  category,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useAuth();
  const router = useRouter();
  const openNotification = (placement: NotificationPlacement) => {
    if (!user) return;
    if (!user.recentlyStudiedExams.length) return;
    const key = `open${Date.now()}`;

    const recentlyStudiedExams = user.recentlyStudiedExams.filter(
      (data) => data.categoryId === category.id
    );
    if (!recentlyStudiedExams.length) return;
    const exam = category.mockExam.find(
      (el) => recentlyStudiedExams[0].examIds[0] === el.id
    );
    if (!exam) return;
    api.open({
      duration: 60,
      message: `이어서 학습하기`,
      description: `"${exam.title}-${recentlyStudiedExams[0].questionIndex}번 문제" 바로가기`,
      placement,
      key,
      btn: (
        <Space>
          <Button onClick={() => api.destroy(key)}>닫기</Button>
          <Button
            type="primary"
            onClick={() => {
              router.push({
                pathname: '/study',
                query: {
                  mode: 'typing',
                  examId: recentlyStudiedExams[0].examIds[0],
                  activeIndex: recentlyStudiedExams[0].questionIndex,
                  categoryId: category.id,
                },
              });
            }}
          >
            이동
          </Button>
        </Space>
      ),
    });
  };

  useEffect(() => {
    if (user && user.recentlyStudiedExams) {
      openNotification('bottom');
    }
  }, [user]);

  return (
    <>
      <WithHead
        title={category.name + ' | 모두CBT'}
        pageHeadingTitle={`${category.name} 페이지`}
        description={category.description}
      />
      <CategoryComponent categoryQueryInput={categoryQueryInput} />
      {contextHolder}
    </>
  );
};
export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { name: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadMockExamCategoryNamesQuery>({
      query: READ_EXAM_CATEGORY_NAMES,
    });
    if (res.data.readMockExamCategoryNames.names) {
      paths = res.data.readMockExamCategoryNames.names.map((el) => ({
        params: { name: String(el) },
      }));
    }
    return { paths, fallback: 'blocking' };
  } catch (err) {
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    try {
      const apolloClient = initializeApollo({}, '');
      const categoryName = context.params?.name;
      if (!categoryName || typeof categoryName !== 'string') {
        console.log('categoryName is undefined');
        return;
      }
      const categoryQueryInput: ReadMockExamCategoryByCategoryIdInput = {
        name: categoryName,
      };
      const res =
        await apolloClient.query<ReadMockExamCategoryByCategoryIdQuery>({
          query: READ_EXAM_CATEGORY_BY_ID,
          variables: {
            input: categoryQueryInput,
          },
        });
      if (!res.data.readMockExamCategoryByCategoryId.ok) {
        return {
          notFound: true,
          revalidate: 1,
        };
      }
      const category = res.data.readMockExamCategoryByCategoryId.category;
      store.dispatch(
        examCategoryActions.setCategory({
          category: category as MockExamCategory,
        })
      );
      resetServerContext();
      return addApolloState(apolloClient, {
        props: { categoryQueryInput, category },
        revalidate: 43200,
      });
    } catch (e) {
      console.log(e);
      return {
        notFound: true,
        revalidate: 1,
      };
    }
  }
);
