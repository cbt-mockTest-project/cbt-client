import { Collapse, Input, Table, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useSearchAvailability from './hooks/useSearchAvailability';
import useBlogCategoryList from './hooks/useBlogCategoryList';
import palette from '@styles/palette';
import PostRankAnalysis from './PostRankAnalysis';
import { ColumnsType } from 'antd/lib/table';
import {
  CommentOutlined,
  HeartOutlined,
  LinkOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import useBlogInfo from './hooks/useBlogInfo';
import Link from 'next/link';
import { extractBlogId } from './utils/extractBlogId';
import { LocalStorage } from '@lib/utils/localStorage';

const BlogAnalysisBlock = styled.div`
  .analysis-table {
    margin-top: 20px;
  }
  table {
    width: 100% !important;
    min-width: 800px !important;
    .ant-table-cell {
      min-width: 60px !important;
    }
  }
  .analysis-history-tag-list {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    .ant-tag {
      cursor: pointer;
      margin: 0;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
    }
  }
`;

interface BlogAnalysisProps {}

const BLOG_ANALYSIS_HISTORY_KEY = 'BLOG_ANALYSIS_HISTORY';

const BlogAnalysis: React.FC<BlogAnalysisProps> = () => {
  const router = useRouter();
  const storage = new LocalStorage();
  const { data: posts, isLoading: searchAvailabilityLoading } =
    useSearchAvailability();
  const { data: categoryList, isLoading: categoryListLoading } =
    useBlogCategoryList();
  const { data: blogInfo, isLoading: blogInfoLoading } = useBlogInfo();
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const formattedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        ['co/sy/th']: (
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '5px',
            }}
          >
            <div>
              <CommentOutlined /> {post.commentCnt}
            </div>
            <div>
              <HeartOutlined /> {post.sympathyCnt}
            </div>
            <div>
              <PictureOutlined /> {post.thumbnailCount}
            </div>
          </div>
        ),
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
            ●
          </div>
        ) : (
          <div
            style={{
              color: palette.red_500,
            }}
          >
            ✖
          </div>
        ),
      })),
    [posts]
  );

  const formattedBlogInfo = useMemo(
    () => [
      {
        blogName: blogInfo?.blogInfo.blogName,
        totalVisitorCount:
          blogInfo?.blogInfo.totalVisitorCount.toLocaleString(),
        blogDirectoryName: blogInfo?.blogInfo.blogDirectoryName,
        subscriber: blogInfo?.blogInfo.subscriberCount.toLocaleString(),
        influencer: blogInfo?.blogInfo.influencerUrl ? (
          <Link
            href={blogInfo.blogInfo.influencerUrl}
            target="_blank"
            rel="noreferrer"
          >
            <LinkOutlined />
          </Link>
        ) : (
          <div
            style={{
              color: palette.red_500,
            }}
          >
            ✖
          </div>
        ),
        visitorCnt: blogInfo?.blogInfo.blogVisitor.reduce(
          (acc, cur) => acc + (acc ? '/' : '') + cur.visitor.toLocaleString(),
          ''
        ),
        postCnt: categoryList ? categoryList.postCnt?.toLocaleString() : 0,
        categoryList: (
          <Collapse
            size="small"
            items={[
              {
                key: 'categoryList',
                label: '카테고리별 포스트',
                children: categoryList?.categories
                  .filter((el) => el.categoryName !== '구분선')
                  .map((category) => (
                    <div key={category.categoryName}>
                      {category.categoryName}:{' '}
                      {category.postCnt.toLocaleString()}
                    </div>
                  )),
              },
            ]}
          />
        ),
      },
    ],
    [categoryList, blogInfo]
  );

  useEffect(() => {
    if (categoryList?.ok) {
      const uniqueHistory = Array.from(
        new Set([extractBlogId(String(router.query.b)), ...analysisHistory])
      );
      setAnalysisHistory(uniqueHistory);
      storage.set(BLOG_ANALYSIS_HISTORY_KEY, uniqueHistory);
    }
  }, [categoryList]);

  useEffect(() => {
    const history = storage.get(BLOG_ANALYSIS_HISTORY_KEY);
    if (history) {
      setAnalysisHistory(history);
    }
  }, []);

  const handleDeleteHistory = (blogId: string) => {
    const newHistory = analysisHistory.filter((history) => history !== blogId);
    setAnalysisHistory(newHistory);
    storage.set(BLOG_ANALYSIS_HISTORY_KEY, newHistory);
  };

  return (
    <BlogAnalysisBlock>
      <Input.Search
        placeholder="블로그 주소 또는 아이디를 입력해주세요."
        enterButton="분석"
        size="large"
        loading={searchAvailabilityLoading || categoryListLoading}
        onSearch={(value) => {
          router.push({ query: { ...router.query, b: extractBlogId(value) } });
        }}
      />
      <div className="analysis-history-tag-list">
        {analysisHistory.length > 0 &&
          analysisHistory.map((blogId, index) => (
            <Tag
              closable
              key={blogId}
              onClick={() => {
                router.push({ query: { ...router.query, b: blogId } });
              }}
              onClose={() => handleDeleteHistory(blogId)}
              color={index === 0 ? 'blue' : 'default'}
            >
              {blogId}
            </Tag>
          ))}
      </div>
      <Table
        className="analysis-table"
        loading={{
          spinning: categoryListLoading || blogInfoLoading,
        }}
        dataSource={blogInfo?.blogInfo.blogName && formattedBlogInfo}
        bordered
        scroll={{ x: true }}
        columns={blogInfoColumns}
        pagination={false}
      />
      <Table
        className="analysis-table"
        loading={{
          spinning: searchAvailabilityLoading || categoryListLoading,
        }}
        dataSource={formattedPosts}
        bordered
        scroll={{ x: true }}
        columns={postsColumns}
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

const postsColumns: ColumnsType = [
  {
    title: '제목',
    dataIndex: 'titleWithInspectMessage',
    key: 'titleWithInspectMessage',
    width: 300,
  },
  {
    title: '공감/댓글/사진',
    dataIndex: 'co/sy/th',
    key: 'co/sy/th',
    width: 140,
  },

  {
    title: '노출',
    dataIndex: 'isSearchAvailability',
    key: 'isSearchAvailability',
    width: 10,
  },
  {
    title: '순위',
    dataIndex: 'rank',
    key: 'rank',
    width: 300,
  },
];

const blogInfoColumns: ColumnsType = [
  {
    title: '이름',
    dataIndex: 'blogName',
    key: 'blogName',
  },

  {
    title: '방문자(최근5일)',
    dataIndex: 'visitorCnt',
    key: 'visitorCnt',
  },
  {
    title: '누적 방문자',
    dataIndex: 'totalVisitorCount',
    key: 'totalVisitorCount',
  },
  {
    title: '주제',
    dataIndex: 'blogDirectoryName',
    key: 'blogDirectoryName',
  },
  {
    title: '카테고리별 포스트',
    dataIndex: 'categoryList',
    key: 'categoryList',
  },
  {
    title: '전체 포스트',
    dataIndex: 'postCnt',
    key: 'postCnt',
  },
  {
    title: '구독자',
    dataIndex: 'subscriber',
    key: 'subscriber',
  },

  // {
  //   title: '인플루언서',
  //   dataIndex: 'influencer',
  //   key: 'influencer',
  // },
];
