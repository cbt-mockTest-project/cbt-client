import { Button, Input, Modal, ModalProps } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { TextHighlight } from 'types';
import { AddHighlight, EditMemo } from './HighlightableText';

const HighlighMemoModalModalBlock = styled(Modal)``;

interface HighlighMemoModalModalProps extends Omit<ModalProps, 'children'> {
  highlight: TextHighlight;
  addHighlight: AddHighlight;
  editMemo: EditMemo;
}

const HighlighMemoModalModal: React.FC<HighlighMemoModalModalProps> = (
  props
) => {
  const { highlight, addHighlight, editMemo, ...modalProps } = props;
  const [isEditing, setIsEditing] = useState(!highlight?.data.memo);
  const [memo, setMemo] = useState(highlight?.data.memo || '');
  console.log('highlight', highlight);
  return (
    <HighlighMemoModalModalBlock {...modalProps} footer={null}>
      {isEditing ? (
        <Input.TextArea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          autoFocus
        />
      ) : (
        <pre>{memo}</pre>
      )}
      <div className="mt-4 flex gap-2 justify-end">
        <Button
          type="primary"
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) {
              if (highlight) {
                editMemo(highlight.id, memo);
              } else {
                addHighlight(memo);
              }
            }
          }}
        >
          {isEditing ? '저장' : '수정'}
        </Button>
      </div>
    </HighlighMemoModalModalBlock>
  );
};
export default HighlighMemoModalModal;
