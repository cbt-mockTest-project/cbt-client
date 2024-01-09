import { FolderOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { User } from 'types';

const CategoryHeaderBlock = styled.div`
  .category-creator-info {
    display: flex;
    gap: 5px;
    align-items: center;
    .cateogry-create-info-name-and-label {
      display: flex;
      gap: 3px;
      align-items: flex-end;
    }
  }
  .category-creator-name {
    font-size: 18px;
    font-weight: bold;
  }

  .category-creator-label {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.colorSubText};
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
      <Link href={`/user/${user.id}`}>
        <div className="category-creator-info">
          <Image
            src={user.profileImg || '/png/profile/profile_default.png'}
            width={30}
            height={30}
            alt="유저이미지"
          />
          <div className="cateogry-create-info-name-and-label">
            <span className="category-creator-name">{user.nickname}</span>
            <span className="category-creator-label">의 암기장</span>
          </div>
        </div>
      </Link>
      <div className="category-info">
        <FolderOutlined />
        <span className="category-name">{categoryName}</span>
      </div>
      <div className="category-description">{categoryDescription}</div>
    </CategoryHeaderBlock>
  );
};

export default CategoryHeader;
