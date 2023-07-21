import React, { useState } from 'react';
import styled from 'styled-components';
import DataCard from './DataCard';
import Link from 'next/link';
import { Button, Input, Spin } from 'antd';
import { responsive } from '@lib/utils/responsive';
import shortid from 'shortid';
import useInfinityScroll from '@lib/hooks/useInfinityScroll';

const DataComponentBlock = styled.div`
  padding-bottom: 50px;
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

function waitThreeSeconds(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

const DataComponent: React.FC<DataComponentProps> = () => {
  const [dataList, setDataList] = useState<number[]>(
    Array.from({ length: 5 }, (_, i) => i)
  );
  const fetchData = async () => {
    await waitThreeSeconds();
    setDataList([...dataList, ...Array.from({ length: 5 }, (_, i) => i)]);
    return;
  };
  const { isLoading, loadingRef } = useInfinityScroll({
    loadMore: fetchData,
    hasMore: dataList.length < 100,
  });

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
        {dataList.map((el) => (
          <li className="data-list-item" key={shortid()}>
            <Link href="/data/1" shallow={true}>
              <DataCard />
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
