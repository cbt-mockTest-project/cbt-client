import { useAppSelector } from '@modules/redux/store/configureStore';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import { Button, Image } from 'antd';
import useQuestions, {
  HandleDeleteBookmark,
  HandleSaveBookmark,
} from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import SolutionModeFeedbackList from '@components/solutionMode/SolutionModeFeedbackList';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import { MockExamQuestion } from 'types';
import Bookmark, {
  BookmarkChangeHandler,
} from '@components/common/bookmark/Bookmark';
import ObjectiveStudyTestModeObjectiveItem from './testMode/ObjectiveStudyTestModeObjectiveItem';

const ObjectiveStudyItemBlock = styled.div<{
  status: ObjectiveStudyItemStatus;
}>`
  padding: 0px 20px;
  font-size: 16px;

  .objective-study-test-mode-item-question-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .objective-study-test-mode-item-question-header-left {
      .objective-study-test-mode-item-question-title-wrapper {
        .objective-study-test-mode-item-question-title {
          font-size: 14px;
          color: ${({ theme }) => theme.color('colorTextTertiary')};
        }
      }
    }
  }

  .objective-study-test-mode-item-question,
  .objective-study-test-mode-item-objective-content {
    ${EditorStyle}
    white-space: pre-line;
  }

  .objective-study-test-mode-item-question-image {
    max-width: 730px !important;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    @media (max-width: ${responsive.medium}) {
      max-width: 100% !important;
    }
  }

  .objective-study-test-mode-item-objective-content {
    position: relative;
    top: 3px;
  }

  .objective-study-test-mode-item-objective-list {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .objective-study-test-mode-item-objective {
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      padding: 10px 5px;
      gap: 10px;
    }

    .objective-study-test-mode-item-objective.active {
      ${({ status }) => {
        if (status === 'default') {
          return css`
            background-color: ${({ theme }) => theme.color('colorBgTextHover')};
          `;
        }
        if (status === 'incorrect') {
          return css`
            background-color: ${({ theme }) =>
              theme.color('colorErrorBgHover')};
          `;
        }
      }}
    }

    .objective-study-test-mode-item-objective-image {
      max-width: 730px !important;
      object-fit: contain;
      margin-top: 10px;
      border-radius: 5px;
      margin-left: 0 !important;
      margin-right: 0 !important;
      @media (max-width: ${responsive.medium}) {
        max-width: 100% !important;
      }
    }
  }

  .objective-study-test-mode-item-answer-wrapper {
    padding-top: 15px;
    border-top: 1px solid ${({ theme }) => theme.color('colorSplit')};

    .objective-study-test-mode-item-answer-title {
      font-size: 16px;
      color: ${({ theme }) => theme.color('colorTextTertiary')};
    }

    .objective-study-test-mode-item-answer-feedback-list-wrapper {
      margin-top: 10px;
      border-top: 1px solid ${({ theme }) => theme.color('colorSplit')};
    }

    .objective-study-test-mode-item-answer-add-button-wrapper {
      margin-top: 10px;
      padding-top: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
      border-top: 1px solid ${({ theme }) => theme.color('colorSplit')};
    }
  }
`;

export type ObjectiveStudyItemStatus = 'correct' | 'incorrect' | 'default';

interface ObjectiveStudyItemProps {
  question?: MockExamQuestion;
  questionId?: number;
  index: number;
  isSolutionVisible?: boolean;
  readOnly?: boolean;
  autoMode?: boolean;
  hasAddMemoButton?: boolean;
  handleSaveBookmark?: HandleSaveBookmark;
  handleDeleteBookmark?: HandleDeleteBookmark;
}

