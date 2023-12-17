import React from 'react';
import styled from 'styled-components';

const MyProfileComponentBlock = styled.div``;

interface MyProfileComponentProps {}

const MyProfileComponent: React.FC<MyProfileComponentProps> = () => {
  return (
    <MyProfileComponentBlock>
      {/* 컴포넌트의 내용을 여기에 작성하세요. */}
    </MyProfileComponentBlock>
  );
};

export default MyProfileComponent;
