import {
  useReadVisitCount,
  useReadVisitHistory,
} from '@lib/graphql/hook/useVisit';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import MainViewCountSkeleton from './MainViewCountSkeleton';

interface MainViewCountProps {}

const MainViewCount: React.FC<MainViewCountProps> = () => {
  const { data } = useReadVisitCount();
  if (!data) {
    return <MainViewCountSkeleton />;
  }
  return (
    <MainViewCountContainer>
      <div className="home-visit-count-box">{`오늘 방문자: ${data?.readVisitCount.count}`}</div>
    </MainViewCountContainer>
  );
};

export default MainViewCount;

const MainViewCountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 26px;
  .home-visit-count-box {
    text-align: right;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
`;
