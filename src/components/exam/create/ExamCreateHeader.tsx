import { LeftOutlined } from '@ant-design/icons';
import HeaderLayout from '@components/common/header/HeaderLayout';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import ExamCreateSavedTime from './ExamCreateSavedTime';

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
  saveExamLoading: boolean;
}

const ExamCreateHeader: React.FC<ExamCreateHeaderProps> = ({
  title = '시험지 만들기',
  saveExamLoading,
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
          loading={saveExamLoading}
        >
          저장
        </Button>
        <ExamCreateSavedTime />
      </HeaderLayout>
    </ExamCreateHeaderBlock>
  );
};

export default React.memo(ExamCreateHeader);
