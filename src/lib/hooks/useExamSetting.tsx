import { examSettingActions } from '@modules/redux/slices/examSetting';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { ExamSettingType } from 'customTypes';
import { MockExam } from 'types';

interface UseExamSettingProps {
  categoryId: number;
  exams: MockExam[];
}

const useExamSetting = ({ categoryId, exams }: UseExamSettingProps) => {
  const dispatch = useAppDispatch();
  const handleAllExamsSelect = () =>
    dispatch(
      examSettingActions.toggleExamAllSelect({
        categoryId,
        examIds: exams.map((exam) => exam.id),
      })
    );

  const handleExamSelect = (examId: number) =>
    dispatch(examSettingActions.toggleExamSelect({ examId, categoryId }));

  const setExamSetting = (examSetting: Partial<ExamSettingType>) =>
    dispatch(examSettingActions.setExamSetting(examSetting));

  return {
    setExamSetting,
    handleAllExamsSelect,
    handleExamSelect,
  };
};

export default useExamSetting;
