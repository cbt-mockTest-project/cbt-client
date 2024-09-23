import React from 'react';
import HomeFolderList from '../HomeFolderList';
import { useQuery } from '@tanstack/react-query';
import { ExamSource, MockExamCategory } from 'types';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';

interface PopularFolderListProps {}

const PopularFolderList: React.FC<PopularFolderListProps> = () => {
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.popular,
      input: {
        examSources: [ExamSource.MoudCbt, ExamSource.User],
        limit: 30,
      },
      enabled: false,
    })
  );

  return (
    <HomeFolderList
      categories={data as MockExamCategory[]}
      subTitle=""
      title="인기 암기장 🔥"
      unikeyKey="modu-storage"
    />
  );
};

export default PopularFolderList;
