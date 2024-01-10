import BasicCard from '@components/common/card/BasicCard';
import ExamBookmark from '@components/common/examBookmark/ExamBookmark';
import { useMeQuery } from '@lib/graphql/hook/useUser';
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
  handleToggleBookmark: (categoryId: number) => Promise<void>;
  className?: string;
}

const CategoryFolderListItem: React.FC<CategoryFolderListItemProps> = ({
  category,
  handleToggleBookmark,
  className = '',
}) => {
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const user = meQuery?.me.user;
  return (
    <CategoryFolderListItemBlock
      href={`/category/${category.name}`}
      className={className}
    >
      <BasicCard hoverEffect type="primary">
        <div className="category-wrapper">
          <div className="category-header-wrapper">
            <span className="category-name">{category.name}</span>
            <div className="category-header-bookmark-or-tag">
              {user?.id !== category.user.id && (
                <ExamBookmark
                  isBookmarked={category.isBookmarked}
                  handleToggleBookmark={(e) => {
                    e.preventDefault();
                    handleToggleBookmark(category.id);
                  }}
                />
              )}
              {user?.id === category.user.id && (
                <Tag
                  className="category-private-public-tag"
                  color={category.isPublic ? 'blue' : 'default'}
                >
                  {category.isPublic ? '공개' : '비공개'}
                </Tag>
              )}
            </div>
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
