import { FolderOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import { linkify } from '@lib/utils/utils';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { MockExam, User } from 'types';

const CategoryHeaderBlock = styled.div`
  width: fit-content;
  padding: 0 20px;
  @media (max-width: ${responsive.medium}) {
    padding: 0 16px;
  }
  .category-creator-info {
    display: flex;
    gap: 5px;
    align-items: center;
    .cateogry-create-info-name-and-label {
      display: flex;
      gap: 3px;
      align-items: flex-end;
      .category-question-search-button {
        margin-left: 10px;
      }
    }
  }
  .category-creator-name {
    font-size: 18px;
    font-weight: bold;
  }

  .category-creator-label {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
  .category-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    svg {
      font-size: 24px;
    }
  }
  .category-description {
    margin-top: 10px;
    font-size: 14px;
    white-space: pre-line;
    word-break: break-all;
  }
`;

interface CategoryHeaderProps {
  user: User;
  categoryName: string;
  categoryDescription: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  user,
  categoryName,
  categoryDescription,
}) => {
  return (
    <CategoryHeaderBlock>
      <div className="category-creator-info">
        <Image
          src={
            user.profileImg ||
            `${process.env.NEXT_PUBLIC_CLOUD_FRONT}/user/profile_default.png`
          }
          width={30}
          height={30}
          alt="유저이미지"
        />
        <div className="cateogry-create-info-name-and-label">
          <span className="category-creator-name">{user.nickname}</span>
          <span className="category-creator-label">의 암기장</span>
        </div>
      </div>
      <div className="category-info">
        <FolderOutlined />
        <span className="category-name">{categoryName}</span>
      </div>
      <div className="category-description">{linkify(categoryDescription)}</div>
    </CategoryHeaderBlock>
  );
};

export default CategoryHeader;
