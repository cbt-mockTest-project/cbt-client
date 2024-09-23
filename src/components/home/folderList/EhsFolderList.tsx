import React from 'react';
import HomeFolderList from '../HomeFolderList';
import { useQuery } from '@tanstack/react-query';
import { ExamSource, MockExamCategory } from 'types';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';

interface EhsFolderListProps {}

const EhsFolderList: React.FC<EhsFolderListProps> = () => {
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.premium,
      input: {
        examSources: [ExamSource.EhsMaster],
        limit: 30,
      },
      enabled: false,
    })
  );

  return (
    <HomeFolderList
      categories={data as MockExamCategory[]}
      key="ehs-storage"
      title="직8딴 프리미엄 암기장(기출 중복소거) 📒"
      subTitle="직8딴 시리즈를 모두CBT에서 학습해보세요."
      unikeyKey="modu-storage"
    />
  );
};

export default EhsFolderList;
