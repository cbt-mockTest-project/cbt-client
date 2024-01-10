import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import DataDetailComponent from '@components/data/detail/DataDetailComponent';
import { READ_POST, READ_POSTS } from '@lib/graphql/query/postQuery';
import {
  ReadPostQuery,
  ReadPostQueryVariables,
  ReadPostsQuery,
} from '@lib/graphql/query/postQuery.generated';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { dataActions } from '@modules/redux/slices/data';
import wrapper, { useAppSelector } from '@modules/redux/store/configureStore';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { Post, PostCategory } from 'types';

interface DataDetailPageProps {}

const DataDetailPage: NextPage<DataDetailPageProps> = ({}) => {
  const post = useAppSelector((state) => state.data.dataDetail);
  return (
    <>
      <WithHead
        title={`${post?.title} | 모두CBT`}
        pageHeadingTitle={`${post?.title} | 자료실`}
      />
      <DataDetailComponent />
    </>
  );
};

export default DataDetailPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadPostsQuery>({
      query: READ_POSTS,
      variables: {
        input: {
          page: 1,
          all: true,
        },
      },
    });
    if (res.data.readPosts.posts) {
      paths = res.data.readPosts.posts
        .filter((el) => el.category === PostCategory.Data)
        .map((el) => ({
          params: { Id: String(el.id) },
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
    if (!context.params?.Id) {
      return {
        notFound: true,
      };
    }
    const apolloClient = initializeApollo({}, '');
    const postId = context.params?.Id;
    const readPostQueryVariables: ReadPostQueryVariables = {
      input: { id: Number(String(postId)) },
    };
    const res = await apolloClient.query<ReadPostQuery>({
      query: READ_POST,
      variables: readPostQueryVariables,
    });
    if (res.data.readPost.post) {
      store.dispatch(dataActions.setDataDetail(res.data.readPost.post as Post));
    }
    return addApolloState(apolloClient, {
      revalidate: 43200,
    });
  }
);
