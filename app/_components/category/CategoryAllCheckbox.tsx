import useExamSetting from '../../_lib/hooks/useExamSetting';
import { useAppSelector } from '../../_modules/redux/store/configureStore';
import { Checkbox } from 'antd';
import React from 'react';
import { MockExam, MockExamCategory } from '../../types';

interface CategoryAllCheckboxProps {
  categoryId: number;
  exams: MockExam[];
}

const CategoryAllCheckbox: React.FC<CategoryAllCheckboxProps> = ({
  categoryId,
  exams,
}) => {
  const isChecked = useAppSelector(
    (state) => state.examSetting.examSetting.examIds.length === exams.length
  );
  const { handleAllExamsSelect } = useExamSetting({
    categoryId,
    exams,
  });
  return (
    <Checkbox
      className="category-exam-all-checkbox"
      checked={isChecked}
      onClick={handleAllExamsSelect}
    />
  );
};

export default CategoryAllCheckbox;
