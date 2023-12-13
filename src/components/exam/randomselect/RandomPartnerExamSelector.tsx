import {
  useReadExamTitles,
  useReadExamCategories,
} from '@lib/graphql/hook/useExam';
import { handleError } from '@lib/utils/utils';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ExamSource } from 'types';

interface RandomPartnerExamSelectorProps {
  selectedPartnerCategory: DefaultOptionType | null;
  selectedPartnerTitles: number[];
  setSelectedPartnerCategory: React.Dispatch<
    React.SetStateAction<DefaultOptionType | null>
  >;
  setSelectedPartnerTitles: React.Dispatch<React.SetStateAction<number[]>>;
}

const RandomPartnerExamSelector: React.FC<RandomPartnerExamSelectorProps> = ({
  selectedPartnerCategory,
  selectedPartnerTitles,
  setSelectedPartnerCategory,
  setSelectedPartnerTitles,
}) => {
  const { data: categoriesQuery, loading: readCategoriesLoading } =
    useReadExamCategories({
      source: ExamSource.EhsMaster,
    });
  const [readTitles, { data: examTitlesQuery, loading: readTitlesLoading }] =
    useReadExamTitles();
  const [categories, setCategories] = useState<DefaultOptionType[]>([]);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    if (
      categoriesQuery &&
      categoriesQuery.readMockExamCategories.categories &&
      selectedPartnerCategory
    ) {
      readTitles({
        variables: {
          input: {
            name: selectedPartnerCategory?.label as string,
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (categoriesQuery && categoriesQuery.readMockExamCategories) {
      setCategories(() =>
        categoriesQuery?.readMockExamCategories.categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))
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
      setSelectedPartnerCategory(category);
      setSelectedPartnerTitles([]);
      await readTitles({
        variables: { input: { name: category.label as string } },
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
        setSelectedPartnerTitles([]);
        return;
      }
      setSelectedPartnerTitles(allTitleIds);

      return;
    }

    setSelectedPartnerTitles(value);
  };

  return (
    <>
      <Select
        size="large"
        options={categories}
        value={selectedPartnerCategory}
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
        value={selectedPartnerTitles}
        loading={readTitlesLoading}
        onChange={onChangeExam}
        placeholder="시험을 추가해주세요."
      />
    </>
  );
};

export default RandomPartnerExamSelector;
