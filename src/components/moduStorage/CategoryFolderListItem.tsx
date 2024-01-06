import BasicCard from '@components/common/card/BasicCard';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';

const CategoryFolderListItemBlock = styled(Link)`
  width: calc(50% - 10px);
  .category-name {
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .category-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
  .category-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .category-user-info {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-top: 20px;
  }
  .category-user-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    font-weight: bold;
  }
  .category-user-label {
    font-size: 12px;
    font-weight: bold;
    color: ${palette.colorSubText};
  }
  .category-user-profile-image {
    border-radius: 50%;
    background-color: ${palette.gray_200};
    margin-right: 5px;
  }

  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface CategoryFolderListItemProps {
  category: MockExamCategory;
  hasTag?: boolean;
  className?: string;
}

const CategoryFolderListItem: React.FC<CategoryFolderListItemProps> = ({
  category,
  hasTag = true,
  className = '',
}) => {
  return (
    <CategoryFolderListItemBlock
      href={`/category/${category.id}`}
      className={className}
    >
      <BasicCard hoverEffect type="primary">
        <div className="category-wrapper">
          <div className="category-header-wrapper">
            <span className="category-name">{category.name}</span>
            {hasTag && (
              <Tag color={category.isPublic ? 'blue' : 'default'}>
                {category.isPublic ? '공개' : '비공개'}
              </Tag>
            )}
          </div>
          <div className="category-user-info">
            <Image
              className="category-user-profile-image"
              src={
                category.user.profileImg || '/png/profile/profile_default.png'
              }
              alt="프로필이미지"
              width={18}
              height={18}
            />
            <span className="category-user-name">{category.user.nickname}</span>
          </div>
        </div>
      </BasicCard>
    </CategoryFolderListItemBlock>
  );
};

export default CategoryFolderListItem;
