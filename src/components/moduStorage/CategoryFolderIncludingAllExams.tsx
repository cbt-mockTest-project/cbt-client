import BasicCard from '@components/common/card/BasicCard';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const CategoryFolderIncludingAllExamsBlock = styled(Link)`
  width: calc(50% - 10px);
  .category-name {
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
    align-items: flex-end;
    gap: 3px;
    margin-top: 20px;
  }
  .category-user-name {
    font-size: 14px;
    font-weight: bold;
  }
  .category-user-label {
    font-size: 12px;
    font-weight: bold;
    color: ${palette.colorTextLabel};
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

interface CategoryFolderIncludingAllExamsProps {}

const CategoryFolderIncludingAllExams: React.FC<
  CategoryFolderIncludingAllExamsProps
> = () => {
  const { data: meQuery } = useMeQuery();
  if (!meQuery?.me.user) return null;
  const user = meQuery.me.user;
  return (
    <CategoryFolderIncludingAllExamsBlock href="/me/all-exams">
      <BasicCard className="category-basic-card" hoverEffect>
        <div className="category-wrapper">
          <div className="category-header-wrapper">
            <span className="category-name">전체 시험지 모음</span>
          </div>
          <div className="category-user-info">
            <Image
              className="category-user-profile-image"
              src={user.profileImg || '/png/profile/profile_default.png'}
              alt="프로필이미지"
              width={20}
              height={20}
            />
            <span className="category-user-name">{user.nickname}</span>
            <span className="category-user-label">의 암기장</span>
          </div>
        </div>
      </BasicCard>
    </CategoryFolderIncludingAllExamsBlock>
  );
};

export default CategoryFolderIncludingAllExams;
