import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import styled from 'styled-components';
import ObjectiveStudyTestModeItem from './ObjectiveStudyTestModeItem';
import { useRouter } from 'next/router';
import ObjectiveStudyOmrCard from './ObjectiveStudyOmrCard';

const ObjectiveStudyTestModeBlock = styled.div`
  display: flex;
  width: 100%;
  .objective-study-test-mode-wrapper {
    width: 100%;
    display: flex;

    .objective-study-test-mode-item-wrapper {
      height: calc(100vh - 200px);
      overflow: auto;
      flex: 1;
      &:first-child {
        border-right: 1px solid ${({ theme }) => theme.color('colorBorder')};
      }
    }
  }
`;

interface ObjectiveStudyTestModeProps {}

const ObjectiveStudyTestMode: React.FC<ObjectiveStudyTestModeProps> = () => {
  const router = useRouter();
  const page = router.query.p || 1;
  const questionIds = useAppSelector((state) =>
    state.mockExam.questions.map((question) => question.id)
  );
  return (
    <ObjectiveStudyTestModeBlock>
      <div className="objective-study-test-mode-wrapper">
        {questionIds
          .slice((Number(page) - 1) * 2, Number(page) * 2)
          .map((id, index) => (
            <div key={id} className="objective-study-test-mode-item-wrapper">
              <ObjectiveStudyTestModeItem
                questionId={id}
                index={index + (Number(page) - 1) * 2 + 1}
              />
            </div>
          ))}
      </div>
      <ObjectiveStudyOmrCard />
    </ObjectiveStudyTestModeBlock>
  );
};

export default ObjectiveStudyTestMode;
