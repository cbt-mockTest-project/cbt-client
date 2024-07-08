import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

interface CommunityPaginationProps {
  total: number;
}

const CommunityPagination: React.FC<CommunityPaginationProps> = ({ total }) => {
  const router = useRouter();
  const onChangePage = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, p: page },
    });
  };
  return (
    <CommunityPaginationBlock>
      <Pagination
        size="small"
        total={total}
        current={Number(router.query.p) || 1}
        defaultPageSize={8}
        onChange={onChangePage}
      />
    </CommunityPaginationBlock>
  );
};

export default CommunityPagination;
const CommunityPaginationBlock = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
