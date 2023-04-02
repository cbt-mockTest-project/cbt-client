import { loginModal } from '@lib/constants';
import { useCreateFeedback } from '@lib/graphql/user/hook/useFeedBack';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { responsive } from '@lib/utils/responsive';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReportModal from '../modal/ReportModal';

interface FooterProps {
  className: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const year = new Date().getFullYear();
  const [createFeedback] = useCreateFeedback();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const [reportModalState, setReportModalState] = useState(false);
  const reportValue = useRef('');
  const requestFeedback = async () => {
    const res = await createFeedback({
      variables: {
        input: {
          content: reportValue.current,
        },
      },
    });
    if (res.data?.createFeedback.ok) {
      message.success({ content: '피드백 남겨주셔서 감사합니다' });
      setReportModalState(false);
      return;
    }
    message.error({ content: res.data?.createFeedback.error });
  };
  const tryRequestFeedback = convertWithErrorHandlingFunc({
    callback: requestFeedback,
  });

  const onToggleReportModalState = () => {
    if (!meQuery?.me.ok) {
      return dispatch(coreActions.openModal(loginModal));
    }
    setReportModalState(!reportModalState);
  };
  return (
    <FooterContainer className={className}>
      <div className="footer-wrapper">
        <div>{`© ${year} Moducbt`}</div>
        <a href="mailto:moducbt@gmail.com">Mail</a>
      </div>
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
  @media (max-width: ${responsive.medium}) {
    padding: 20px 15px;
  }
`;
