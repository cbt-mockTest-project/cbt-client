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
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${palette.colorEmphasisText};
    height: 42px;
  }
  .category-basic-card {
    border-color: ${palette.colorEmphasisText};
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

  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;

interface CategoryFolderIncludingAllExamsProps {
  examCount?: number;
}
/**
 * deprecated
 */
const CategoryFolderIncludingAllExams: React.FC<
  CategoryFolderIncludingAllExamsProps
> = ({ examCount }) => {
  const { data: meQuery } = useMeQuery();
  if (!meQuery?.me.user) return null;
  const user = meQuery.me.user;
  return (
    <CategoryFolderIncludingAllExamsBlock href="/me/all-exams">
      <BasicCard className="category-basic-card" hoverEffect type="primary">
        <div className="category-wrapper">
          <div className="category-header-wrapper">
            <span className="category-name">전체 시험지</span>
          </div>
          <div className="category-footer-wrapper">
            <div className="category-user-info">
              <Image
                className="category-user-profile-image"
                src={user.profileImg || '/png/profile/profile_default.png'}
                alt="프로필이미지"
                width={20}
                height={20}
              />
              <div className="category-user-name">{user.nickname}</div>
            </div>
            <div className="category-exam-count">{examCount} 세트</div>
          </div>
        </div>
      </BasicCard>
    </CategoryFolderIncludingAllExamsBlock>
  );
};

export default CategoryFolderIncludingAllExams;
