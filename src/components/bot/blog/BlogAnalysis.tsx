import { Input, Table } from 'antd';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import useSearchAvailability from './hooks/useSearchAvailability';
import useBlogCategoryList from './hooks/useBlogCategoryList';
import palette from '@styles/palette';
import PostRankAnalysis from './PostRankAnalysis';

const BlogAnalysisBlock = styled.div`
  .analysis-table {
    margin-top: 20px;
  }
`;

interface BlogAnalysisProps {}

const BlogAnalysis: React.FC<BlogAnalysisProps> = () => {
  const { data: posts, isLoading: searchAvailabilityLoading } =
    useSearchAvailability();
  const { data: categoryList, isLoading: categoryListLoading } =
    useBlogCategoryList();

  const formattedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        rank: <PostRankAnalysis logNo={String(post.logNo)} />,
        titleWithInspectMessage: (
          <a
            href={post.link}
            target="_blank"
            rel="noreferrer"
            style={{
              color: palette.colorText,
              textDecoration: 'underline',
            }}
          >
            {post.titleWithInspectMessage}
          </a>
        ),
        isSearchAvailability: post.isSearchAvailability ? (
          <div
            style={{
              color: palette.green_500,
            }}
          >
            Good
          </div>
        ) : (
          <div
            style={{
              color: palette.red_500,
            }}
          >
            Bad
          </div>
        ),
      })),
    [posts]
  );

  const router = useRouter();
  return (
    <BlogAnalysisBlock>
      <Input.Search
        placeholder="블로그ID 입력해주세요."
        enterButton="분석"
        size="large"
        loading={searchAvailabilityLoading || categoryListLoading}
        onSearch={(value) => {
          router.push({ query: { ...router.query, b: value } });
        }}
      />
      <Table
        className="analysis-table"
        loading={{
          spinning: searchAvailabilityLoading || categoryListLoading,
        }}
        dataSource={formattedPosts}
        bordered
        scroll={{ x: true }}
        columns={analysisColumns}
        pagination={{
          pageSize: 10,
          total: categoryList ? categoryList.postCnt : 0,
          onChange(page) {
            router.push({ query: { ...router.query, p: page } });
          },
        }}
      />
    </BlogAnalysisBlock>
  );
};

export default BlogAnalysis;

const analysisColumns = [
  {
    title: '제목',
    dataIndex: 'titleWithInspectMessage',
    key: 'titleWithInspectMessage',
  },
  {
    title: '댓글',
    dataIndex: 'commentCnt',
    key: 'commentCnt',
  },
  {
    title: '공감',
    dataIndex: 'sympathyCnt',
    key: 'sympathyCnt',
  },
  {
    title: '노출',
    dataIndex: 'isSearchAvailability',
    key: 'isSearchAvailability',
  },
  {
    title: '순위',
    dataIndex: 'rank',
    key: 'rank',
  },
];
