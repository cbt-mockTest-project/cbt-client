import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { TextHighlight } from 'types';
import { AddHighlight, EditMemo } from './HighlightableText';

const HighlightMobileDrawerContentBlock = styled.div``;

interface HighlightMobileDrawerContentProps {
  highlight: TextHighlight;
  addHighlight: AddHighlight;
  editMemo: EditMemo;
  onClose: () => void;
}

const HighlightMobileDrawerContent: React.FC<
  HighlightMobileDrawerContentProps
> = ({ highlight, addHighlight, editMemo, onClose }) => {
  const [memo, setMemo] = useState(highlight?.data.memo || '');
  return (
    <HighlightMobileDrawerContentBlock className="w-full flex flex-col gap-4">
      <Input.TextArea
        value={memo}
        placeholder="메모가 필요하면 입력해주세요."
        onChange={(e) => setMemo(e.target.value)}
      />
      <Button
        type="primary"
        size="large"
        onClick={() => {
          if (highlight) {
            editMemo(highlight.id, memo);
          } else {
            addHighlight(memo);
          }
          setMemo('');
          onClose();
        }}
      >
        형광펜 적용
      </Button>
    </HighlightMobileDrawerContentBlock>
  );
};

export default HighlightMobileDrawerContent;
