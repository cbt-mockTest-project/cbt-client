import { Button, Modal, ModalProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const SelectStudyModeModalBlock = styled(Modal)`
  .select-study-mode-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .select-study-mode-modal-body-button-wrapper {
    display: flex;
    gap: 10px;
  }
`;

interface SelectStudyModeModalProps extends Omit<ModalProps, 'children'> {}

const SelectStudyModeModal: React.FC<SelectStudyModeModalProps> = (props) => {
  const router = useRouter();

  const isTypingMode = router.pathname.includes('typing');
  const isCardMode = router.pathname.includes('card');
  const isSolutionMode = router.pathname.includes('solution');
  const handleSelectStudyMode = (mode: string) => {
    // exam/solution 페이지 일경우
    if (router.query.Id) {
      router.push({
        pathname: '/study',
        query: {
          ...router.query,
          mode,
          examId: router.query.Id,
        },
      });
      return;
    }
    // study 페이지 일경우
    router.push({
      pathname: '/study',
      query: {
        ...router.query,
        mode,
      },
    });
  };
  const { ...modalProps } = props;
  return (
    <SelectStudyModeModalBlock {...modalProps} footer={false}>
      <div className="select-study-mode-modal-body">
        <div>버튼 클릭시 학습 모드가 변경됩니다.</div>
        <div className="select-study-mode-modal-body-button-wrapper">
          <Button
            disabled={isTypingMode}
            onClick={() => handleSelectStudyMode('typing')}
          >
            타이핑모드
          </Button>
          <Button
            disabled={isCardMode}
            onClick={() => handleSelectStudyMode('card')}
          >
            카드모드
          </Button>
        </div>
      </div>
    </SelectStudyModeModalBlock>
  );
};

export default SelectStudyModeModal;
