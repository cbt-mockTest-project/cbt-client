import CategoryControlbar from '@components/category/CategoryControlbar';
import CategoryEmpty from '@components/category/CategoryEmpty';
import CategoryHeader from '@components/category/CategoryHeader';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useExamSetting from '@lib/hooks/useExamSetting';
import useMyAllExams from '@lib/hooks/useMyAllExams';
import { responsive } from '@lib/utils/responsive';
import { Dropdown, MenuProps, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import AllExamList from './AllExamList';
import useExamSettingHistory from '@lib/hooks/useExamSettingHistory';
import CategoryMultipleSelectModeControlbar from '@components/category/CategoryMultipleSelectModeControlbar';
import { EllipsisOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import { useLazyGetMyAllExamCategoriesLearningProgress } from '@lib/graphql/hook/useExam';
import CategoryLearningProgress from '@components/category/CategoryLearningProgress';
import { User } from 'types';

const MyAllExamsComponentBlock = styled.div`
  padding: 30px;
  position: relative;
  .edit-exams-filter-select {
    width: 150px;
  }
  .all-exams-setting-button-wrapper {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid ${palette.colorBorder};
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in;
    svg {
      font-size: 24px;
      color: ${palette.colorText};
    }
    &:hover {
      border-color: ${palette.antd_blue_02};
      svg {
        color: ${palette.antd_blue_02};
      }
    }
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

  const [
    getExamCategoryLearningProgress,
    { data: categoryLearningProgressResponse },
  ] = useLazyGetMyAllExamCategoriesLearningProgress();

  const categoryLearningProgress = useMemo(() => {
    if (!categoryLearningProgressResponse) return null;
    const {
      getMyAllExamCategoriesLearningProgress: {
        highScoreCount,
        lowScoreCount,
        totalQuestionCount,
      },
    } = categoryLearningProgressResponse;
    return {
      learningProgress: Math.round((highScoreCount / totalQuestionCount) * 100),
      highScoreCount,
      lowScoreCount,
      totalQuestionCount,
    };
  }, [categoryLearningProgressResponse]);

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
    getExamCategoryLearningProgress();
    fetchMyExams();
  }, [meQuery, examType]);

  useEffect(() => {
    fetchMyExams(true);
    const examSetting = getExamSettingHistory(0);
    if (!examSetting) return;
    const { examIds, isMultipleSelectMode } = examSetting;
    if (examIds) setExamSetting({ categoryId: 0, examIds });
    if (isMultipleSelectMode)
      setExamSetting({ categoryId: 0, isMultipleSelectMode });
  }, [router.pathname]);

  const categorySettingDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <button
          style={{ color: palette.colorText }}
          onClick={() => router.push('/exam/create')}
        >
          시험지 추가하기
        </button>
      ),
    },
  ];

  return (
    <MyAllExamsComponentBlock>
      <CategoryLearningProgress
        categoryLearningProgress={categoryLearningProgress}
      />
      <CategoryHeader
        user={meQuery.me.user as User}
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
      <Dropdown
        menu={{ items: categorySettingDropdownItems }}
        placement="bottomRight"
      >
        <div
          className="all-exams-setting-button-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisOutlined />
        </div>
      </Dropdown>
    </MyAllExamsComponentBlock>
  );
};

export default MyAllExamsComponent;
