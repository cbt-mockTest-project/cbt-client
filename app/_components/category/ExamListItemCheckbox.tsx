import useExamSetting from '../../_lib/hooks/useExamSetting';
import { useAppSelector } from '../../_modules/redux/store/configureStore';
import { Checkbox } from 'antd';
import React from 'react';
import { MockExam } from '../../types';

interface ExamListItemCheckboxProps {
  categoryId: number;
  examId: number;
  exams: MockExam[];
}

const ExamListItemCheckbox: React.FC<ExamListItemCheckboxProps> = ({
  categoryId,
  examId,
  exams,
}) => {
  const { handleExamSelect } = useExamSetting({
    categoryId,
    exams,
  });
  const checked = useAppSelector(
    (state) =>
      !!state.examSetting.examSetting.examIds.find((id) => id === examId)
  );

  return (
    <Checkbox
      className="exam-list-item-checkbox"
      checked={checked}
      onClick={() => handleExamSelect(examId)}
    />
  );
};

export default ExamListItemCheckbox;
