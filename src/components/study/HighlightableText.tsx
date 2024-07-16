import React, { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import OuterClick from '@components/common/outerClick/OuterClick';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorage } from '@lib/utils/localStorage';
import { HIGHLIGHTS } from '@lib/constants/localStorage';
import { Button, Tooltip } from 'antd';
import HighlighMemoModalModal from './HighlightMemoModal';

const HighlightableTextBlock = styled.div`
  * {
    &::selection {
      background: yellow; /* 배경색 */
      color: black; /* 텍스트 색상 */
    }

    /* Firefox용 드래그 색상 변경 */
    &::-moz-selection {
      background: yellow;
      color: black;
    }
  }
  font-size: 16px;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  ${EditorStyle};
`;

export interface TextHighlight {
  id: string;
  startOffset: number;
  endOffset: number;
  text: string;
  top: number;
  left: number;
  width: number;
  height: number;
  memo: string;
}

export type AddHighlight = (memo?: string) => void;
export type EditMemo = (id: string, memo: string) => void;

interface HighlightableTextProps {
  content: string;
}

const HighlightableText: React.FC<HighlightableTextProps> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);
  const localStorage = new LocalStorage();
  const uniqueId = useId();
  const [highlights, setHighlights] = useState<TextHighlight[]>([]);
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [selectedHighlight, setSelectedHighlight] =
    useState<TextHighlight | null>(null);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (range.toString().trim() !== '') {
        setSelectedRange(range);
        const rect = range.getBoundingClientRect();
        setPopupPosition({
          x: rect.left + rect.width,
          y: rect.bottom,
        });
        setShowPopup(true);
        setSelectedHighlight(null);
      }
    }
  };

  const addHighlight: AddHighlight = (memo: string = '') => {
    if (selectedRange) {
      const rect = selectedRange.getBoundingClientRect();
      const parentRect = document
        .getElementById(uniqueId)
        .getBoundingClientRect();
      const newHighlight: TextHighlight = {
        id: uuidv4(),
        startOffset: selectedRange.startOffset,
        endOffset: selectedRange.endOffset,
        text: selectedRange.toString(),
        top: rect.top - parentRect.top,
        left: rect.left - parentRect.left,
        width: rect.width,
        height: rect.height,
        memo,
      };
      const newHighlights = [...highlights, newHighlight];
      localStorage.set(HIGHLIGHTS, newHighlights);
      setHighlights(newHighlights);
      setShowPopup(false);
      setSelectedRange(null);
    }
  };

  const editMemo = (id: string, memo: string) => {
    const newHighlights = highlights.map((h) =>
      h.id === id ? { ...h, memo } : h
    );
    localStorage.set(HIGHLIGHTS, newHighlights);
    setHighlights(newHighlights);
  };

  const removeHighlight = () => {
    if (selectedHighlight) {
      const newHighlights = highlights.filter(
        (h) => h.id !== selectedHighlight.id
      );
      localStorage.set(HIGHLIGHTS, newHighlights);
      setHighlights(newHighlights);
      setShowEditPopup(false);
      setSelectedHighlight(null);
    }
  };

  const handleHighlightClick = (highlight: TextHighlight) => {
    setSelectedHighlight(highlight);
    setPopupPosition({
      x: highlight.left + highlight.width,
      y: highlight.top + highlight.height,
    });
    setShowEditPopup(true);
  };

  useEffect(() => {
    const highlights = localStorage.get(HIGHLIGHTS);
    setHighlights(highlights);
  }, []);

  return (
    <HighlightableTextBlock id={uniqueId} onMouseUp={handleMouseUp} ref={ref}>
      {parse(content || '')}
      {highlights.map((highlight) => (
        <Tooltip title={highlight.memo} key={highlight.id}>
          <HighlightBox
            id={highlight.id}
            style={{
              position: 'absolute',
              top: `${highlight.top}px`,
              left: `${highlight.left}px`,
              width: `${highlight.width}px`,
              height: `${highlight.height}px`,
              backgroundColor: 'yellow',
              opacity: 0.5,
              pointerEvents: 'auto',
              zIndex: 0,
              mixBlendMode: 'multiply',
              cursor: 'pointer',
            }}
            onClick={() => handleHighlightClick(highlight)}
          />
        </Tooltip>
      ))}
      {showPopup && (
        <OuterClick callback={() => setShowPopup(false)}>
          <PopupBox
            style={{
              top: popupPosition.y,
              left: popupPosition.x - 50,
              position: 'fixed',
            }}
            className="flex flex-col gap-2 items-center"
          >
            <Button
              className="w-full"
              type="text"
              size="large"
              onClick={() => addHighlight()}
            >
              형광펜
            </Button>
            <Button
              className="w-full"
              type="text"
              size="large"
              onClick={() => setShowMemoModal(true)}
            >
              메모
            </Button>
          </PopupBox>
        </OuterClick>
      )}
      {showEditPopup && (
        <OuterClick callback={() => setShowEditPopup(false)}>
          <PopupBox
            style={{
              top: popupPosition.y,
              left: popupPosition.x - 50,
            }}
            className="flex flex-col gap-2 items-center"
          >
            <Button
              className="w-full"
              type="text"
              size="large"
              onClick={removeHighlight}
            >
              제거
            </Button>
            <Button
              className="w-full"
              type="text"
              size="large"
              onClick={() => setShowMemoModal(true)}
            >
              메모
            </Button>
          </PopupBox>
        </OuterClick>
      )}
      {showMemoModal && (
        <HighlighMemoModalModal
          title="메모"
          key={selectedHighlight?.id}
          open={showMemoModal}
          highlight={selectedHighlight}
          onOk={() => setShowMemoModal(false)}
          onCancel={() => setShowMemoModal(false)}
          addHighlight={addHighlight}
          editMemo={editMemo}
        />
      )}
    </HighlightableTextBlock>
  );
};

const PopupBox = styled.div`
  position: absolute;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const HighlightBox = styled.div``;

export default HighlightableText;
