import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { LeftOutlined } from '@ant-design/icons';
import ExamSimpleStudyModal from '@components/examReview/ExamSimpleStudyModal';
import { QuestionState } from 'types';

const ExamExcludeHeaderBlock = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  .exam-exclude-header-state-checkbox-group {
    flex-shrink: 0;
    .ant-checkbox-wrapper {
      align-items: center;
      .ant-checkbox-inner {
        width: 24px;
        height: 24px;
      }
      .ant-checkbox-inner::after {
        width: 10px;
        height: 14px;
      }
      span:last-child {
        height: 24px;
      }
    }
  }
`;

interface ExamExcludeHeaderProps {
  states?: QuestionState[];
}

const ExamExcludeHeader: React.FC<ExamExcludeHeaderProps> = ({ states }) => {
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const router = useRouter();

  return (
    <ExamExcludeHeaderBlock>
      <Button size="large" type="text" onClick={() => router.back()}>
        <LeftOutlined />
      </Button>
      <Button onClick={() => setIsStudyModalOpen(true)}>풀이모드 전환</Button>
      {isStudyModalOpen && (
        <ExamSimpleStudyModal
          questionStates={states}
          open={isStudyModalOpen}
          onCancel={() => setIsStudyModalOpen(false)}
          feedbacked={true}
        />
      )}
    </ExamExcludeHeaderBlock>
  );
};

export default ExamExcludeHeader;
