import { LeftOutlined } from '@ant-design/icons';
import HeaderLayout from '@components/common/header/HeaderLayout';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ExamCreateHeaderBlock = styled.div`
  top: 0;
  position: sticky;
  z-index: 999;
  .exam-create-header-back-button {
    cursor: pointer;
    position: absolute;
    left: 20px;
    svg {
      font-size: 22px;
    }
  }
  .exam-create-save-button {
    position: absolute;
    right: 20px;
  }
`;

interface ExamCreateHeaderProps {
  title?: string;
}

const ExamCreateHeader: React.FC<ExamCreateHeaderProps> = ({
  title = '시험지 만들기',
}) => {
  const router = useRouter();
  return (
    <ExamCreateHeaderBlock>
      <HeaderLayout>
        <div
          className="exam-create-header-back-button"
          role="button"
          onClick={router.back}
        >
          <LeftOutlined />
        </div>
        <div>{title}</div>
        <Button
          type="primary"
          className="exam-create-save-button"
          htmlType="submit"
        >
          저장
        </Button>
      </HeaderLayout>
    </ExamCreateHeaderBlock>
  );
};

export default ExamCreateHeader;
