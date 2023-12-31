import CategoryControlbar from '@components/category/CategoryControlbar';
import CategoryEmpty from '@components/category/CategoryEmpty';
import CategoryHeader from '@components/category/CategoryHeader';
import EditExamsModal from '@components/category/EditExamsModal';
import ExamList from '@components/category/ExamList';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useExamCategory from '@lib/hooks/useExamCategory';
import useExamSetting from '@lib/hooks/useExamSetting';
import useMyAllExams from '@lib/hooks/useMyAllExams';
import { responsive } from '@lib/utils/responsive';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AllExamList from './AllExamList';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';
import CategoryMultipleSelectModeControlbar from '@components/category/CategoryMultipleSelectModeControlbar';

const MyAllExamsComponentBlock = styled.div`
  padding: 30px;
  position: relative;
  .edit-exams-filter-select {
    width: 150px;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 20px 16px;
  }
`;
export type MyExamType = 'me' | 'bookmarked';

interface MyAllExamsComponentProps {}

const MyAllExamsComponent: React.FC<MyAllExamsComponentProps> = () => {
  const { data: meQuery } = useMeQuery();
  const router = useRouter();
  const { fetchMyExams, exams, originalExams, handleFilterExams } =
    useMyAllExams();
  const {
    examSetting,
    handleChangeMultipleSelectMode,
    handleAllExamsSelect,
    setExamSetting,
  } = useExamSetting({
    categoryId: 0,
    exams,
  });
  const { getExamSettingHistory, setExamSettingHistory } =
    useExamSettingHistory();
  const examType = router.query.bookmarked === 'true' ? 'bookmarked' : 'me';
  const handleSelectExamType = (value: string) => {
    setExamSettingHistory({
      categoryId: 0,
      examIds: [],
    });
    setExamSetting({
      categoryId: 0,
      examIds: [],
    });
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        bookmarked: value === 'bookmarked' ? 'true' : 'false',
      },
    });
  };
  const examTypeOptions = [
    {
      label: '내 시험지',
      value: 'me',
    },
    {
      label: '저장된',
      value: 'bookmarked',
    },
  ];

  useEffect(() => {
    if (!meQuery.me.user) return;
    fetchMyExams();
  }, [meQuery, examType]);

  useEffect(() => {
    const examSetting = getExamSettingHistory(0);
    if (!examSetting) return;
    const { examIds, isMultipleSelectMode } = examSetting;
    if (examIds) setExamSetting({ categoryId: 0, examIds });
    if (isMultipleSelectMode)
      setExamSetting({ categoryId: 0, isMultipleSelectMode });
  }, []);

  return (
    <MyAllExamsComponentBlock>
      <CategoryHeader
        userName={meQuery.me.user.nickname}
        categoryName="내 전체 시험지"
        categoryDescription="내가 만든 시험지들을 모두 볼 수 있습니다."
      />

      {originalExams && originalExams.length >= 1 ? (
        <>
          <CategoryControlbar
            switch={{
              checked: examSetting.isMultipleSelectMode,
              onChangeSwitch: handleChangeMultipleSelectMode,
            }}
            textInput={{
              onChangeText: handleFilterExams,
            }}
            additionalFilterComponent={
              <Select
                className="edit-exams-filter-select"
                value={examType}
                options={examTypeOptions}
                onChange={handleSelectExamType}
              />
            }
          />
          {examSetting.isMultipleSelectMode && (
            <CategoryMultipleSelectModeControlbar
              checkbox={{
                categoryAllChecked: exams.length === examSetting.examIds.length,
                handleAllExamsSelect,
              }}
              button={{
                isButtonDisabled: examSetting.examIds.length === 0,
              }}
              categoryId={0}
              examIds={examSetting.examIds}
            />
          )}
          <AllExamList examType={examType} />
        </>
      ) : (
        <>
          <Select
            className="edit-exams-filter-select"
            style={{ marginTop: '20px' }}
            value={examType}
            options={examTypeOptions}
            onChange={handleSelectExamType}
          />
          <CategoryEmpty
            hasButton={true}
            handleButtonClick={() => {
              router.push('/exam/create');
            }}
          />
        </>
      )}
    </MyAllExamsComponentBlock>
  );
};

export default MyAllExamsComponent;
