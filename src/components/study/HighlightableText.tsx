import React, { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import OuterClick from '@components/common/outerClick/OuterClick';
import { v4 as uuidv4 } from 'uuid';
import { Button, Drawer, Tooltip } from 'antd';
import HighlighMemoModalModal from './HighlightMemoModal';
import ReactDOM from 'react-dom';
import {
  InsertTextHighlightInput,
  MockExamQuestion,
  TextHighlight,
} from 'types';
import useQuestions from '@lib/hooks/useQuestions';
import useAuth from '@lib/hooks/useAuth';
import { isMobile } from 'react-device-detect';
import HighlightMobileDrawerContent from './HighlightMobileDrawerContent';
import { useLongPress } from 'use-long-press';
import HighlightColorSelect, {
  HIGHLIGHT_COLOR_KEY,
  HIGHLIGHT_YELLOW,
} from './HighlightColorSelect';
import { LocalStorage } from '@lib/utils/localStorage';

const HighlightableTextBlock = styled.div<{ currentColor: string }>`
  * {
    &::selection {
      color: black;
      background: ${({ currentColor }) => currentColor};
    }

    &::-moz-selection {
      color: black;
      background: ${({ currentColor }) => currentColor};
    }
  }

  font-size: 16px;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  ${EditorStyle};
`;

export type AddHighlight = (memo?: string) => void;
export type EditMemo = (id: string, memo: string) => void;

interface HighlightableTextProps {
  content: string;
  question: MockExamQuestion;
  type: 'question' | 'answer';
  textHighlights: TextHighlight[];
}

const HighlightableText: React.FC<HighlightableTextProps> = ({
  content,
  question,
  type,
  textHighlights,
}) => {
  const localStorage = new LocalStorage();
  const [selectedColor, setSelectedColor] = useState(HIGHLIGHT_YELLOW);
  const bind = useLongPress(
    (event, { context }) => {
      if (isMobile && context) {
        handleHighlightClick(context as string);
      }
    },
    {
      threshold: 500, // 롱프레스로 인식할 시간 (밀리초)
      cancelOnMovement: true,
    }
  );
  const { handleCheckLogin } = useAuth();
  const { insertTextHighlight, removeTextHighlight } = useQuestions();
  const ref = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const [highlightElements, setHighlightElements] = useState<
    React.ReactPortal[]
  >([]);
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [selectedHighlight, setSelectedHighlight] =
    useState<TextHighlight | null>(null);

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (showEditPopup || showMemoModal) return;
    // 약간의 지연 후 텍스트 선택 확인
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (range.toString().trim() !== '') {
        e.preventDefault();
        setSelectedRange(range);
        // 선택된 텍스트의 위치를 기반으로 팝업 위치 설정
        const rect = range.getBoundingClientRect();
        setPopupPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom,
        });
        setShowMobilePopup(true);
        setSelectedHighlight(null);
        removeSelection();
      }
    }
  };

  const handleTouchStart = () => {
    // 터치 시작 시 기존 팝업 닫기
    setShowMobilePopup(false);
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
    if (!handleCheckLogin()) return;
    if (selectedRange) {
      const newHighlight: InsertTextHighlightInput = {
        textHighlightId: uuidv4(),
        questionId: question.id,
        data: {
          type,
          startContainer: getNodePath(selectedRange.startContainer),
          endContainer: getNodePath(selectedRange.endContainer),
          startOffset: selectedRange.startOffset,
          endOffset: selectedRange.endOffset,
          text: selectedRange.toString(),
          color: selectedColor,
          memo,
        },
      };
      insertTextHighlight(question, newHighlight);

      setShowPopup(false);
      setSelectedRange(null);
    }
  };
  const editHighlightColor = (color: string) => {
    if (!handleCheckLogin()) return;

    const found = textHighlights.find((h) => h.id === selectedHighlight?.id);
    if (!found) return;
    const input: InsertTextHighlightInput = {
      textHighlightId: found.id,
      questionId: question.id,
      data: {
        endContainer: found.data.endContainer,
        startOffset: found.data.startOffset,
        endOffset: found.data.endOffset,
        startContainer: found.data.startContainer,
        text: found.data.text,
        type: found.data.type,
        memo: found.data.memo,
        color,
      },
    };
    insertTextHighlight(question, input);
    removeSelection();
  };

  const editMemo = (id: string, memo: string) => {
    if (!handleCheckLogin()) return;
    const found = textHighlights.find((h) => h.id === id);
    if (!found) return;
    const input: InsertTextHighlightInput = {
      textHighlightId: found.id,
      questionId: question.id,
      data: {
        endContainer: found.data.endContainer,
        startOffset: found.data.startOffset,
        endOffset: found.data.endOffset,
        startContainer: found.data.startContainer,
        color: found.data.color,
        text: found.data.text,
        type: found.data.type,
        memo,
      },
    };
    insertTextHighlight(question, input);
    removeSelection();
  };

  const removeHighlight = () => {
    if (selectedHighlight) {
      removeTextHighlight(question, {
        textHighlightId: selectedHighlight.id,
      });
    }
    setShowEditPopup(false);
    setSelectedHighlight(null);
  };

  const handleHighlightClick = (highlightId: string) => {
    const highlight = textHighlights.find((h) => h.id === highlightId);
    if (!highlight) return;

    setSelectedHighlight(highlight);
    setSelectedColor(highlight.data.color);

    try {
      const range = document.createRange();
      const startNode = getNodeFromPath(highlight.data.startContainer);
      const endNode = getNodeFromPath(highlight.data.endContainer);

      if (startNode && endNode) {
        range.setStart(startNode, highlight.data.startOffset);
        range.setEnd(endNode, highlight.data.endOffset);

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
    removeSelection();
  };
  const renderHighlights = () => {
    if (!ref.current) return;
    ref.current
      .querySelectorAll('.highlight-overlay')
      .forEach((el) => el.remove());
    const containerRect = ref.current.getBoundingClientRect();
    const newHighlightElements: React.ReactPortal[] = [];
    textHighlights.forEach((highlight) => {
      try {
        let range = document.createRange();
        const startNode = getNodeFromPath(highlight.data.startContainer);
        const endNode = getNodeFromPath(highlight.data.endContainer);
        if (startNode && endNode) {
          try {
            range.setStart(startNode, highlight.data.startOffset);
            range.setEnd(endNode, highlight.data.endOffset);
          } catch (error) {
            console.warn(
              'Failed to set range, attempting text-based recovery',
              error
            );
            // 텍스트 기반 복구 시도
            const textContent = ref.current.textContent || '';
            const startIndex = textContent.indexOf(highlight.data.text);
            if (startIndex !== -1) {
              const endIndex = startIndex + highlight.data.text.length;
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
            HighlightEl.style.backgroundColor =
              highlight.data.color || HIGHLIGHT_YELLOW;
            HighlightEl.setAttribute('data-highlight-id', highlight.id);
            HighlightEl.style.position = 'absolute';
            HighlightEl.style.top = `${rect.top - containerRect.top}px`;
            HighlightEl.style.left = `${rect.left - containerRect.left}px`;
            HighlightEl.style.width = `${rect.width}px`;
            HighlightEl.style.height = `${rect.height}px`;
            HighlightEl.style.pointerEvents = 'auto';
            HighlightEl.style.zIndex = '1';
            HighlightEl.style.mixBlendMode = 'multiply';
            ref.current.appendChild(HighlightEl);
            const portal = ReactDOM.createPortal(
              <Tooltip title={highlight.data.memo || ''}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isMobile) {
                      handleHighlightClick(highlight.id);
                    }
                  }}
                  {...bind(highlight.id)}
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

  const removeSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
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
    if (ref.current) {
      renderHighlights();
    }
  }, [textHighlights, ref]);

  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('copy', handleCopy);
      element.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (element) {
        element.removeEventListener('copy', handleCopy);
        element.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [ref]);

  useEffect(() => {
    const color = localStorage.get(HIGHLIGHT_COLOR_KEY);
    if (color) {
      setSelectedColor(color);
    }
  }, []);

  return (
    <>
      {isMobile && (
        <Drawer
          title={null}
          closable={false}
          placement="bottom"
          open={showMobilePopup}
          onClose={() => setShowMobilePopup(false)}
          height={150}
        >
          <HighlightMobileDrawerContent
            highlight={selectedHighlight}
            addHighlight={addHighlight}
            editMemo={editMemo}
            onClose={() => setShowMobilePopup(false)}
          />
        </Drawer>
      )}
      <HighlightableTextBlock
        currentColor={selectedColor}
        id={uniqueId}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        ref={ref}
      >
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
              <HighlightColorSelect
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <Button
                className="w-full"
                type="text"
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!handleCheckLogin()) return;
                  addHighlight();
                  removeSelection();
                }}
              >
                형광펜
              </Button>
              <Button
                className="w-full"
                type="text"
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!handleCheckLogin()) return;
                  setShowMemoModal(true);
                  removeSelection();
                }}
              >
                메모
              </Button>
              {isMobile && (
                <Button
                  className="w-full"
                  type="text"
                  size="large"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPopup(false);
                    removeSelection();
                  }}
                >
                  닫기
                </Button>
              )}
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
              <HighlightColorSelect
                onSelectColor={editHighlightColor}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <Button
                className="w-full"
                type="text"
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  removeHighlight();
                }}
              >
                제거
              </Button>
              <Button
                className="w-full"
                type="text"
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMemoModal(true);
                }}
              >
                메모
              </Button>
              {isMobile && (
                <Button
                  className="w-full"
                  type="text"
                  size="large"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditPopup(false);
                  }}
                >
                  닫기
                </Button>
              )}
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
    </>
  );
};

const PopupBox = styled.div`
  position: absolute;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.color('colorBgContainer')};
  border: 1px solid ${({ theme }) => theme.color('colorBorder')};
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export default HighlightableText;
