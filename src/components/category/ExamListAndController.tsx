import React, { useState } from 'react';
import CategoryControlbar from './CategoryControlbar';
import CategoryMultipleSelectModeControlbar from './CategoryMultipleSelectModeControlbar';
import { MockExamCategory } from 'types';
import useCategoryExamList from './hooks/useCategoryExamList';
import ExamList from './ExamList';

interface ExamListAndControllerProps {
  category: MockExamCategory;
}

const ExamListAndController: React.FC<ExamListAndControllerProps> = ({
  category,
}) => {
  const { handleSearch } = useCategoryExamList();
  const [isOrderChangableMode, setIsOrderChangableMode] = useState(false);

  return (
    <>
      <CategoryControlbar
        textInput={{
          onChangeText: (v) => handleSearch(v),
        }}
      />
      <CategoryMultipleSelectModeControlbar
        category={category}
        setIsOrderChangableMode={setIsOrderChangableMode}
        isOrderChangableMode={isOrderChangableMode}
      />
      <ExamList
        key={String(isOrderChangableMode)}
        category={category}
        isOrderChangableMode={isOrderChangableMode}
      />
    </>
  );
};

export default ExamListAndController;
