import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DataCard from './DataCard';
import Link from 'next/link';
import { Button, Input, Select, Spin } from 'antd';
import { responsive } from '@lib/utils/responsive';
import useInfinityScroll from '@lib/hooks/useInfinityScroll';
import parse from 'html-react-parser';
import { useLazyReadPosts } from '@lib/graphql/hook/usePost';
import { Post, PostCategory, PostOrderType } from 'types';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { dataActions } from '@modules/redux/slices/data';
import { useRouter } from 'next/router';
import {
  convertServerTimeToKST,
  isServer,
  reomveImgTag,
} from '@lib/utils/utils';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import { DATA_ORDER_OPTIONS } from './Data.constants';
import shortid from 'shortid';
import { ReadDataListQuery } from './Data.type';
import { ParsedUrlQueryInput } from 'querystring';

const DataComponentBlock = styled.div`
  padding-bottom: 50px;
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  .data-search-input {
    margin-bottom: 20px;
  }
  .data-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .data-list-item {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
  }
  .data-pagination-wrapper {
    margin-top: 25px;
    text-align: center;
  }
  .data-search-register-button {
    margin-bottom: 20px;
    width: 100%;
  }
  .data-list-loading-indicator {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
  }
  .data-order-selector-wrapper {
    margin-bottom: 20px;
    margin-left: auto;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 10px;
  }
`;

interface DataComponentProps {}

const DataComponent: React.FC<DataComponentProps> = () => {
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const [firstFetchTrigger, setFirstFetchTrigger] = useState(false);
  const isLogin = meQuery?.me.user ? true : false;
  const [readPosts] = useLazyReadPosts();
  const [keyword, setKeyword] = useState('');
  const dataList = useAppSelector((state) => state.data.dataList);
  const dataListQuery = useAppSelector((state) => state.data.dataListQuery);
  const dispatch = useAppDispatch();
  const fetchData = async (query: ReadDataListQuery) => {
    const res = await readPosts({
      variables: {
        input: {
          limit: 10,
          page: query.page,
          category: PostCategory.Data,
          order: (query.order as PostOrderType) || PostOrderType.CreatedAt,
          search: query.search as string,
        },
      },
    });
    if (res.data?.readPosts.ok && res.data.readPosts.posts) {
      dispatch(
        dataActions.setDataList(
          query.page === 1
            ? (res.data?.readPosts.posts as Post[])
            : [...dataList, ...(res.data?.readPosts.posts as Post[])]
        )
      );
      dispatch(
        dataActions.setDataListQuery({
          ...dataListQuery,
          page: query.page + 1,
          totalCount: res.data ? res.data.readPosts.count : 1,
        })
      );
    }
    return;
  };

  const handleOrderChange = async (value: PostOrderType) => {
    await router.push(
      {
        pathname: '/data',
        query: value ? { ...router.query, order: value } : router.query,
      },
      undefined,
      { shallow: true }
    );
    setFirstFetchTrigger(true);
  };
  const handleSearch = async () => {
    const query: ParsedUrlQueryInput = { ...router.query, search: keyword };
    if (!keyword) delete query.search;
    await router.push(
      {
        pathname: '/data',
        query,
      },
      undefined,
      { shallow: true }
    );
    setFirstFetchTrigger(true);
  };

  const { isLoading, loadingRef } = useInfinityScroll({
    loadMore: () =>
      fetchData({
        ...(router.query as unknown as ReadDataListQuery),
        page: dataListQuery.page,
      }),
    hasMore: dataList.length < dataListQuery.totalCount && !firstFetchTrigger,
  });

  useEffect(() => {
    if (isServer()) return;
    window.scrollTo(0, dataListQuery.scrollY);
    const handleRouteChange = () => {
      dispatch(dataActions.setDataListQueryScrollY(window.scrollY));
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!firstFetchTrigger || !router.isReady) return;
    fetchData({
      ...(router.query as unknown as ReadDataListQuery),
      page: 1,
    });
    setFirstFetchTrigger(false);
  }, [firstFetchTrigger, router.isReady, router.query]);

  return (
    <DataComponentBlock>
      <Input.Search
        className="data-search-input"
        size="large"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="자료를 검색해보세요."
        onSearch={handleSearch}
      />
      {isLogin ? (
        <Link href="/data/register">
          <Button
            className="data-search-register-button"
            type="primary"
            size="large"
          >
            자료 등록하기
          </Button>
        </Link>
      ) : (
        <Button
          className="data-search-register-button"
          type="primary"
          size="large"
          onClick={() => dispatch(coreActions.openModal(loginModal))}
        >
          자료 등록하기
        </Button>
      )}
      <div className="data-order-selector-wrapper">
        <Select
          options={DATA_ORDER_OPTIONS}
          defaultValue={
            (router.query.order as PostOrderType) || DATA_ORDER_OPTIONS[0].value
          }
          onChange={handleOrderChange}
          size="large"
        />
      </div>

      <ul className="data-list">
        {dataList.map((data) => (
          <li className="data-list-item" key={data.id + shortid()}>
            <Link href={`/data/${data.id}`} shallow={true}>
              <DataCard
                title={data.title}
                content={parse(reomveImgTag(data.content))}
                date={convertServerTimeToKST(data.created_at, 'yy.MM.dd')}
                price={data.data ? data.data.price : 0}
                page={data.data ? data.data.postFile[0].page : 0}
                username={data.user.nickname}
                likeCount={data.likesCount}
              />
            </Link>
          </li>
        ))}
      </ul>
      {isLoading && (
        <div className="data-list-loading-indicator">
          <Spin />
        </div>
      )}
      <div ref={loadingRef} />
    </DataComponentBlock>
  );
};

export default DataComponent;
