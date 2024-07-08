import { COUPANG_AD_COOKIE } from '../../../_lib/constants/cookie';
import palette from '../../../_styles/palette';
import { Button, Modal, ModalProps } from 'antd';
import { setCookie } from 'cookies-next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CoupangDisplayAdModalBlock = styled(Modal)`
  .ant-modal-content {
    width: 380px;
  }
  .coupang-display-ad-modal-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .coupang-display-ad-modal-iframe-wrapper {
    position: relative;
  }
  .coupang-display-ad-modal-close-button {
    position: absolute;
    bottom: 30px;
  }
  .coupang-display-ad-modal-desc {
    margin-top: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    div {
      font-size: 12px;
      color: ${({ theme }) => theme.color('colorTextSecondary')};
    }
  }
`;

interface CoupangDisplayAdModalProps extends Omit<ModalProps, 'children'> {}

const CoupangDisplayAdModal: React.FC<CoupangDisplayAdModalProps> = (props) => {
  const { ...modalProps } = props;
  const [isAdClicked, setIsAdClicked] = useState(false);
  const iframeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
      } else {
        setIsAdClicked(true);
        setCookie(COUPANG_AD_COOKIE, 'true', {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <CoupangDisplayAdModalBlock
      {...modalProps}
      closeIcon={false}
      footer={null}
      onCancel={() => {}}
    >
      <div className="coupang-display-ad-modal-inner">
        <div
          className="coupang-display-ad-modal-iframe-wrapper"
          ref={iframeRef}
        >
          <iframe
            className="coupang-display-ad-modal-iframe"
            src="https://ads-partners.coupang.com/widgets.html?id=757454&template=banner&trackingCode=AF8104485&subId=&width=600&height=900"
            width="320"
            height="480"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
          />
        </div>
        <Button
          type="primary"
          size="large"
          style={{ width: '100%' }}
          disabled={!isAdClicked}
          onClick={modalProps.onCancel}
        >
          학습 계속하기
        </Button>
        <div className="coupang-display-ad-modal-desc">
          <pre>
            {`광고 클릭 후, 학습을 계속 할 수 있습니다.\n해당 광고는 1회 클릭시 하루동안 나오지 않습니다.`}
          </pre>
          <div>
            이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
            수수료를 제공받습니다.
          </div>
        </div>
      </div>
    </CoupangDisplayAdModalBlock>
  );
};

export default CoupangDisplayAdModal;
