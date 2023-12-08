import { examSettingActions } from '@modules/redux/slices/examSetting';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { ExamSettingType } from 'customTypes';
import useExamSettingHistory from './useExamSettingHistory';
import { MockExamCategory } from 'types';

interface UseExamSettingProps {
  category: MockExamCategory;
}

const useExamSetting = ({ category }: UseExamSettingProps) => {
  const examSetting = useAppSelector((state) => state.examSetting.examSetting);
  const dispatch = useAppDispatch();

  const { setExamSettingHistory } = useExamSettingHistory();

  const handleAllExamsSelect = () => {
    if (category.mockExam.length === examSetting.examIds?.length) {
      setExamSetting({ categoryId: category.id, examIds: [] });
      setExamSettingHistory({
        categoryId: category.id,
        examIds: [],
      });
    } else {
      const examIds = category.mockExam.map((exam) => exam.id);
      setExamSetting({ categoryId: category.id, examIds });
      setExamSettingHistory({
        categoryId: category.id,
        examIds: examIds,
      });
    }
  };

  const handleExamSelect = (examId: number) => {
    if (examSetting.examIds.includes(examId)) {
      const newSelectedExamIds = examSetting.examIds.filter(
        (id) => id !== examId
      );
      setExamSetting({ categoryId: category.id, examIds: newSelectedExamIds });
      setExamSettingHistory({
        categoryId: category.id,
        examIds: newSelectedExamIds,
      });
    } else {
      const newSelectedExamIds = [...examSetting.examIds, examId];
      setExamSetting({ categoryId: category.id, examIds: newSelectedExamIds });
      setExamSettingHistory({
        categoryId: category.id,
        examIds: newSelectedExamIds,
      });
    }
  };

  const handleChangeMultipleSelectMode = () => {
    setExamSetting({
      categoryId: category.id,
      isMultipleSelectMode: !examSetting.isMultipleSelectMode,
    });
    setExamSettingHistory({
      categoryId: category.id,
      isMultipleSelectMode: !examSetting.isMultipleSelectMode,
    });
  };

  const setExamSetting = (examSetting: Partial<ExamSettingType>) =>
    dispatch(examSettingActions.setExamSetting(examSetting));

  return {
    setExamSetting,
    examSetting,
    handleAllExamsSelect,
    handleExamSelect,
    handleChangeMultipleSelectMode,
  };
};

export default useExamSetting;
