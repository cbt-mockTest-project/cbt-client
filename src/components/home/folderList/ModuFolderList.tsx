import React from 'react';
import HomeFolderList from '../HomeFolderList';
import { useQuery } from '@tanstack/react-query';
import { ExamSource, MockExamCategory } from 'types';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';

interface ModuFolderListProps {}

const ModuFolderList: React.FC<ModuFolderListProps> = () => {
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.main_modu,
      input: {
        examSource: ExamSource.MoudCbt,
        limit: 30,
      },
      enabled: false,
    })
  );

  return (
    <HomeFolderList
      categories={data as MockExamCategory[]}
      subTitle=""
      title="모두CBT 공식 암기장 👀"
      link="/modu-storage"
      unikeyKey="modu-storage"
    />
  );
};

export default ModuFolderList;
