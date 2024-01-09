import BasicCard from '@components/common/card/BasicCard';
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .category-footer-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
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
        margin-right: 10px;
        color: ${palette.colorSubText};
      }
    }
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
  const router = useRouter();
  return (
    <CategoryFolderListItemBlock
      href={`/category/${category.name}`}
      className={className}
    >
      <BasicCard hoverEffect type="primary">
        <div className="category-wrapper">
          <div className="category-header-wrapper">
            <span className="category-name">{category.name}</span>
            {hasTag && (
              <Tag
                className="category-private-public-tag"
                color={category.isPublic ? 'blue' : 'default'}
              >
                {category.isPublic ? '공개' : '비공개'}
              </Tag>
            )}
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
                  category.user.profileImg || '/png/profile/profile_default.png'
                }
                alt="프로필이미지"
                width={18}
                height={18}
              />
              <div className="category-user-name">{category.user.nickname}</div>
            </button>
            <div className="category-exam-count">
              {category.mockExam.length} 세트
            </div>
          </div>
        </div>
      </BasicCard>
    </CategoryFolderListItemBlock>
  );
};

export default CategoryFolderListItem;
