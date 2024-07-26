import React, { useState } from 'react';
import CategoryMultipleSelectModeControlbar from './CategoryMultipleSelectModeControlbar';
import { MockExamCategory } from 'types';
import ExamList from './ExamList';

interface ExamListAndControllerProps {
  category: MockExamCategory;
}

const ExamListAndController: React.FC<ExamListAndControllerProps> = ({
  category,
}) => {
  const [isOrderChangableMode, setIsOrderChangableMode] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  return (
    <>
      <CategoryMultipleSelectModeControlbar
        category={category}
        setIsOrderChangableMode={setIsOrderChangableMode}
        isOrderChangableMode={isOrderChangableMode}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
      />
      <ExamList
        page={page}
        key={String(isOrderChangableMode)}
        category={category}
        isOrderChangableMode={isOrderChangableMode}
        pageSize={pageSize}
      />
    </>
  );
};

export default ExamListAndController;
