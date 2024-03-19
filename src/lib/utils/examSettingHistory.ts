import { ExamSettingType } from 'customTypes';
import { LocalStorage } from './localStorage';
import { EXAM_SETTINGS } from '@lib/constants';

export const getExamSettingHistory = (categoryId: number) => {
  const localStorage = new LocalStorage();
  const examSettingHistory: ExamSettingType[] =
    localStorage.get(EXAM_SETTINGS) || [];
  const examSetting = examSettingHistory.find(
    (setting) => setting.categoryId === categoryId
  );
  return examSetting;
};

export const setExamSettingHistory = (
  examSetting: Partial<ExamSettingType>
) => {
  const localStorage = new LocalStorage();
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
