import { useEditProfileMutation } from '../../_lib/graphql/hook/useUser';
import { Button, Modal, ModalProps } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const StudyBookmarkInfoModalBlock = styled(Modal)`
  .study-bookmark-info-modal-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    .study-bookmark-info-modal-title {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

interface StudyBookmarkInfoModalProps extends Omit<ModalProps, 'children'> {}

const StudyBookmarkInfoModal: React.FC<StudyBookmarkInfoModalProps> = (
  props
) => {
  const { ...modalProps } = props;
  const [editProfileMutation] = useEditProfileMutation();

  useEffect(() => {
    editProfileMutation({
      variables: {
        input: {
          hasBookmarkedBefore: true,
        },
      },
    });
  }, []);
  return (
    <StudyBookmarkInfoModalBlock {...modalProps} footer={null}>
      <div className="study-bookmark-info-modal-inner">
        <div className="study-bookmark-info-modal-title">
          첫번째 북마크를 축하합니다 😊
        </div>
        <div className="study-bookmark-info-modal-description">{`북마크된 문제는 암기장 상단의 '북마크노트'에서 확인할 수 있습니다.`}</div>
      </div>
    </StudyBookmarkInfoModalBlock>
  );
};
export default StudyBookmarkInfoModal;
