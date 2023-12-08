import { EXAM_SETTINGS } from '@lib/constants';
import { LocalStorage } from '@lib/utils/localStorage';
import { ExamSettingType } from 'customTypes';

const useExamSettingHistory = () => {
  const localStorage = new LocalStorage();

  const getExamSettingHistory = (categoryId: number) => {
    const examSettingHistory: ExamSettingType[] =
      localStorage.get(EXAM_SETTINGS) || [];
    const examSetting = examSettingHistory.find(
      (setting) => setting.categoryId === categoryId
    );
    return examSetting;
  };

  const setExamSettingHistory = (examSetting: Partial<ExamSettingType>) => {
    const prevExamSettings: Partial<ExamSettingType>[] =
      localStorage.get(EXAM_SETTINGS) || [];
    const settingIndex = prevExamSettings.findIndex(
      (setting) => setting.categoryId === examSetting.categoryId
    );
    if (settingIndex !== -1) {
      prevExamSettings[settingIndex] = {
        ...prevExamSettings[settingIndex],
        ...examSetting,
      };
    } else {
      prevExamSettings.push(examSetting);
    }
    localStorage.set(EXAM_SETTINGS, prevExamSettings);
  };

  return {
    getExamSettingHistory,
    setExamSettingHistory,
  };
};

export default useExamSettingHistory;
