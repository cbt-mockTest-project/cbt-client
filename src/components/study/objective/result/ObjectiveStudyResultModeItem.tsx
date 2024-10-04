import { useAppSelector } from '@modules/redux/store/configureStore';
import React from 'react';
import useQuestions from '@lib/hooks/useQuestions';

import ObjectiveStudyItem from '../ObjectiveStudyItem';

interface ObjectiveStudyResultModeItemProps {
  questionId: number;
  index: number;
}

const ObjectiveStudyResultModeItem: React.FC<
  ObjectiveStudyResultModeItemProps
> = ({ questionId, index }) => {
  const { saveBookmark, deleteBookmark } = useQuestions();
  const question = useAppSelector((state) =>
    state.mockExam.questions.find((question) => question.id === questionId)
  );

  if (!question) return null;
  return (
    <ObjectiveStudyItem
      question={question}
      index={index}
      handleSaveBookmark={saveBookmark}
      handleDeleteBookmark={deleteBookmark}
      isSolutionVisible
      readOnly
    />
  );
};

export default ObjectiveStudyResultModeItem;
