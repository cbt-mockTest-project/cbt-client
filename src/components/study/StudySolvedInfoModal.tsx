import { useEditProfileMutation } from '@lib/graphql/hook/useUser';
import { Button, Modal, ModalProps } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const StudySolvedInfoModalBlock = styled(Modal)`
  .study-solved-info-modal-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    .study-solved-info-modal-title {
      font-size: 18px;
      font-weight: bold;
    }
    .study-solved-info-modal-description-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: flex-start;
      .study-solved-info-modal-description {
        font-size: 14px;
      }
    }
  }
`;

interface StudySolvedInfoModalProps extends Omit<ModalProps, 'children'> {}

const StudySolvedInfoModal: React.FC<StudySolvedInfoModalProps> = (props) => {
  const { ...modalProps } = props;
  const [editProfileMutation] = useEditProfileMutation();

  useEffect(() => {
    editProfileMutation({
      variables: {
        input: {
          hasSolvedBefore: true,
        },
      },
    });
  }, []);
  return (
    <StudySolvedInfoModalBlock {...modalProps} footer={null}>
      <div className="study-solved-info-modal-inner">
        <div className="study-solved-info-modal-title">
          첫번째 성취도 체크를 축하합니다 😊
        </div>
        <div className="study-solved-info-modal-description-list">
          <div className="study-solved-info-modal-description">{`- 성취도 체크 결과는 실시간으로 저장됩니다.`}</div>
          <div className="study-solved-info-modal-description">{`- 저장된 성취도를 활용해 성취도별 문제 풀이가 가능합니다.`}</div>
          <div className="study-solved-info-modal-description">{`- 시험 진행중 성취도 보기 - '이동 & 점수' 버튼 클릭`}</div>
          <div className="study-solved-info-modal-description">{`- 시험 종료후 성취도 보기 - 기록페이지(오답노트 탭)에서 확인`}</div>
        </div>
      </div>
    </StudySolvedInfoModalBlock>
  );
};
export default StudySolvedInfoModal;
