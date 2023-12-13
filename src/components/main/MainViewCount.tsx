import { useReadVisitHistory } from '@lib/graphql/hook/useVisit';
import palette from '@styles/palette';
import { skeletonStyle } from '@styles/utils';
import React from 'react';
import styled, { css } from 'styled-components';
import MainViewCountSkeleton from './MainViewCountSkeleton';

interface MainViewCountProps {}

const MainViewCount: React.FC<MainViewCountProps> = () => {
  const { data: readVisitHistoryQuery } = useReadVisitHistory();
  if (!readVisitHistoryQuery) {
    return <MainViewCountSkeleton />;
  }
  return (
    <MainViewCountContainer>
      <div className="home-visit-count-box">{`오늘 방문자 수: ${readVisitHistoryQuery?.readVisitHistory.today}명`}</div>
      {/* <div className="home-visit-count-box">{`어제 ${readVisitHistoryQuery?.readVisitHistory.yesterday}`}</div>
      <div className="home-visit-count-box">{`전체 ${readVisitHistoryQuery?.readVisitHistory.total}`}</div> */}
    </MainViewCountContainer>
  );
};

export default MainViewCount;

const MainViewCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 32px;
  .home-visit-count-box {
    padding: 5px 0;
    text-align: right;
    font-size: 0.8rem;
    color: ${palette.gray_700};
  }
`;
