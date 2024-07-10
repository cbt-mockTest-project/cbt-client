import React, { useState } from 'react';
import CategoryControlbar from './CategoryControlbar';
import CategoryMultipleSelectModeControlbar from './CategoryMultipleSelectModeControlbar';
import { MockExamCategory } from 'types';
import useCategoryExamList from './hooks/useCategoryExamList';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import Portal from '@components/common/portal/Portal';

const DynamicExamList = dynamic(() => import('./ExamList'), {
  loading: () => (
    <Portal>
      <Spin fullscreen size="large" />
    </Portal>
  ),
});

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
      <DynamicExamList
        key={String(isOrderChangableMode)}
        category={category}
        isOrderChangableMode={isOrderChangableMode}
      />
    </>
  );
};

export default ExamListAndController;
