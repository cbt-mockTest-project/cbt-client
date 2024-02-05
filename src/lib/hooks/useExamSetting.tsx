import { examSettingActions } from '@modules/redux/slices/examSetting';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { ExamSettingType } from 'customTypes';
import useExamSettingHistory from './useExamSettingHistory';
import { MockExam, MockExamCategory } from 'types';

interface UseExamSettingProps {
  categoryId: number;
  exams: MockExam[];
}

const useExamSetting = ({ categoryId, exams }: UseExamSettingProps) => {
  const examSetting = useAppSelector((state) => state.examSetting.examSetting);
  const dispatch = useAppDispatch();

  const { setExamSettingHistory } = useExamSettingHistory();

  const handleAllExamsSelect = () => {
    if (exams.length === examSetting.examIds?.length) {
      setExamSetting({ categoryId, examIds: [] });
      setExamSettingHistory({
        categoryId,
        examIds: [],
      });
    } else {
      const examIds = exams.map((exam) => exam.id);
      setExamSetting({ categoryId, examIds });
      setExamSettingHistory({
        categoryId,
        examIds: examIds,
      });
    }
  };

  const handleExamSelect = (examId: number) => {
    if (examSetting.examIds.includes(examId)) {
      const newSelectedExamIds = examSetting.examIds.filter(
        (id) => id !== examId
      );
      setExamSetting({ categoryId, examIds: newSelectedExamIds });
      setExamSettingHistory({
        categoryId,
        examIds: newSelectedExamIds,
      });
    } else {
      const newSelectedExamIds = [...examSetting.examIds, examId];
      setExamSetting({ categoryId, examIds: newSelectedExamIds });
      setExamSettingHistory({
        categoryId,
        examIds: newSelectedExamIds,
      });
    }
  };

  const setExamSetting = (examSetting: Partial<ExamSettingType>) =>
    dispatch(examSettingActions.setExamSetting(examSetting));

  return {
    setExamSetting,
    examSetting,
    handleAllExamsSelect,
    handleExamSelect,
  };
};

export default useExamSetting;
