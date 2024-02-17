import { useEditProfileMutation } from '@lib/graphql/hook/useUser';
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
        <div className="study-bookmark-info-modal-description">{`북마크된 문제는 '기록' 페이지에서 확인할 수 있습니다.`}</div>
        <Button href="/me/history" type="primary">
          기록 페이지로 이동
        </Button>
      </div>
    </StudyBookmarkInfoModalBlock>
  );
};
export default StudyBookmarkInfoModal;
