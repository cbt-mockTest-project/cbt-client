import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

interface RefundPolicyComponentProps {}

const RefundPolicyComponent: React.FC<RefundPolicyComponentProps> = () => {
  return (
    <RefundPolicyComponentBlock>
      <h3 className="refund-policy-title">제 19조 결제 취소 & 환불</h3>
      <div className="refund-policy-content-wrapper">
        <p>아래 항목 중 해당 사항이 있을 경우, 환불이 가능합니다.</p>
        <ol className="refund-policy-list">
          <li> - 회사의 귀책사유로 결제 오류가 발생한 경우</li>
          <li> - 회사의 귀책사유로 서비스가 중단되는 경우</li>
          <li>
            - 강의시스템 결제
            <pre>{`a. 강의 자료 다운로드 및 영상을 시청한 기록이 없을 경우 환불이 가능합니다.`}</pre>
          </li>
          <li>
            - 광고제거 결제
            <pre>{`a. 결제 후 24시간이 경과되지 않았을 경우 환불이 가능합니다.`}</pre>
          </li>
          <li>
            - 강의시스템 + 광고제거 통합 결제
            <pre>{`a. 강의 자료 다운로드 및 영상을 시청한 기록이 없으며, 결제 후 24시간이 경과되지 않았을 경우 환불이 가능합니다.`}</pre>
          </li>
        </ol>
      </div>
    </RefundPolicyComponentBlock>
  );
};

export default RefundPolicyComponent;

const RefundPolicyComponentBlock = styled.div`
  .refund-policy-content-wrapper {
    padding: 10px;
  }
  .refund-policy-title {
    font-size: 1.2rem;
    padding: 20px 10px;
    background-color: ${palette.gray_100};
    margin-bottom: 20px;
  }
  .refund-policy-list {
    padding: 10px;
    li {
      + li {
        margin-top: 5px;
      }
      pre {
        padding: 5px 15px;
      }
    }
  }
`;