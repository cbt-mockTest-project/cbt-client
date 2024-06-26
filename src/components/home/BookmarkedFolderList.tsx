import React, { useEffect } from 'react';
import styled from 'styled-components';
import HomeFolderList, { HomeFolderListProps } from './HomeFolderList';
import { useRouter } from 'next/router';
import useAuth from '@lib/hooks/useAuth';
import useHomeCategories from '@lib/hooks/useHomeCategories';
import { MockExamCategory } from 'types';
import { handleError } from '@lib/utils/utils';
import { useAppSelector } from '@modules/redux/store/configureStore';

const BookmarkedFolderListBlock = styled.div`
  width: 100%;
`;

interface BookmarkedFolderListProps extends Partial<HomeFolderListProps> {
  title: string;
  subTitle: string;
}

const BookmarkedFolderList: React.FC<BookmarkedFolderListProps> = (props) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { ...homeFolderListProps } = props;
  const { fetchCategories, setBookmarkedCategories } = useHomeCategories();
  useEffect(() => {
    if (router.query.type) return;

    if (isLoggedIn) {
      fetchCategories(
        {
          isBookmarked: true,
        },
        'network-only'
      )
        .then((res) => {
          if (!res.data.getExamCategories.ok) return;
          setBookmarkedCategories(
            res.data.getExamCategories.categories as MockExamCategory[]
          );
        })
        .catch((e) => {
          handleError(e);
        });
    }
  }, [isLoggedIn, router.query]);

  return (
    <BookmarkedFolderListBlock>
      {isLoggedIn ? (
        <HomeFolderList
          {...homeFolderListProps}
          unikeyKey="bookmarked-storage"
          type="bookmark"
        />
      ) : (
        <div className="h-[170px]"></div>
      )}
    </BookmarkedFolderListBlock>
  );
};

export default BookmarkedFolderList;
