import React, { useEffect, useState } from 'react';
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
