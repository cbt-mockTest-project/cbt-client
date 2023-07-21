import React, { useEffect } from 'react';
import styled from 'styled-components';
import DataCard from './DataCard';
import Link from 'next/link';
import { Button, Input, Spin } from 'antd';
import { responsive } from '@lib/utils/responsive';
import useInfinityScroll from '@lib/hooks/useInfinityScroll';
import parse from 'html-react-parser';
import { useLazyReadPosts } from '@lib/graphql/user/hook/usePost';
import { Post, PostCategory } from 'types';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { dataActions } from '@modules/redux/slices/data';
import { useRouter } from 'next/router';
import { convertToKST, isServer } from '@lib/utils/utils';

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
  @media (max-width: ${responsive.medium}) {
    padding: 20px 10px;
  }
`;

interface DataComponentProps {}

const DataComponent: React.FC<DataComponentProps> = () => {
  const router = useRouter();
  const [readPosts, { data: postsQuery }] = useLazyReadPosts();
  const dataList = useAppSelector((state) => state.data.dataList);
  const dataListQuery = useAppSelector((state) => state.data.dataListQuery);
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    const res = await readPosts({
      variables: {
        input: {
          limit: 10,
          page: dataListQuery.page,
          category: PostCategory.Data,
        },
      },
    });
    if (res.data?.readPosts.ok && res.data.readPosts.posts) {
      dispatch(
        dataActions.setDataListQuery({
          ...dataListQuery,
          page: dataListQuery.page + 1,
          totalCount: res.data ? res.data.readPosts.count : 1,
        })
      );
      dispatch(
        dataActions.setDataList([
          ...dataList,
          ...(res.data?.readPosts.posts as Post[]),
        ])
      );
    }
    return;
  };
  const { isLoading, loadingRef } = useInfinityScroll({
    loadMore: fetchData,
    hasMore: dataList.length < dataListQuery.totalCount,
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

  return (
    <DataComponentBlock>
      <Input.Search
        className="data-search-input"
        size="large"
        placeholder="자료를 검색해보세요."
      />
      <Link href="/data/register">
        <Button
          className="data-search-register-button"
          type="primary"
          size="large"
        >
          자료 등록하기
        </Button>
      </Link>
      <ul className="data-list">
        {dataList.map((data) => (
          <li className="data-list-item" key={data.id}>
            <Link href={`/data/${data.id}`} shallow={true}>
              <DataCard
                title={data.title}
                content={parse(data.content)}
                date={convertToKST(data.created_at, 'yy.MM.dd')}
                price={data.data ? data.data.price : 0}
                page={data.data ? data.data.postFile[0].page : 0}
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
