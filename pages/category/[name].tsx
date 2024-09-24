import CategoryComponent from '@components/category/CategoryComponent';
import CategoryCore from '@components/category/CategoryCore';
import WithHead from '@components/common/head/WithHead';
import { READ_EXAM_CATEGORY_NAMES } from '@lib/graphql/query/examQuery';
import { ReadMockExamCategoryNamesQuery } from '@lib/graphql/query/examQuery.generated';
import {
  getCategoryKey,
  getCategoryQueryOption,
} from '@lib/queryOptions/getCategoryQueryOption';
import { apolloClient } from '@modules/apollo';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { MockExamCategory, ReadMockExamCategoryByCategoryIdInput } from 'types';

const CategoryPageBlock = styled.div`
  width: 100%;
  height: 100%;

  .category-banner-wrapper {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 12/2;
    max-height: 100px;
    position: relative;
    border-bottom: 1px solid ${({ theme }) => theme.color('colorSplit')};
    img {
      background-color: white;
      object-fit: contain;
    }
  }
`;
interface CategoryPageProps {
  category: MockExamCategory;
  categoryQueryInput: ReadMockExamCategoryByCategoryIdInput;
  queryKey: string[];
  dehydratedState: DehydratedState;
}

const CategoryPage: NextPage<CategoryPageProps> = ({
  categoryQueryInput,
  category,
  queryKey,
  dehydratedState,
}) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <WithHead
        title={
          category.isPublic ? category.name : '암기장 공유서비스' + ' | 모두CBT'
        }
        pageHeadingTitle={`${category.name} 페이지`}
        description={category.description}
        noIndex={category.isPublic ? false : true}
      />
      <CategoryPageBlock>
        <Link
          className="category-banner-wrapper"
          href="https://shop.moducbt.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT}/banner/modu-shop-banner-pc01.png`}
            alt="category-banner"
          />
        </Link>
        <CategoryComponent
          queryKey={queryKey}
          categoryQueryInput={categoryQueryInput}
        />
        <CategoryCore
          key={queryKey[1]}
          queryKey={queryKey}
          categoryQueryInput={categoryQueryInput}
          categoryId={category.id}
        />
      </CategoryPageBlock>
    </HydrationBoundary>
  );
};
export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { name: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadMockExamCategoryNamesQuery>({
      query: READ_EXAM_CATEGORY_NAMES,
    });
    if (res.data.readMockExamCategoryNames.urlSlugs) {
      paths = res.data.readMockExamCategoryNames.urlSlugs.map((el) => ({
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

export const getStaticProps: GetStaticProps = async (context) => {
  const urlSlug = context.params?.name;
  if (!urlSlug || typeof urlSlug !== 'string') {
    return {
      notFound: true,
    };
  }
  const categoryQueryInput: ReadMockExamCategoryByCategoryIdInput = {
    urlSlug,
  };
  const queryClient = new QueryClient();
  const queryKey = getCategoryKey(urlSlug);
  const category = await queryClient.fetchQuery(
    getCategoryQueryOption({
      queryKey,
      input: categoryQueryInput,
    })
  );

  resetServerContext();
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      queryKey,
      categoryQueryInput,
      category,
    },
    revalidate: 86400,
  };
};
