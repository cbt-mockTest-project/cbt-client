import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useAuth from '@lib/hooks/useAuth';
import useExamCategory from '@lib/hooks/useExamCategory';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { BookmarkOutlined } from '@mui/icons-material';
import { Button, Dropdown, MenuProps, Modal, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import RequestRevenueModal from './RequestRevenueModal';
import { RevenueRequestFormStatus } from 'types';
import palette from '@styles/palette';
import CategoryRevenueHistoryModal from './CategoryRevenueHistoryModal';

interface CategoryBookmarkOrEditWrapperProps {
  dropdownItems: MenuProps['items'];
}

const CategoryBookmarkOrEditWrapper: React.FC<
  CategoryBookmarkOrEditWrapperProps
> = ({ dropdownItems }) => {
  const [isRequestRevenueModalOpen, setIsRequestRevenueModalOpen] =
    useState(false);
  const [isRevenueHistoryModalOpen, setIsRevenueHistoryModalOpen] =
    useState(false);
  const { data: meQuery } = useMeQuery();
  const { handleCheckLogin } = useAuth();
  const isMyCategory = useAppSelector(
    (state) => state.examCategory.category.user.id === meQuery?.me.user?.id
  );
  const { handleToggleCategoryBookmark } = useExamCategory();
  const categoryId = useAppSelector((state) => state.examCategory.category.id);
  const revenueRequestForm = useAppSelector(
    (state) => state.examCategory.category.revenueRequestForm
  );
  const isPublic = useAppSelector(
    (state) => state.examCategory.category.isPublic
  );
  const isCategoryBookmarked = useAppSelector(
    (state) => state.examCategory.category.isBookmarked
  );
  const revenueRequestStatusText = useMemo(() => {
    if (revenueRequestForm?.status === RevenueRequestFormStatus.Pending)
      return '승인 대기중';
    if (revenueRequestForm?.status === RevenueRequestFormStatus.Rejected)
      return '수익창출 재신청';
    if (revenueRequestForm?.status === RevenueRequestFormStatus.Approved)
      return '수익 현황';
    return '수익창출 신청';
  }, [revenueRequestForm?.status]);

  const onClickRejectReasonInfoModal = () => {
    Modal.info({
      title: '수익창출 신청이 거절되었습니다.',
      content: (
        <div>
          <div className="text-[16px] text-gray-700 font-bold">거절 사유</div>
          <pre className="text-[15px] text-gray-700 mt-4 border-l-4 border-red-500 pl-4 border-solid">
            {revenueRequestForm?.reason}
          </pre>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <>
      {isMyCategory ? (
        <div className="absolute top-[30px] lg:top-[20px] right-[30px] flex flex-col items-end gap-4">
          <div className="flex gap-2">
            <Tooltip
              title={
                revenueRequestForm?.status === RevenueRequestFormStatus.Pending
                  ? '승인 까지 1~2일이 소요될 수 있습니다.'
                  : ''
              }
            >
              <Button
                type="primary"
                disabled={[RevenueRequestFormStatus.Pending].includes(
                  revenueRequestForm?.status
                )}
                onClick={() =>
                  revenueRequestForm.status ===
                  RevenueRequestFormStatus.Approved
                    ? setIsRevenueHistoryModalOpen(true)
                    : setIsRequestRevenueModalOpen(true)
                }
              >
                {revenueRequestStatusText}
              </Button>
            </Tooltip>
            {revenueRequestForm?.status ===
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
      {isRequestRevenueModalOpen && (
        <RequestRevenueModal
          open={isRequestRevenueModalOpen}
          onCancel={() => setIsRequestRevenueModalOpen(false)}
          onClose={() => setIsRequestRevenueModalOpen(false)}
          categoryId={categoryId}
        />
      )}
      {isRevenueHistoryModalOpen && (
        <CategoryRevenueHistoryModal
          open={isRevenueHistoryModalOpen}
          onCancel={() => setIsRevenueHistoryModalOpen(false)}
          categoryId={categoryId}
        />
      )}
    </>
  );
};

export default CategoryBookmarkOrEditWrapper;
