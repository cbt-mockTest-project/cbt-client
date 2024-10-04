import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import useQuestions from '@lib/hooks/useQuestions';

import ObjectiveStudyItem from '../ObjectiveStudyItem';

interface ObjectiveStudyAutoModeItemProps {
  questionId?: number;
  index: number;
  readOnly?: boolean;
}

const ObjectiveStudyAutoModeItem: React.FC<ObjectiveStudyAutoModeItemProps> = ({
  questionId,
  index,
  readOnly = false,
}) => {
  const { saveBookmark, deleteBookmark } = useQuestions();
  const question = useAppSelector((state) =>
    state.mockExam.questions.find((question) => question.id === questionId)
  );

  if (!question) return null;
  return (
    <ObjectiveStudyItem
      readOnly={readOnly}
      question={question}
      index={index}
      handleSaveBookmark={saveBookmark}
      handleDeleteBookmark={deleteBookmark}
      hasAddMemoButton
      isSolutionVisible
      autoMode
    />
  );
};

export default ObjectiveStudyAutoModeItem;
