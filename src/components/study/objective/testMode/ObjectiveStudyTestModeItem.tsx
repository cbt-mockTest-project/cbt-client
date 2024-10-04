import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import useQuestions, {
  HandleDeleteBookmark,
  HandleSaveBookmark,
} from '@lib/hooks/useQuestions';

import ObjectiveStudyItem from '../ObjectiveStudyItem';

interface ObjectiveStudyTestModeItemProps {
  questionId?: number;
  index: number;
  isSolutionVisible?: boolean;
  readOnly?: boolean;
  autoMode?: boolean;
  hasAddMemoButton?: boolean;
}

const ObjectiveStudyTestModeItem: React.FC<ObjectiveStudyTestModeItemProps> = ({
  questionId,
  index,
  isSolutionVisible = false,
  readOnly = false,
  autoMode = false,
  hasAddMemoButton = true,
}) => {
  const { saveBookmark, deleteBookmark } = useQuestions();
  const question = useAppSelector((state) =>
    state.mockExam.questions.find((question) => question.id === questionId)
  );

  if (!question) return null;
  return (
    <ObjectiveStudyItem
      question={question}
      index={index}
      autoMode={autoMode}
      hasAddMemoButton={hasAddMemoButton}
      handleSaveBookmark={saveBookmark}
      handleDeleteBookmark={deleteBookmark}
      isSolutionVisible={isSolutionVisible}
      readOnly={readOnly}
    />
  );
};

export default ObjectiveStudyTestModeItem;
