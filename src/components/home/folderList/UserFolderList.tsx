import React from 'react';
import HomeFolderList from '../HomeFolderList';
import { useQuery } from '@tanstack/react-query';
import { ExamSource, MockExamCategory } from 'types';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';

interface UserFolderListProps {}

const UserFolderList: React.FC<UserFolderListProps> = () => {
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.main_user,
      input: {
        examSource: ExamSource.User,
        limit: 30,
      },
    })
  );

  return (
    <HomeFolderList
      categories={data as MockExamCategory[]}
      title="공개 암기장 📂"
      subTitle=""
      link="/user-storage"
      unikeyKey="User-storage"
    />
  );
};

export default UserFolderList;
