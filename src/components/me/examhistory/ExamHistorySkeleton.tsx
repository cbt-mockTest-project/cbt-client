import GoogleAd from '@components/common/ad/GoogleAd';
import Modal from '@components/common/modal/Modal';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import { useResetQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { ReadMyExamHistoryQuery } from '@lib/graphql/user/query/examHistoryQuery.generated';
import { responsive } from '@lib/utils/responsive';
import {
  convertWithErrorHandlingFunc,
  extractKeysOfCache,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestionState, QuestionState } from 'types';

const ExamHistorySkeleton: React.FC = () => {
  return (
    <ExamHistorySkeletonContainer>
      <div className="mypage-exam-list-wrapper">
        <ul>
          {[1, 2, 3, 4, 5, 6, 7].map((el, idx) => (
            <li key={el}>
              <SkeletonBox height="30px" width="80%" />
              <SkeletonBox height="30px" width="60%" />
              <SkeletonBox height="30px" width="40%" />
            </li>
          ))}
        </ul>
      </div>
    </ExamHistorySkeletonContainer>
  );
};

export default ExamHistorySkeleton;

const ExamHistorySkeletonContainer = styled.div`
  .mypage-exam-list-wrapper {
    margin-top: 50px;
    li {
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      gap: 10px;
    }
  }

  @media (max-width: ${responsive.medium}) {
    padding: 0 15px;
    .mypage-exam-list-wrapper {
      margin-top: 20px;
    }
  }
`;
