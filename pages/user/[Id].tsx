import WithHead from '@components/common/head/WithHead';
import StorageLayout from '@components/common/layout/storage/StorageLayout';
import UserStorageComponent from '@components/userStorage/UserStorageComponent';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { GET_EXAM_CATEGORIES } from '@lib/graphql/query/examQuery';
import { GetExamCategoriesQuery } from '@lib/graphql/query/examQuery.generated';
import { GET_USER } from '@lib/graphql/query/userQuery';
import { UserProfileQuery } from '@lib/graphql/query/userQuery.generated';
import useStorage from '@lib/hooks/useStorage';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { storageActions } from '@modules/redux/slices/storage';
import wrapper from '@modules/redux/store/configureStore';
import { StorageType } from 'customTypes';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { MockExamCategory, User } from 'types';

interface UserPageProps {
  user: User;
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  const { data: meQuery } = useMeQuery();
  const { fetchCategories } = useStorage(StorageType.USER);

  useEffect(() => {
    if (meQuery?.me.user && user) {
      fetchCategories({
        categoryMakerId: user.id,
      });
    }
  }, [meQuery, user]);
  return (
    <>
      <WithHead
        title={`${user.nickname} | 모두CBT`}
        pageHeadingTitle="모두CBT 유저 페이지"
      />
      <StorageLayout
        storageType={StorageType.USER}
        hasOpenSaveCategoryModalButton={meQuery?.me.user?.id === user.id}
        title={`${user.nickname}님의 암기장`}
      >
        <UserStorageComponent />
      </StorageLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  try {
    return { paths: [], fallback: 'blocking' };
  } catch {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    try {
      if (!context.params?.Id) {
        return {
          notFound: true,
          revalidate: 1,
        };
      }
      const apolloClient = initializeApollo({}, '');

      const [categoryRes, userRes] = await Promise.all([
        apolloClient
          .query<GetExamCategoriesQuery>({
            query: GET_EXAM_CATEGORIES,
            variables: {
              input: {
                categoryMakerId: Number(context.params.Id),
              },
            },
          })
          .then((res) => res),
        apolloClient
          .query<UserProfileQuery>({
            query: GET_USER,
            variables: {
              input: {
                id: Number(context.params.Id),
              },
            },
          })
          .then((res) => res),
      ]);
      if (
        !categoryRes.data.getExamCategories.ok ||
        !userRes.data.userProfile.ok
      ) {
        return {
          notFound: true,
          revalidate: 1,
        };
      }
      const categories = categoryRes.data.getExamCategories
        .categories as MockExamCategory[];
      const user = userRes.data.userProfile.user as User;
      store.dispatch(storageActions.setUserStorageCategories({ categories }));
      return addApolloState(apolloClient, {
        props: { user },
        revalidate: 43200,
      });
    } catch {
      return {
        notFound: true,
        revalidate: 1,
      };
    }
  }
);

export default UserPage;
