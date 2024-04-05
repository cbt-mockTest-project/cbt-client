import useNaverKeywordSearch from '@components/bot/blog/hooks/useNaverKeywordSearchCount';
import { Input, Table } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const SearchKeywordBlock = styled.div`
  .keyword-table {
    margin-top: 20px;
    width: 100%;
  }
`;

interface SearchKeywordProps {}

const SearchKeyword: React.FC<SearchKeywordProps> = () => {
  const router = useRouter();
  const { data, isLoading } = useNaverKeywordSearch();
  return (
    <SearchKeywordBlock>
      <Input.Search
        placeholder="키워드를 입력해주세요."
        enterButton="검색"
        size="large"
        onSearch={(value) => {
          router.push({ query: { ...router.query, q: value } });
        }}
        loading={isLoading}
      />
      <Table
        loading={{
          spinning: isLoading,
        }}
        className="keyword-table"
        dataSource={data}
        bordered
        scroll={{ x: true }}
        columns={keywordColums}
        pagination={{
          pageSize: 10,
        }}
      />
    </SearchKeywordBlock>
  );
};

export default SearchKeyword;

const keywordColums = [
  {
    title: '키워드',
    dataIndex: 'relKeyword',
    key: 'relKeyword',
  },
  {
    title: 'PC',
    dataIndex: 'monthlyPcQcCnt',
    key: 'monthlyPcQcCnt',
  },
  {
    title: 'MOBILE',
    dataIndex: 'monthlyMobileQcCnt',
    key: 'monthlyMobileQcCnt',
  },
];
