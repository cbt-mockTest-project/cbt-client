import { EllipsisOutlined } from '@ant-design/icons';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useAuth from '@lib/hooks/useAuth';
import useExamCategory from '@lib/hooks/useExamCategory';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { BookmarkOutlined } from '@mui/icons-material';
import { Button, Dropdown, MenuProps } from 'antd';
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
        <div className="absolute top-[30px] right-[30px] flex flex-col items-end gap-4">
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <div
              className="category-setting-button-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisOutlined />
            </div>
          </Dropdown>
          <Button type="primary">수익창출 신청</Button>
        </div>
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
