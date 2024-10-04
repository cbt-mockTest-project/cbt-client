import React from 'react';
import HomeFolderList from '../HomeFolderList';
import { useQuery } from '@tanstack/react-query';
import { ExamSource, ExamType, MockExamCategory } from 'types';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';

interface BetaFolderListProps {}

const BetaFolderList: React.FC<BetaFolderListProps> = () => {
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.objective,
      input: {
        examSources: [ExamSource.MoudCbt, ExamSource.User],
        examType: ExamType.Objective,
        limit: 30,
      },
    })
  );

  return (
    <HomeFolderList
      categories={data as MockExamCategory[]}
      subTitle=""
      title="객관식 암기장(베타)"
      unikeyKey="modu-storage"
    />
  );
};

export default BetaFolderList;
