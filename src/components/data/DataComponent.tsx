import React from 'react';
import styled from 'styled-components';
import DataCard from './DataCard';
import Link from 'next/link';
import { Button, Input, Pagination } from 'antd';
import { responsive } from '@lib/utils/responsive';

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
  @media (max-width: ${responsive.medium}) {
    padding: 20px 10px;
  }
`;

interface DataComponentProps {}

const DataComponent: React.FC<DataComponentProps> = () => {
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
        {Array.from({ length: 6 }, (_, i) => i).map((el) => (
          <li className="data-list-item" key={el}>
            <Link href="/data/1">
              <DataCard />
            </Link>
          </li>
        ))}
      </ul>
      <div className="data-pagination-wrapper">
        <Pagination total={600} current={1} defaultPageSize={6} />
      </div>
    </DataComponentBlock>
  );
};

export default DataComponent;