const ObjectiveStudyItem: React.FC<ObjectiveStudyItemProps> = ({
  question,
  index,
  isSolutionVisible = false,
  readOnly = false,
  autoMode = false,
  hasAddMemoButton = true,
  handleSaveBookmark,
  handleDeleteBookmark,
}) => {
  const { data: meQuery } = useMeQuery();
  const myFeedbackList = question?.mockExamQuestionFeedback?.filter(
    (feedback) => feedback.user?.id === meQuery?.me?.user?.id
  );
  const feedbackListExceptMe = question?.mockExamQuestionFeedback?.filter(
    (feedback) => feedback.user?.id !== meQuery?.me?.user?.id
  );
  const contentsLength = question.objectiveData.content?.length;
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const {
    addFeedback,
    deleteFeedback,
    editFeedback,
    updateFeedbackRecommendation,
  } = useQuestions();

  const status = () => {
    if (autoMode) {
      if (!question.myObjectiveAnswer) return 'default';
      return question.myObjectiveAnswer !== question.objectiveData.answer
        ? 'incorrect'
        : 'correct';
    }
    if (readOnly) {
      return question.myObjectiveAnswer !== question.objectiveData.answer
        ? 'incorrect'
        : 'correct';
    }
    return 'default';
  };

  const onChangeBookmark: BookmarkChangeHandler = (active, folderId) => {
    if (active) {
      handleSaveBookmark?.(question, folderId || null);
    }
    if (!active) {
      handleDeleteBookmark?.(question);
    }
  };

  if (!question) return null;
  return (
    <ObjectiveStudyItemBlock status={status()}>
      <div className="objective-study-test-mode-item-question-header">
        <div className="objective-study-test-mode-item-question-header-left">
          <div className="objective-study-test-mode-item-question-title-wrapper">
            <span>{index}. </span>
            <span className="objective-study-test-mode-item-question-title">
              {question.mockExam.title}
            </span>
          </div>
          <pre className="objective-study-test-mode-item-question">
            {parse(question.question)}
          </pre>
        </div>
        <Bookmark
          isActive={question.isBookmarked}
          onChangeBookmark={onChangeBookmark}
        />
      </div>
      {question.question_img && question.question_img.length > 0 && (
        <Image
          className="objective-study-test-mode-item-question-image"
          src={question.question_img[0].url}
          alt="문제 이미지"
        />
      )}
      <div className="objective-study-test-mode-item-objective-list">
        {Array.from({ length: contentsLength }).map((_, index) => (
          <ObjectiveStudyTestModeObjectiveItem
            key={index}
            status={status()}
            index={index}
            question={question}
            autoMode={autoMode}
          />
        ))}
      </div>
      {(readOnly || !!(isSolutionVisible && question.myObjectiveAnswer)) && (
        <div className="objective-study-test-mode-item-answer-wrapper">
          <div className="objective-study-test-mode-item-answer-title">
            해설
          </div>
          <pre className="objective-study-test-mode-item-question">
            {parse(question.solution)}
          </pre>
          {question.solution_img && question.solution_img.length > 0 && (
            <Image
              className="objective-study-test-mode-item-question-image"
              src={question.solution_img[0].url}
              alt="문제 이미지"
            />
          )}
          <div>
            {!!myFeedbackList?.length && (
              <div className="objective-study-test-mode-item-answer-feedback-list-wrapper">
                <SolutionModeFeedbackList
                  question={question}
                  editFeedback={editFeedback}
                  addFeedback={addFeedback}
                  deleteFeedback={deleteFeedback}
                  updateFeedbackRecommendation={updateFeedbackRecommendation}
                  feedbackList={myFeedbackList}
                  type="list"
                />
              </div>
            )}
            {!!feedbackListExceptMe?.length && (
              <SolutionModeFeedbackList
                title="추가 해설"
                question={question}
                editFeedback={editFeedback}
                addFeedback={addFeedback}
                deleteFeedback={deleteFeedback}
                updateFeedbackRecommendation={updateFeedbackRecommendation}
                feedbackList={feedbackListExceptMe}
              />
            )}
          </div>
          {hasAddMemoButton && (
            <div
              className="objective-study-test-mode-item-answer-add-button-wrapper"
              onClick={() => setIsFeedbackModalOpen(true)}
            >
              <Button shape="circle">➕</Button>
              <div>메모</div>
            </div>
          )}
        </div>
      )}
      {isFeedbackModalOpen && (
        <QuestionFeedbackModal
          addFeedback={addFeedback}
          editFeedback={editFeedback}
          question={question}
          open={isFeedbackModalOpen}
          onCancel={() => setIsFeedbackModalOpen(false)}
          onClose={() => setIsFeedbackModalOpen(false)}
          title={`${String(question.mockExam?.title)}\n${
            question.number
          }번 문제`}
        />
      )}
    </ObjectiveStudyItemBlock>
  );
};

export default ObjectiveStudyItem;
