import React, { useEffect, useRef } from 'react';
import Modal, { ModalProps } from './Modal';
import styled from 'styled-components';
import palette from '@styles/palette';
import KakaoIconSVG from '@assets/svg/kakao.svg';
import { Button, Input, InputRef, message } from 'antd';
import { kakaoShare } from '@lib/utils/kakaoShare';
import useIsMobile from '@lib/hooks/useIsMobile';
import { isAndroid } from 'react-device-detect';

interface QuestionShareModalProps extends Omit<ModalProps, 'children'> {
  questionId: number;
  title: string;
  shareTitle: string;
  shareDescription: string;
}

const QuestionShareModal: React.FC<QuestionShareModalProps> = ({
  open,
  onClose,
  className,
  questionId,
  title,
  shareTitle,
  shareDescription,
}) => {
  const urlInputRef = useRef<InputRef>(null);
  const isMobile = useIsMobile();
  const questionPageLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/question/${questionId}`;
  const onCopyLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    urlInputRef.current?.select();
    e.currentTarget.focus();
    document.execCommand('copy');
    message.success('링크가 복사되었습니다.');
  };
  const onKakaoShare = () => {
    kakaoShare({
      title: shareTitle,
      url: questionPageLink,
      imageUrl: '/png/logo01.png',
      description: shareDescription,
    });
  };

  return (
    <QuestionShareModalContainer
      open={open}
      onClose={onClose}
      className={className}
    >
      <p className="question-share-modal-label">문제 공유</p>
      <p className="question-share-modal-title">{title}</p>

      <button
        className="question-share-modal-kakao-button"
        onClick={onKakaoShare}
      >
        <KakaoIconSVG />
        <p>카카오톡</p>
      </button>
      <div className="question-share-modal-link-wrapper">
        <Input
          ref={urlInputRef}
          className="question-share-modal-link-value"
          value={questionPageLink}
        />
        <Button
          className="question-share-modal-link-button"
          onClick={onCopyLink}
        >
          링크 복사
        </Button>
      </div>
      {isMobile && (
        <p className="question-share-modal-info-text">
          {
            '※ 카카오톡 공유하기가 작동하지 않을 경우\n어플을 최신버전으로 업데이트 해주세요.'
          }
        </p>
      )}
    </QuestionShareModalContainer>
  );
};

export default QuestionShareModal;

const QuestionShareModalContainer = styled(Modal)`
  padding: 40px 25px;
  max-width: 400px;
  .modal-close-button {
    right: 5px;
  }
  .question-share-modal-label {
    margin: 0 auto;
    margin-bottom: 30px;
    width: max-content;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    color: ${palette.antd_blue_01};
    border: 1px solid ${palette.antd_blue_01};
  }
  .question-share-modal-title {
    width: 100%;
    text-align: center;
    padding: 10px 10px;
    border-radius: 5px;
    background-color: ${palette.gray_100};
    height: 50px;
    font-size: 0.9rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .question-share-modal-kakao-button {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: ${palette.yellow_kakao};
    margin-top: 15px;
    border-radius: 5px;
    position: relative;
    svg {
      position: absolute;
      left: 50px;
      height: 20px;
    }
  }
  .question-share-modal-link-wrapper {
    margin-top: 15px;
    display: flex;
    gap: 5px;
    height: 30px;
  }
  .question-share-modal-link-value {
    font-size: 0.8rem;
    text-align: center;
    pointer-events: none;
    height: 30px;
    flex: 5;
  }
  .question-share-modal-link-button {
    height: 30px;
    flex: 1;
  }
  .question-share-modal-info-text {
    margin-top: 20px;
    color: red;
    font-size: 0.8rem;
    white-space: pre-line;
  }
`;
