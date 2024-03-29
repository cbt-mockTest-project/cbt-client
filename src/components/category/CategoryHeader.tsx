import { FolderOutlined } from '@ant-design/icons';
import { linkify } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExam, User } from 'types';

const CategoryHeaderBlock = styled.div`
  width: fit-content;
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
    white-space: pre-line;
    word-break: break-all;
  }
`;

interface CategoryHeaderProps {
  user: User;
  categoryName: string;
  categoryDescription: string;
  exams: MockExam[];
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  user,
  categoryName,
  categoryDescription,
  exams,
}) => {
  console.log('CategoryHeader');
  const router = useRouter();
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
        <Button
          className="category-question-search-button"
          type="primary"
          onClick={() =>
            router.push({
              pathname: '/search',
              query: {
                examIds: exams.map((exam) => exam.id).join(','),
                categoryName,
              },
            })
          }
        >
          문제 검색기
        </Button>
      </div>
      <div className="category-description">{linkify(categoryDescription)}</div>
    </CategoryHeaderBlock>
  );
};

export default CategoryHeader;
