import React from 'react';
import CategoryControlbar from './CategoryControlbar';
import CategoryMultipleSelectModeControlbar from './CategoryMultipleSelectModeControlbar';
import ExamList from './ExamList';
import { MockExamCategory } from 'types';
import useCategoryExamList from './hooks/useCategoryExamList';

interface ExamListAndControllerProps {
  category: MockExamCategory;
}

const ExamListAndController: React.FC<ExamListAndControllerProps> = ({
  category,
}) => {
  const { handleSearch } = useCategoryExamList();
  return (
    <>
      <CategoryControlbar
        textInput={{
          onChangeText: (v) => handleSearch(v),
        }}
      />
      <CategoryMultipleSelectModeControlbar category={category} />
      <ExamList category={category} />
    </>
  );
};

export default ExamListAndController;
