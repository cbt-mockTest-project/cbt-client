import GoogleAd from '@components/common/ad/GoogleAd';
import Modal from '@components/common/modal/Modal';
import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import { useReadExamHistories } from '@lib/graphql/user/hook/useExamHistory';
import { useResetQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { responsive } from '@lib/utils/responsive';
import {
  convertToKST,
  extractKeysOfCache,
  handleError,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestionState, QuestionState } from 'types';
import ExamHistorySkeleton from './ExamHistorySkeleton';
import ExamHistoryAchievementModal from './ExamHistoryAchievementModal';

const ExamHistory: React.FC = () => {
  const { data: examHistoryQuery, loading: readExamHistoryLoading } =
    useReadExamHistories();

  const [achieveModalState, setAchieveModalState] = useState(false);
  const [examId, setExamId] = useState(0);
  const client = useApollo({}, '');
  const onCheckAchievement = (examId: number) => {
    setExamId(examId);
    onToggleAchieveModalState();
  };
  const onToggleAchieveModalState = () => {
    setAchieveModalState(!achieveModalState);
  };

  if (readExamHistoryLoading || !examHistoryQuery)
    return <ExamHistorySkeleton />;

  return (
    <ExamHistoryContainer>
      <div className="mypage-exam-list-wrapper">
        <h3 className="mypage-exam-list-description">
          풀이모드로 제출한 최근 10개의 시험기록입니다.
        </h3>
        <GoogleAd type="display" />
        <ul>
          {examHistoryQuery.readMyExamHistory.mockExams?.map((el, idx) => (
            <li key={el.id}>
              <div className="mypage-exam-list-title-and-date">
                <span>{el.title}</span>
                <p className="mypage-exam-list-date">
                  {convertToKST(el.updated_at)}
                </p>
              </div>
              <div className="mypage-exam-list-button-wrapper">
                <Button onClick={() => el.id && onCheckAchievement(el.id)}>
                  성취도 확인
                </Button>
                <Button>
                  <Link
                    href={{
                      pathname: '/exam',
                      query: {
                        q: 1,
                        t: el.title,
                        e: el.id,
                        r: false,
                      },
                    }}
                  >
                    다시 풀기
                  </Link>
                </Button>
                <Button>
                  <Link href={`/exam/solution/${el.id}`}>문제/해설</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ExamHistoryAchievementModal
        key={examId}
        open={achieveModalState}
        onClose={onToggleAchieveModalState}
        examId={examId}
        className="achievement-modal-wrapper"
      />
    </ExamHistoryContainer>
  );
};

export default ExamHistory;

const ExamHistoryContainer = styled.div`
  .mypage-exam-list-title-and-date {
    display: flex;
    flex-direction: column;
  }
  .mypage-exam-list-description {
    margin-bottom: 10px;
  }
  .mypage-exam-check-box-group-wrapper {
    position: relative;
    white-space: nowrap;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    .blur {
      background-color: white;
      position: absolute;
      width: 30px;
      right: 0;
      top: 0;
      bottom: 0;
      filter: blur(6px);
    }
  }
  .achievement-modal-result-list {
    padding: 10px 30px;
    max-height: 300px;
  }
  .exam-achievement-result-count-block {
    padding: 10px 50px;
  }
  .mypage-exam-list-wrapper {
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid ${palette.gray_200};
    }
    .mypage-exam-list-date {
      color: ${palette.gray_700};
    }

    .mypage-exam-list-button-wrapper {
      margin: auto 0 auto auto;
      button {
        + button {
          margin-left: 10px;
        }
      }
    }
  }
  .achievement-modal-wrapper {
    padding: 20px 0px 0px 0px;
    .modal-close-button {
      margin: 10px 50px;
    }
    button {
      margin-top: 20px;
      width: 100%;
    }
  }
  @media (max-width: ${responsive.medium}) {
    padding: 0 15px;
    .mypage-exam-list-wrapper {
      margin-top: 20px;
      li {
        font-size: 0.9rem;
        flex-direction: column;
        border-color: ${palette.gray_400};
      }
    }
    .mypage-exam-list-button-wrapper {
      margin: 10px 0 !important;
      button {
        font-size: 0.7rem;
        font-weight: bold;
      }
    }
    .mypage-exam-check-box-group-wrapper {
      margin-top: 20px;
    }
  }
`;
