import React from 'react';
import styled from 'styled-components';
import HomeBanner from './HomeBanner';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import { useAppSelector } from '@modules/redux/store/configureStore';
import HomeFolderList from './HomeFolderList';

const HomeComponentBlock = styled.div`
  width: 100%;
  .home-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    padding: 20px 30px 30px 30px;
    .home-folder-search-input {
      max-width: 500px;
      text-align: center;
    }
  }
  @media (max-width: ${responsive.medium}) {
    .home-wrapper {
      padding: 20px 16px;
    }
  }
`;

interface HomeComponentProps {}

const HomeComponent: React.FC<HomeComponentProps> = () => {
  const moduStorageCategories = useAppSelector(
    (state) => state.home.moduStorageCategories
  );
  const userStorageCategories = useAppSelector(
    (state) => state.home.userStorageCategories
  );
  return (
    <HomeComponentBlock>
      <HomeBanner />
      <div className="home-wrapper">
        <Input
          className="home-folder-search-input"
          placeholder="학습하고 싶은 과목을 검색해보세요."
          suffix={<SearchOutlined />}
          size="large"
        />
        <HomeFolderList
          title="국가고시 실기시험 준비하기 👀"
          subTitle="실기 시험을 효율적으로 준비해보세요."
          link="/modu-storage"
          categories={moduStorageCategories}
          unikeyKey="modu-storage"
        />
        <HomeFolderList
          title="유저가 만든 공개 암기장 📂"
          subTitle="유저들이 만든 공개 암기장으로 학습해보세요."
          link="/user-storage"
          categories={userStorageCategories}
          unikeyKey="user-storage"
        />
      </div>
    </HomeComponentBlock>
  );
};

export default HomeComponent;
