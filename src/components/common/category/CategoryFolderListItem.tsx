import { HeartTwoTone } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import { responsive } from '@lib/utils/responsive';
import { Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ExamSource, MockExamCategory } from 'types';

const CategoryFolderListItemBlock = styled(Link)`
  width: calc(50% - 10px);
  position: relative;
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
      color: ${({ theme }) => theme.color('colorTextSecondary')};
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
        background-color: ${({ theme }) => theme.color('colorFillAlter')};
        margin-right: 5px;
      }

      .category-exam-count {
        font-size: 12px;
        font-weight: bold;
        color: ${({ theme }) => theme.color('colorTextSecondary')};
      }
    }
  }

  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface MockExamCategoryWithIsNem extends MockExamCategory {
  isNew?: boolean;
}

interface CategoryFolderListItemProps {
  category?: MockExamCategoryWithIsNem;
  isLoading?: boolean;
  className?: string;
}

const CategoryFolderListItem: React.FC<CategoryFolderListItemProps> = ({
  category,
  isLoading,
  className = '',
}) => {
  if (!category) return null;
  return (
    <CategoryFolderListItemBlock
      href={`/category/${category.urlSlug}`}
      prefetch={false}
      className={className}
    >
      {category && !isLoading && (
        <BasicCard hoverEffect type="primary">
          <div className="category-wrapper">
            <div className="category-header-wrapper">
              <div className="category-name">
                <span>{category.isNew && <Tag color="green">NEW</Tag>}</span>
                <span>{category.name}</span>
              </div>
            </div>
            <div className="category-middle-wrapper">
              <HeartTwoTone twoToneColor="#eb2f96" />
              {category.evaluationCount}
            </div>
            <div className="category-footer-wrapper">
              <div className="category-user-info">
                <Image
                  className="category-user-profile-image"
                  src={
                    category.user.profileImg ||
                    `${process.env.NEXT_PUBLIC_CLOUD_FRONT}/user/profile_default.png`
                  }
                  alt="프로필이미지"
                  width={18}
                  height={18}
                />
                <div className="category-user-name">
                  {category.user.nickname}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {category.source === ExamSource.EhsMaster && (
                  <Tag color="blue">유료</Tag>
                )}
                <div className="category-exam-count">
                  {category.examCount} 세트
                </div>
              </div>
            </div>
          </div>
        </BasicCard>
      )}
    </CategoryFolderListItemBlock>
  );
};

export default CategoryFolderListItem;
