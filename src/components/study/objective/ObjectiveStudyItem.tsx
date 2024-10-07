import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import { App, Button, Image } from 'antd';
import useQuestions, {
  HandleDeleteBookmark,
  HandleSaveBookmark,
} from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import SolutionModeFeedbackList from '@components/solutionMode/SolutionModeFeedbackList';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import QuestionFeedbackModal from '@components/solutionMode/QuestionFeedbackModal';
import { MockExamQuestion, QuestionState } from 'types';
import Bookmark, {
  BookmarkChangeHandler,
} from '@components/common/bookmark/Bookmark';
import ObjectiveStudyTestModeObjectiveItem from './testMode/ObjectiveStudyTestModeObjectiveItem';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { InlineMath } from 'react-katex';
import { renderContentWithKatex } from '@lib/utils/utils';

function transformHtmlString(htmlStr: string) {
  const regex = /<p>(.*?)<\/p>/g;
  const texRegex = /<tex>(.*?)<\/tex>/g;

  const transformedStr = htmlStr
    .replace(regex, (match, p1) => {
      const withoutTags = p1.replace(/<[^>]+>/g, '');
      return withoutTags + '\n';
    })
    .replace(texRegex, (match, p1) => {
      return `<InlineMath math="${p1}" />`;
    });

  return transformedStr;
}

const ObjectiveStudyItemBlock = styled.div<{
  status: ObjectiveStudyItemStatus;
  isExcluded: boolean;
}>`
  padding: 0px 20px;
  font-size: 16px;
  position: relative;
  height: 100%;
  .objective-study-test-mode-item-x-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: black;
    z-index: 10;
  }

  .objective-study-test-mode-item-question-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: ${responsive.medium}) {
      flex-direction: column-reverse;
      gap: 0;
    }

    .objective-study-test-mode-item-question-header-left {
      .objective-study-test-mode-item-question-title-wrapper {
        .objective-study-test-mode-item-question-title {
          font-size: 14px;
          color: ${({ theme }) => theme.color('colorTextTertiary')};
        }
      }
    }

    .objective-study-test-mode-item-question-header-right {
      display: flex;
      align-items: center;
      gap: 10px;

      .objective-study-test-mode-item-question-header-right-button {
        z-index: 11;
        color: ${({ theme }) => theme.color('colorTextTertiary')};
      }
    }
  }

  .objective-study-test-mode-item-question,
  .objective-study-test-mode-item-objective-content {
    ${EditorStyle}
    white-space: pre-line;
  }

  .objective-study-test-mode-item-answer-no-solution {
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    font-size: 14px;
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
  hasInteraction?: boolean;
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
  hasInteraction = true,
}) => {
  const { modal } = App.useApp();
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
    excludeObjectiveQuestion,
    undoExcludeObjectiveQuestion,
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

  const handleExcludeQuestion = () => {
    modal.confirm({
      title: '문제를 제외 하시겠습니까?',
      content: '제외된 문제는 앞으로 출제되지 않습니다.',
      onOk: async () => {
        await excludeObjectiveQuestion(question.id);
      },
      okText: '제외',
      cancelText: '취소',
    });
  };

  const handleUndoExcludeQuestion = () => {
    modal.confirm({
      title: '문제를 복구 하시겠습니까?',
      content: '복구된 문제는 앞으로 출제됩니다.',
      onOk: async () => {
        await undoExcludeObjectiveQuestion(question.id);
      },
    });
  };

  if (!question) return null;

  const isExcluded = question.myQuestionState === QuestionState.Exclude;

  return (
    <ObjectiveStudyItemBlock status={status()} isExcluded={isExcluded}>
      {isExcluded && <div className="objective-study-test-mode-item-x-box" />}
      <div className="objective-study-test-mode-item-question-header">
        <div className="objective-study-test-mode-item-question-header-left">
          <div className="objective-study-test-mode-item-question-title-wrapper">
            <span>{index}. </span>
            <span className="objective-study-test-mode-item-question-title">
              {question.mockExam.title}
            </span>
          </div>
          <pre className="objective-study-test-mode-item-question">
            {renderContentWithKatex(question.question)}
          </pre>
        </div>
        {hasInteraction && (
          <div className="objective-study-test-mode-item-question-header-right">
            <Button
              className="objective-study-test-mode-item-question-header-right-button"
              shape="circle"
              onClick={
                isExcluded ? handleUndoExcludeQuestion : handleExcludeQuestion
              }
            >
              {isExcluded ? <UndoOutlined /> : <DeleteOutlined />}
            </Button>
            <Bookmark
              isActive={question.isBookmarked}
              onChangeBookmark={onChangeBookmark}
            />
          </div>
        )}
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
            readOnly={readOnly}
          />
        ))}
      </div>
      {(readOnly || !!(isSolutionVisible && question.myObjectiveAnswer)) && (
        <div className="objective-study-test-mode-item-answer-wrapper">
          <div className="objective-study-test-mode-item-answer-title">
            해설
          </div>
          <pre className="objective-study-test-mode-item-question">
            {renderContentWithKatex(question.solution)}
          </pre>
          {!question.solution && question.solution_img.length === 0 && (
            <div className="objective-study-test-mode-item-answer-no-solution">
              등록된 해설이 없습니다.
            </div>
          )}
          {question.solution_img && question.solution_img.length > 0 && (
            <Image
              className="objective-study-test-mode-item-question-image"
              src={question.solution_img[0].url}
              alt="문제 이미지"
            />
          )}
          <div>
            {!!myFeedbackList?.length && hasInteraction && (
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
            {!!feedbackListExceptMe?.length && hasInteraction && (
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
          {hasAddMemoButton && hasInteraction && (
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
