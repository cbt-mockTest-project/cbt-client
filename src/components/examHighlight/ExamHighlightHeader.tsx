import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { LeftOutlined } from '@ant-design/icons';
import ExamSimpleStudyModal from '@components/examReview/ExamSimpleStudyModal';

const ExamHighlightHeaderBlock = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  .exam-highlight-header-state-checkbox-group {
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

interface ExamHighlightHeaderProps {}

const ExamHighlightHeader: React.FC<ExamHighlightHeaderProps> = ({}) => {
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const router = useRouter();

  return (
    <ExamHighlightHeaderBlock>
      <Button size="large" type="text" onClick={() => router.back()}>
        <LeftOutlined />
      </Button>
      <Button onClick={() => setIsStudyModalOpen(true)}>풀이모드 전환</Button>
      {isStudyModalOpen && (
        <ExamSimpleStudyModal
          open={isStudyModalOpen}
          onCancel={() => setIsStudyModalOpen(false)}
          highlighted={true}
        />
      )}
    </ExamHighlightHeaderBlock>
  );
};

export default ExamHighlightHeader;
