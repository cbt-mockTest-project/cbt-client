import { EllipsisOutlined } from '@ant-design/icons';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useAuth from '@lib/hooks/useAuth';
import useExamCategory from '@lib/hooks/useExamCategory';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { BookmarkOutlined } from '@mui/icons-material';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';

interface CategoryBookmarkOrEditWrapperProps {
  dropdownItems: MenuProps['items'];
}

const CategoryBookmarkOrEditWrapper: React.FC<
  CategoryBookmarkOrEditWrapperProps
> = ({ dropdownItems }) => {
  const { data: meQuery } = useMeQuery();
  const { handleCheckLogin } = useAuth();
  const isMyCategory = useAppSelector(
    (state) => state.examCategory.category.user.id === meQuery?.me.user?.id
  );
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const isPublic = useAppSelector(
    (state) => state.examCategory.category.isPublic
  );
  const isCategoryBookmarked = useAppSelector(
    (state) => state.examCategory.category.isBookmarked
  );
  const { handleToggleCategoryBookmark } = useExamCategory();
  return (
    <>
      {isMyCategory ? (
        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
          <div
            className="category-setting-button-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <EllipsisOutlined />
          </div>
        </Dropdown>
      ) : (
        isPublic && (
          <button
            onClick={() => {
              if (!handleCheckLogin()) return;
              handleToggleCategoryBookmark(categoryId);
            }}
            className={`category-bookmark-button ${
              isCategoryBookmarked ? 'active' : ''
            }`}
          >
            <BookmarkOutlined />
          </button>
        )
      )}
    </>
  );
};

export default CategoryBookmarkOrEditWrapper;
