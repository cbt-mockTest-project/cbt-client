import { HeartTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';

const HomeSearchOptionBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .home-search-option-name {
    width: 80%;
    //한줄 말줄임
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .home-search-option-like-count {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

interface HomeSearchOptionProps {
  mockExamCategory: MockExamCategory;
}

const HomeSearchOption: React.FC<HomeSearchOptionProps> = ({
  mockExamCategory,
}) => {
  const router = useRouter();
  return (
    <HomeSearchOptionBlock>
      <div className="home-search-option-name">{mockExamCategory.name}</div>
      <div className="home-search-option-like-count">
        <HeartTwoTone twoToneColor="#eb2f96" />
        <span>{mockExamCategory.evaluationCount}</span>
      </div>
    </HomeSearchOptionBlock>
  );
};

export default HomeSearchOption;
