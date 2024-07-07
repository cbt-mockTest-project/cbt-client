import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import useAuth from '@lib/hooks/useAuth';
import useExamCategory from '@lib/hooks/useExamCategory';
import { BookmarkOutlined } from '@mui/icons-material';
import { App, Dropdown, MenuProps } from 'antd';
import React, { useState } from 'react';
import { MockExamCategory, RevenueRequestFormStatus } from 'types';
import palette from '@styles/palette';
import { useToggleExamCategoryBookmark } from '@lib/graphql/hook/useExamCategoryBookmark';

interface CategoryBookmarkOrEditWrapperProps {
  dropdownItems: MenuProps['items'];
  category: MockExamCategory;
  defaultIsBookmarked: boolean;
}

const CategoryBookmarkOrEditWrapper: React.FC<
  CategoryBookmarkOrEditWrapperProps
> = ({ dropdownItems, category, defaultIsBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(defaultIsBookmarked);
  const { modal } = App.useApp();
  const { handleCheckLogin, user } = useAuth();
  const isMyCategory = category.user.id === user?.id;
  const [toggleCategoryBookmark] = useToggleExamCategoryBookmark();

  const onClickRejectReasonInfoModal = () => {
    modal.info({
      title: '수익창출 신청이 거절되었습니다.',
      content: (
        <div>
          <div className="text-[16px] text-gray-700 font-bold">거절 사유</div>
          <pre className="text-[15px] text-gray-700 mt-4 border-l-4 border-red-500 pl-4 border-solid">
            {category.revenueRequestForm?.reason}
          </pre>
        </div>
      ),
      onOk() {},
    });
  };

  const onClickBookmarkButton = async () => {
    if (!handleCheckLogin()) return;
    setIsBookmarked(!isBookmarked);
    const res = await toggleCategoryBookmark({
      variables: {
        input: {
          categoryId: category.id,
        },
      },
    });
    if (!res.data.toggleExamCategorieBookmark.ok) {
      setIsBookmarked(!isBookmarked);
    }
  };

  return (
    <>
      {isMyCategory ? (
        <div className="absolute top-[30px] lg:top-[20px] right-[30px] flex flex-col items-end gap-4">
          <div className="flex gap-2">
            {category.revenueRequestForm?.status ===
              RevenueRequestFormStatus.Rejected && (
              <button onClick={onClickRejectReasonInfoModal}>
                <ExclamationCircleOutlined
                  style={{ color: palette.red_500, fontSize: '20px' }}
                />
              </button>
            )}
          </div>
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <div
              className="category-setting-button-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisOutlined />
            </div>
          </Dropdown>
        </div>
      ) : (
        category.isPublic && (
          <button
            onClick={onClickBookmarkButton}
            className={`category-bookmark-button ${
              isBookmarked ? 'active' : ''
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
