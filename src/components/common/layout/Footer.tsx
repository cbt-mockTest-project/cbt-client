import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReportModal from '../modal/ReportModal';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const year = new Date().getFullYear();
  const [reportModalState, setReportModalState] = useState(false);
  const onToggleReportModalState = () => setReportModalState(!reportModalState);
  return (
    <FooterContainer>
      <div className="footer-wrapper">
        <div>{`© ${year} EunGwang`}</div>
        <a href="mailto:eungwang1203@gmail.com">Mail</a>
        <button onClick={onToggleReportModalState}>Feedback</button>
      </div>
      <ReportModal
        open={reportModalState}
        onCancel={onToggleReportModalState}
        onClose={onToggleReportModalState}
        onConfirm={() => {}}
        title="피드백을 남겨주세요"
        confirmLabel="피드백 전송"
      />
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  height: 60px;
  border-top: 1px solid ${palette.gray_200};
  background-color: white;
  .footer-wrapper {
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: 1024px;
    font-size: 0.8rem;
    gap: 40px;
    a,
    button {
      color: ${palette.antd_blue_01};
    }
  }
`;
