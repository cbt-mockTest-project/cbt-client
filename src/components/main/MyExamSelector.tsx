import {
  useReadExamTitles,
  useReadMyExamCategories,
} from '@lib/graphql/hook/useExam';
import { handleError } from '@lib/utils/utils';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

interface MyExamSelectorProps {
  selectedMyCategory: DefaultOptionType | null;
  selectedMyTitle: DefaultOptionType | null;
  setSelectedMyCategory: React.Dispatch<
    React.SetStateAction<DefaultOptionType | null>
  >;
  setSelectedMyTitle: React.Dispatch<
    React.SetStateAction<DefaultOptionType | null>
  >;
}

const MyExamSelector: React.FC<MyExamSelectorProps> = ({
  selectedMyCategory,
  selectedMyTitle,
  setSelectedMyCategory,
  setSelectedMyTitle,
}) => {
  const { data: categoriesQuery, loading: readCategoriesLoading } =
    useReadMyExamCategories('viewer');
  const [readTitles, { data: examTitlesQuery, loading: readTitlesLoading }] =
    useReadExamTitles();
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    if (
      categoriesQuery &&
      categoriesQuery.readMyMockExamCategories.categories &&
      selectedMyCategory
    ) {
      readTitles({
        variables: {
          input: { name: selectedMyCategory?.label as string, all: true },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (categoriesQuery && categoriesQuery.readMyMockExamCategories) {
      setCategories(() =>
        categoriesQuery?.readMyMockExamCategories.categories.map(
          (category) => ({
            label: category.name,
            value: category.id,
          })
        )
      );
    }
  }, [categoriesQuery]);

  useEffect(() => {
    if (examTitlesQuery && examTitlesQuery.readMockExamTitlesByCateory) {
      setTitles(() =>
        examTitlesQuery.readMockExamTitlesByCateory.titles.map((title) => ({
          label: title.title,
          value: title.id,
        }))
      );
    }
  }, [examTitlesQuery]);

  const requestCategorySelect = async (category: DefaultOptionType) => {
    try {
      setSelectedMyCategory(category);
      setSelectedMyTitle(null);
      await readTitles({
        variables: { input: { name: category.label as string, all: true } },
      });
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <>
      <Select
        size="large"
        options={categories}
        value={selectedMyCategory}
        loading={readCategoriesLoading}
        onChange={(value, option) =>
          requestCategorySelect(option as DefaultOptionType)
        }
        placeholder="카테고리를 선택해주세요."
      />
      <Select
        size="large"
        options={titles}
        value={selectedMyTitle}
        loading={readTitlesLoading}
        onChange={(value, option) =>
          setSelectedMyTitle(option as DefaultOptionType)
        }
        placeholder="시험을 선택해주세요."
      />
    </>
  );
};

export default MyExamSelector;
