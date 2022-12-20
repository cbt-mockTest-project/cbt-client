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
  margin-top: 50px;
  padding: 20px 0;
  border-top: 1px solid ${palette.gray_200};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
