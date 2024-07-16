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
import ReactDOM from 'react-dom';

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
  startContainer: number[];
  startOffset: number;
  endContainer: number[];
  endOffset: number;
  text: string;
  memo: string;
}

export type AddHighlight = (memo?: string) => void;
export type EditMemo = (id: string, memo: string) => void;

interface HighlightableTextProps {
  content: string;
  questionId: number;
  type: 'question' | 'answer';
}

const HighlightableText: React.FC<HighlightableTextProps> = ({
  content,
  questionId,
  type,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const localStorage = new LocalStorage();
  const uniqueId = useId();
  const [highlights, setHighlights] = useState<TextHighlight[]>([]);
  const [highlightElements, setHighlightElements] = useState<
    React.ReactPortal[]
  >([]);
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

  const getNodePath = (node: Node): number[] => {
    const path = [];
    let current = node;
    while (current && current !== ref.current) {
      const parent = current.parentNode;
      if (parent) {
        path.unshift(
          Array.from(parent.childNodes).indexOf(current as ChildNode)
        );
      }
      current = parent;
    }
    return path;
  };

  const getNodeFromPath = (path: number[]): Node | null => {
    let current: Node | null = ref.current;
    for (const index of path) {
      if (current && current.childNodes[index]) {
        current = current.childNodes[index];
      } else {
        return null;
      }
    }
    return current;
  };

  const addHighlight: AddHighlight = (memo: string = '') => {
    if (selectedRange) {
      const newHighlight: TextHighlight = {
        id: uuidv4(),
        startContainer: getNodePath(selectedRange.startContainer),
        startOffset: selectedRange.startOffset,
        endContainer: getNodePath(selectedRange.endContainer),
        endOffset: selectedRange.endOffset,
        text: selectedRange.toString(),
        memo,
      };
      const newHighlights = [...highlights, newHighlight];
      const prevHighlights = localStorage.get(HIGHLIGHTS) || [];
      localStorage.set(HIGHLIGHTS, [
        ...prevHighlights,
        ...newHighlights.map((el) => ({ ...el, questionId, type })),
      ]);
      setHighlights(newHighlights);
      setShowPopup(false);
      setSelectedRange(null);
    }
  };

  const editMemo = (id: string, memo: string) => {
    const newHighlights = highlights.map((h) =>
      h.id === id ? { ...h, memo } : h
    );
    const prevHighlights = localStorage.get(HIGHLIGHTS) || [];
    localStorage.set(HIGHLIGHTS, [
      ...prevHighlights,
      ...newHighlights.map((el) => ({ ...el, questionId, type })),
    ]);
    setHighlights(newHighlights);
  };

  const removeHighlight = () => {
    if (selectedHighlight) {
      const newHighlights = highlights.filter(
        (h) => h.id !== selectedHighlight.id
      );
      const prevHighlights = localStorage.get(HIGHLIGHTS) || [];
      localStorage.set(HIGHLIGHTS, [
        ...prevHighlights,
        ...newHighlights.map((el) => ({ ...el, questionId, type })),
      ]);
      setHighlights(newHighlights);
      setShowEditPopup(false);
      setSelectedHighlight(null);
    }
  };

  const handleHighlightClick = (highlightId: string) => {
    const highlight = highlights.find((h) => h.id === highlightId);
    if (!highlight) return;

    setSelectedHighlight(highlight);

    try {
      const range = document.createRange();
      const startNode = getNodeFromPath(highlight.startContainer);
      const endNode = getNodeFromPath(highlight.endContainer);

      if (startNode && endNode) {
        range.setStart(startNode, highlight.startOffset);
        range.setEnd(endNode, highlight.endOffset);

        const rects = range.getClientRects();
        if (rects.length > 0) {
          const rect = rects[rects.length - 1]; // 마지막 rect 사용
          const containerRect = ref.current?.getBoundingClientRect();

          if (containerRect) {
            setPopupPosition({
              x: rect.right - containerRect.left,
              y: rect.bottom - containerRect.top,
            });
          }
        }
      }
    } catch (error) {
      console.warn('Failed to set range for popup positioning', error);
      // fallback: 클릭된 요소의 위치 사용
      const clickedElement = document.querySelector(
        `[data-highlight-id="${highlightId}"]`
      ) as HTMLElement;
      if (clickedElement) {
        const rect = clickedElement.getBoundingClientRect();
        const containerRect = ref.current?.getBoundingClientRect();
        if (containerRect) {
          setPopupPosition({
            x: rect.right - containerRect.left,
            y: rect.bottom - containerRect.top,
          });
        }
      }
    }

    setShowEditPopup(true);
  };
  const renderHighlights = () => {
    if (!ref.current) return;

    ref.current
      .querySelectorAll('.highlight-overlay')
      .forEach((el) => el.remove());

    const containerRect = ref.current.getBoundingClientRect();
    const newHighlightElements: React.ReactPortal[] = [];

    highlights.forEach((highlight) => {
      try {
        let range = document.createRange();
        const startNode = getNodeFromPath(highlight.startContainer);
        const endNode = getNodeFromPath(highlight.endContainer);

        if (startNode && endNode) {
          try {
            range.setStart(startNode, highlight.startOffset);
            range.setEnd(endNode, highlight.endOffset);
          } catch (error) {
            console.warn(
              'Failed to set range, attempting text-based recovery',
              error
            );
            // 텍스트 기반 복구 시도
            const textContent = ref.current.textContent || '';
            const startIndex = textContent.indexOf(highlight.text);
            if (startIndex !== -1) {
              const endIndex = startIndex + highlight.text.length;
              const tempRange = document.createRange();
              const [newStartNode, newStartOffset] = findNodeAndOffsetFromIndex(
                ref.current,
                startIndex
              );
              const [newEndNode, newEndOffset] = findNodeAndOffsetFromIndex(
                ref.current,
                endIndex
              );
              if (newStartNode && newEndNode) {
                tempRange.setStart(newStartNode, newStartOffset);
                tempRange.setEnd(newEndNode, newEndOffset);
                range = tempRange;
              }
            }
          }

          const rects = range.getClientRects();
          for (let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            const HighlightEl = document.createElement('div');
            HighlightEl.classList.add('highlight-overlay');
            HighlightEl.setAttribute('data-highlight-id', highlight.id);
            HighlightEl.style.position = 'absolute';
            HighlightEl.style.top = `${rect.top - containerRect.top}px`;
            HighlightEl.style.left = `${rect.left - containerRect.left}px`;
            HighlightEl.style.width = `${rect.width}px`;
            HighlightEl.style.height = `${rect.height}px`;
            HighlightEl.style.backgroundColor = 'yellow';
            HighlightEl.style.opacity = '0.5';
            HighlightEl.style.pointerEvents = 'auto';
            HighlightEl.style.zIndex = '1';
            HighlightEl.style.mixBlendMode = 'multiply';
            ref.current.appendChild(HighlightEl);
            const portal = ReactDOM.createPortal(
              <Tooltip title={highlight.memo || ''}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHighlightClick(highlight.id);
                  }}
                />
              </Tooltip>,
              HighlightEl
            );

            newHighlightElements.push(portal);
          }
        }
      } catch (error) {
        console.error('Failed to render highlight', error);
      }
    });
    setHighlightElements(newHighlightElements);
  };

  // 텍스트 인덱스로부터 노드와 오프셋을 찾는 헬퍼 함수
  const findNodeAndOffsetFromIndex = (
    container: Node,
    index: number
  ): [Node | null, number] => {
    const treeWalker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT
    );
    let currentIndex = 0;
    let currentNode = treeWalker.nextNode();

    while (currentNode) {
      if (currentIndex + currentNode.textContent!.length > index) {
        return [currentNode, index - currentIndex];
      }
      currentIndex += currentNode.textContent!.length;
      currentNode = treeWalker.nextNode();
    }

    return [null, 0];
  };

  useEffect(() => {
    const storedHighlights = localStorage.get(HIGHLIGHTS) || [];
    const filteredHighlights = storedHighlights?.filter(
      (el) => el.questionId === questionId && el.type === type
    );
    if (filteredHighlights) {
      setHighlights(filteredHighlights);
    }
  }, []);

  useEffect(() => {
    renderHighlights();
  }, [highlights]);

  return (
    <HighlightableTextBlock id={uniqueId} onMouseUp={handleMouseUp} ref={ref}>
      {parse(content || '')}
      {highlightElements}
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
