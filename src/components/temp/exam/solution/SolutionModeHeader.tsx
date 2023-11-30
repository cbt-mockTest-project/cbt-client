import { LeftOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const SolutionModeHeaderBlock = styled.div`
  background-color: white;
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 1;
  //아래쪽 그림자
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid ${palette.gray_300};
  .solution-mode-header-inner {
    height: 57px;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: ${palette.gray_900};
    padding: 0 20px;
    justify-content: center;
    position: relative;
    .solution-mode-back-button {
      cursor: pointer;
      position: absolute;
      left: 20px;
    }
    .solution-mode-header-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
    }
    svg {
      font-size: 22px;
    }
  }
  @media (max-width: ${responsive.medium}) {
    .solution-mode-header-inner {
      padding: 0 10px;
    }
    .solution-mode-back-button {
      left: 10px;
    }
  }
`;

interface SolutionModeHeaderProps {
  title: string;
}

const SolutionModeHeader: React.FC<SolutionModeHeaderProps> = ({ title }) => {
  const router = useRouter();
  return (
    <SolutionModeHeaderBlock>
      <div className="solution-mode-header-inner">
        <div
          className="solution-mode-back-button"
          role="button"
          onClick={router.back}
        >
          <LeftOutlined />
        </div>
        <div className="solution-mode-header-title">{title}</div>
      </div>
    </SolutionModeHeaderBlock>
  );
};

export default SolutionModeHeader;
