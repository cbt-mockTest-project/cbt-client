import { HeartTwoTone } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import ExamBookmark from '@components/common/examBookmark/ExamBookmark';
import SkeletonBox from '@components/common/skeleton/SkeletonBox';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useAuth from '@lib/hooks/useAuth';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';

const CategoryFolderListItemBlock = styled(Link)`
  width: calc(50% - 10px);
  .category-folder-list-item-pc-skeletion,
  .category-folder-list-item-mobile-skeletion {
    border-radius: 6px;
  }
  .category-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .category-header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;

      .category-name {
        font-size: 14px;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 42px;
      }

      .category-header-bookmark-or-tag {
        height: 40px;
        .ant-tag {
          margin: 0;
        }
      }
    }
    .category-middle-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 5px;
      color: ${palette.colorSubText};
      font-size: 13px;
    }

    .category-footer-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0px;
      .category-user-info {
        display: flex;
        align-items: center;
        max-width: 70%;
        gap: 3px;
        &:hover {
          text-decoration: underline;
        }
      }
      .category-user-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        font-weight: bold;
      }

      .category-user-profile-image {
        border-radius: 50%;
        background-color: ${palette.gray_200};
        margin-right: 5px;
      }

      .category-exam-count {
        font-size: 12px;
        font-weight: bold;
        color: ${palette.colorSubText};
      }
    }
  }

  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface CategoryFolderListItemProps {
  category?: MockExamCategory;
  isLoading?: boolean;
  handleToggleBookmark?: (categoryId: number) => Promise<void>;
  className?: string;
}

const CategoryFolderListItem: React.FC<CategoryFolderListItemProps> = ({
  category,
  isLoading,
  handleToggleBookmark,
  className = '',
}) => {
  const router = useRouter();
  const { handleCheckLogin, user, isLoggedIn } = useAuth();
  return (
    <CategoryFolderListItemBlock
      href={`/category/${category?.name}`}
      className={className}
    >
      {category && !isLoading && (
        <BasicCard hoverEffect type="primary">
          <div className="category-wrapper">
            <div className="category-header-wrapper">
              <span className="category-name">{category.name}</span>
              {user?.id !== category.user.id && handleToggleBookmark && (
                <div className="category-header-bookmark-or-tag">
                  <ExamBookmark
                    isBookmarked={category.isBookmarked}
                    handleToggleBookmark={(e) => {
                      e.preventDefault();
                      if (!handleCheckLogin()) return;
                      handleToggleBookmark(category.id);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="category-middle-wrapper">
              <HeartTwoTone twoToneColor="#eb2f96" />
              {category.categoryEvaluations.length}
            </div>
            <div className="category-footer-wrapper">
              <button
                className="category-user-info"
                onClick={(e) => {
                  router.push(`/user/${category.user.id}`);
                  e.preventDefault();
                }}
              >
                <Image
                  className="category-user-profile-image"
                  src={
                    category.user.profileImg ||
                    '/png/profile/profile_default.png'
                  }
                  alt="프로필이미지"
                  width={18}
                  height={18}
                />
                <div className="category-user-name">
                  {category.user.nickname}
                </div>
              </button>
              <div className="category-exam-count">
                {category.mockExam.length} 세트
              </div>
            </div>
          </div>
        </BasicCard>
      )}
      {isLoading && (
        <SkeletonBox width="100%" height="111px" borderRadius="6px" />
      )}
    </CategoryFolderListItemBlock>
  );
};

export default CategoryFolderListItem;
