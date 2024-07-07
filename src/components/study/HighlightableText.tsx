import React, { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import OuterClick from '@components/common/outerClick/OuterClick';

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

interface Highlight {
  id: string;
  startOffset: number;
  endOffset: number;
  text: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

interface HighlightableTextProps {
  content: string;
}

const HighlightableText: React.FC<HighlightableTextProps> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(
    null
  );

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
      }
    }
  };

  const addHighlight = () => {
    if (selectedRange) {
      const rect = selectedRange.getBoundingClientRect();
      const parentRect = document
        .getElementById(uniqueId)
        .getBoundingClientRect();

      const newHighlight: Highlight = {
        id: Date.now().toString(),
        startOffset: selectedRange.startOffset,
        endOffset: selectedRange.endOffset,
        text: selectedRange.toString(),
        top: rect.top - parentRect.top,
        left: rect.left - parentRect.left,
        width: rect.width,
        height: rect.height,
      };

      setHighlights((prevHighlights) => [...prevHighlights, newHighlight]);
      setShowPopup(false);
      setSelectedRange(null);
    }
  };

  const removeHighlight = () => {
    if (selectedHighlight) {
      setHighlights((prevHighlights) =>
        prevHighlights.filter((h) => h.id !== selectedHighlight.id)
      );
      setShowRemovePopup(false);
      setSelectedHighlight(null);
    }
  };

  const handleHighlightClick = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
    setPopupPosition({
      x: highlight.left + highlight.width,
      y: highlight.top + highlight.height,
    });
    setShowRemovePopup(true);
  };

  return (
    <HighlightableTextBlock id={uniqueId} onMouseUp={handleMouseUp} ref={ref}>
      {parse(content || '')}
      {highlights.map((highlight) => (
        <HighlightBox
          key={highlight.id}
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
      ))}
      {showPopup && (
        <OuterClick callback={() => setShowPopup(false)}>
          <PopupBox
            style={{
              top: popupPosition.y,
              left: popupPosition.x,
              position: 'fixed',
            }}
          >
            <button onClick={addHighlight}>형광펜</button>
          </PopupBox>
        </OuterClick>
      )}
      {showRemovePopup && (
        <OuterClick callback={() => setShowRemovePopup(false)}>
          <PopupBox
            style={{
              top: popupPosition.y,
              left: popupPosition.x,
            }}
          >
            <button onClick={removeHighlight}>형광펜 제거</button>
          </PopupBox>
        </OuterClick>
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
