import React from 'react';
import styled from 'styled-components';
import HomeFolderList from '../HomeFolderList';
import useAuth from '@lib/hooks/useAuth';
import { MockExamCategory } from 'types';
import { useQuery } from '@tanstack/react-query';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';

interface BookmarkedFolderListProps {}

const BookmarkedFolderList: React.FC<BookmarkedFolderListProps> = (props) => {
  const { isLoggedIn } = useAuth();
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.bookmarked,
      input: {
        isBookmarked: true,
      },
      enabled: isLoggedIn,
    })
  );
  if (!isLoggedIn) return <div className="h-[175px]"></div>;

  return (
    <HomeFolderList
      title="저장된 암기장 📌"
      subTitle="저장된 암기장을 모아보세요."
      unikeyKey="bookmarked-storage"
      categories={data as MockExamCategory[]}
    />
  );
};

export default BookmarkedFolderList;
