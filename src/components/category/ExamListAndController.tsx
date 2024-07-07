import React, { useEffect, useState } from 'react';
import CategoryControlbar from './CategoryControlbar';
import CategoryMultipleSelectModeControlbar from './CategoryMultipleSelectModeControlbar';
import ExamList from './ExamList';
import { MockExamCategory } from 'types';
import useCategoryExamList from './hooks/useCategoryExamList';
import { Skeleton } from 'antd';

interface ExamListAndControllerProps {
  category: MockExamCategory;
}

const ExamListAndController: React.FC<ExamListAndControllerProps> = ({
  category,
}) => {
  const [isLazyLoadingComponentVisible, setIsLazyLoadingComponentVisible] =
    useState(false);
  const { handleSearch } = useCategoryExamList();
  useEffect(() => {
    setIsLazyLoadingComponentVisible(true);
  }, []);
  return (
    <>
      <CategoryControlbar
        textInput={{
          onChangeText: (v) => handleSearch(v),
        }}
      />
      <CategoryMultipleSelectModeControlbar category={category} />
      {isLazyLoadingComponentVisible ? (
        <ExamList category={category} />
      ) : (
        <Skeleton active paragraph={{ rows: 5 }} className="mt-[20px]" />
      )}
    </>
  );
};

export default ExamListAndController;
