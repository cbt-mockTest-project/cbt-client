import {
  useReadExamCategories,
  useReadExamTitles,
  useReadMyExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { handleError } from '@lib/utils/utils';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ExamSource } from 'types';

interface MyExamSelectorProps {
  selectedPartnerCategory: DefaultOptionType | null;
  selectedPartnerTitle: DefaultOptionType | null;
  setSelectedPartnerCategory: React.Dispatch<
    React.SetStateAction<DefaultOptionType | null>
  >;
  setSelectedPartnerTitle: React.Dispatch<
    React.SetStateAction<DefaultOptionType | null>
  >;
}

const PartnerExamSelector: React.FC<MyExamSelectorProps> = ({
  selectedPartnerCategory,
  selectedPartnerTitle,
  setSelectedPartnerCategory,
  setSelectedPartnerTitle,
}) => {
  const { data: categoriesQuery, loading: readCategoriesLoading } =
    useReadExamCategories({ source: ExamSource.EhsMaster });
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
    if (categoriesQuery && categoriesQuery.readMockExamCategories.categories) {
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
      setSelectedPartnerCategory(category);
      setSelectedPartnerTitle(null);
      await readTitles({
        variables: {
          input: {
            name: category.label as string,
          },
        },
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
        value={selectedPartnerCategory}
        loading={readCategoriesLoading}
        onChange={(value, option) =>
          requestCategorySelect(option as DefaultOptionType)
        }
        placeholder="카테고리를 선택해주세요."
      />
      <Select
        size="large"
        options={titles}
        value={selectedPartnerTitle}
        loading={readTitlesLoading}
        onChange={(value, option) =>
          setSelectedPartnerTitle(option as DefaultOptionType)
        }
        placeholder="시험을 선택해주세요."
      />
    </>
  );
};

export default PartnerExamSelector;
