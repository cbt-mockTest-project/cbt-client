import { Button, Tooltip } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LoopIcon from '@mui/icons-material/Loop';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ReadQuestionsByExamIdsInput } from 'types';
import { responsive } from '@lib/utils/responsive';
import useQuestions from '@lib/hooks/useQuestions';
import SelectStudyModeModal from './SelectStudyModeModal';
import StudyPaymentGuard from '@components/study/StudyPaymentGuard';
import { useRouter } from 'next/router';
import SolutionModeCardItemList from './SolutionModeCardItemList';

const SolutionModeComponentBlock = styled.div`
  .solution-mode-body {
    max-width: 1280px;
    margin: 0 auto;
  }

  .solution-mode-control-button-wrapper {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    .solution-mode-control-button-inner {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
    }
  }

  @media (max-width: ${responsive.medium}) {
    .solution-mode-body {
      padding: 10px;
    }
  }
`;

interface SolutionModeComponentProps {
  questionsQueryInput?: ReadQuestionsByExamIdsInput;
}

const SolutionModeComponent: React.FC<SolutionModeComponentProps> = ({
  questionsQueryInput,
}) => {
  const {
    questions: clientSideQuestions,
    serverSideQuestions,
    shuffleQuestions,
    fetchQuestions,
    setServerSideQuestions,
  } = useQuestions();

  const router = useRouter();
  const examIdsQuery = router.query.examIds;
  const [isAnswerAllHidden, setIsAnswerAllHidden] = useState(false);
  const [isSelectStudyModeModalOpen, setIsSelectStudyModeModalOpen] =
    useState(false);
  const examIds = useMemo(() => {
    if (questionsQueryInput) return questionsQueryInput.ids;
    if (typeof examIdsQuery === 'string') {
      return examIdsQuery.split(',').map((id) => parseInt(id));
    }
    return null;
  }, [questionsQueryInput, examIdsQuery]);

  useEffect(() => {
    if (questionsQueryInput) {
      fetchQuestions(questionsQueryInput, 'network-only').then(() => {
        setServerSideQuestions(null);
      });
    }
  }, []);

  useEffect(() => {
    if (clientSideQuestions.length > 0 && serverSideQuestions) {
      setServerSideQuestions(null);
    }
  }, [clientSideQuestions]);
  return (
    <SolutionModeComponentBlock>
      <div className="solution-mode-body">
        <div className="solution-mode-control-button-wrapper">
          <Tooltip
            title={
              isAnswerAllHidden
                ? '정답을 모두 보이게 합니다. '
                : '정답을 모두 가립니다.'
            }
          >
            <Button onClick={() => setIsAnswerAllHidden(!isAnswerAllHidden)}>
              {isAnswerAllHidden ? (
                <div className="solution-mode-control-button-inner">
                  <VisibilityOffIcon />
                  <span>전체</span>
                </div>
              ) : (
                <div className="solution-mode-control-button-inner">
                  <RemoveRedEyeIcon />
                  <span>전체</span>
                </div>
              )}
            </Button>
          </Tooltip>
          <Tooltip title="문제 순서를 섞습니다.">
            <Button onClick={shuffleQuestions}>
              <div className="solution-mode-control-button-inner">
                <ShuffleIcon />
                섞기
              </div>
            </Button>
          </Tooltip>
        </div>
        <ul className="solution-mode-solution-card-list">
          <SolutionModeCardItemList
            defaultQuestions={serverSideQuestions || clientSideQuestions}
            isAnswerAllHidden={isAnswerAllHidden}
          />
        </ul>
      </div>
      {isSelectStudyModeModalOpen && (
        <SelectStudyModeModal
          open={isSelectStudyModeModalOpen}
          onCancel={() => setIsSelectStudyModeModalOpen(false)}
        />
      )}
      {examIds && <StudyPaymentGuard examIds={examIds} />}
    </SolutionModeComponentBlock>
  );
};

export default SolutionModeComponent;
