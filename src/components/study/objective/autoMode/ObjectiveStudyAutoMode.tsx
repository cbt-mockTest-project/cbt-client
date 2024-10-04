import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useIsMobile from '@lib/hooks/useIsMobile';
import { responsive } from '@lib/utils/responsive';
import ObjectiveStudyTestModeItem from '../testMode/ObjectiveStudyTestModeItem';
import ObjectiveStudyOmrCard from '../testMode/ObjectiveStudyOmrCard';
import ObjectiveStudyAutoModeItem from './ObjectiveStudyAutoModeItem';

const ObjectiveStudyAutoModeBlock = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: auto;

  .objective-study-test-mode-wrapper {
    width: 100%;
    display: flex;

    .objective-study-test-mode-item-wrapper {
      height: calc(100vh - 200px);
      overflow: auto;
      flex: 1;
      &:first-child {
        border-right: 1px solid ${({ theme }) => theme.color('colorBorder')};

        @media (max-width: ${responsive.medium}) {
          border-right: none;
        }
      }

      @media (max-width: ${responsive.medium}) {
        height: calc(100vh - 150px);
      }
    }
  }
`;

interface ObjectiveStudyAutoModeProps {}

const ObjectiveStudyAutoMode: React.FC<ObjectiveStudyAutoModeProps> = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const page = router.query.p || 1;
  const questionIds = useAppSelector((state) =>
    state.mockExam.questions.map((question) => question.id)
  );
  return (
    <ObjectiveStudyAutoModeBlock>
      <div className="objective-study-test-mode-wrapper">
        {isMobile
          ? questionIds
              .slice((Number(page) - 1) * 1, Number(page) * 1)
              .map((id, index) => (
                <div
                  key={id}
                  className="objective-study-test-mode-item-wrapper"
                >
                  <ObjectiveStudyAutoModeItem
                    questionId={id}
                    index={index + (Number(page) - 1) * 1 + 1}
                  />
                </div>
              ))
          : questionIds
              .slice((Number(page) - 1) * 2, Number(page) * 2)
              .map((id, index) => (
                <div
                  key={id}
                  className="objective-study-test-mode-item-wrapper"
                >
                  <ObjectiveStudyAutoModeItem
                    questionId={id}
                    index={index + (Number(page) - 1) * 2 + 1}
                  />
                </div>
              ))}
      </div>
      {!isMobile && <ObjectiveStudyOmrCard />}
    </ObjectiveStudyAutoModeBlock>
  );
};

export default ObjectiveStudyAutoMode;
