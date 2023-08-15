import {
  useReadExamTitles,
  useReadMyExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { handleError } from '@lib/utils/utils';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

interface RandomMyExamSelectorProps {
  selectedMyCategory: DefaultOptionType | null;
  selectedMyTitles: number[];
  setSelectedMyCategory: React.Dispatch<
    React.SetStateAction<DefaultOptionType | null>
  >;
  setSelectedMyTitles: React.Dispatch<React.SetStateAction<number[]>>;
}

const RandomMyExamSelector: React.FC<RandomMyExamSelectorProps> = ({
  selectedMyCategory,
  selectedMyTitles,
  setSelectedMyCategory,
  setSelectedMyTitles,
}) => {
  const { data: categoriesQuery, loading: readCategoriesLoading } =
    useReadMyExamCategories('viewer');
  const [readTitles, { data: examTitlesQuery, loading: readTitlesLoading }] =
    useReadExamTitles();
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);

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
      setTitles(() => [
        { value: 0, label: '전체' },
        ...examTitlesQuery.readMockExamTitlesByCateory.titles.map((title) => ({
          label: title.slug || title.title,
          value: title.id,
        })),
      ]);
    }
  }, [examTitlesQuery]);

  const requestCategorySelect = async (category: DefaultOptionType) => {
    try {
      setSelectedMyCategory(category);
      setSelectedMyTitles([]);
      await readTitles({
        variables: { input: { name: category.label as string, all: true } },
      });
    } catch (e) {
      handleError(e);
    }
  };

  const onChangeExam = (value: number[]) => {
    if (value.includes(0)) {
      const allTitleIds = titles
        .map((title) => Number(title.value))
        .filter((el) => el !== 0);
      if (allTitleIds.length + 1 === value.length) {
        setSelectedMyTitles([]);
        return;
      }
      setSelectedMyTitles(allTitleIds);

      return;
    }

    setSelectedMyTitles(value);
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
        mode="multiple"
        options={titles}
        value={selectedMyTitles}
        loading={readTitlesLoading}
        onChange={onChangeExam}
        placeholder="시험을 추가해주세요."
      />
    </>
  );
};

export default RandomMyExamSelector;
