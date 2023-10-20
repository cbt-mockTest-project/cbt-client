import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const TestComponentBlock = styled.div``;

interface TestComponentProps {}

const TestComponent: React.FC<TestComponentProps> = () => {
  return (
    <TestComponentBlock>
      <div
        style={{
          fontFamily: 'Noto Sans KR',
          color: palette.antd_blue_02,
        }}
      >
        테스트 텍스트
      </div>
      <img src="/png/logo01.png" alt="test" />
      <div
        className="test-box"
        style={{
          fontFamily: 'Noto Sans KR',
          padding: '10px',
          width: '100px',
          height: '30px',
          border: `1px solid ${palette.gray_700}`,
          backgroundColor: palette.antd_blue_01,
          color: palette.gray_700,
        }}
      >
        테스트 박스
      </div>
    </TestComponentBlock>
  );
};

export default TestComponent;
