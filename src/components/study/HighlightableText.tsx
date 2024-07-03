import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
const parentElementId = 'highlightable-text';

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
`;

interface HighlightableTextProps {
  content: string;
}

const HighlightableText: React.FC<HighlightableTextProps> = ({ content }) => {
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      highlightText(range);
      saveHighlights();
    }
  };

  const highlightText = (range) => {
    let startNode = range.startContainer;
    let endNode = range.endContainer;

    if (startNode.nodeType === 3 && endNode.nodeType === 3) {
      let startOffset = range.startOffset;
      let endOffset = range.endOffset;
      if (startNode === endNode) {
        const middleNode = startNode.splitText(startOffset);
        middleNode.splitText(endOffset - startOffset);
        wrapNodeWithSpan(middleNode);
      } else {
        const startMiddleNode = startNode.splitText(startOffset);
        wrapNodeWithSpan(startMiddleNode);

        const endMiddleNode = endNode.splitText(endOffset);
        wrapNodeWithSpan(endNode);

        let currentNode = startMiddleNode.nextSibling;
        while (currentNode && currentNode !== endMiddleNode) {
          if (currentNode.nodeType === 3) {
            const nextNode = currentNode.nextSibling;
            wrapNodeWithSpan(currentNode);
            currentNode = nextNode;
          } else {
            currentNode = currentNode.nextSibling;
          }
        }
      }
    }
  };

  const wrapNodeWithSpan = (node) => {
    const span = document.createElement('span');
    span.className = 'highlighted';
    span.style.backgroundColor = 'yellow';
    node.parentNode.insertBefore(span, node);
    span.appendChild(node);
  };

  const saveHighlights = () => {
    const highlights = Array.from(
      document.querySelectorAll('.highlighted')
    ).map((span) => {
      const range = document.createRange();
      range.selectNodeContents(span);
      return {
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        text: span.textContent,
      };
    });
    localStorage.setItem('highlights', JSON.stringify(highlights));
  };
  const applySavedHighlights = () => {
    const highlights = JSON.parse(localStorage.getItem('highlights') || '[]');
    highlights.forEach(
      ({
        startOffset,
        endOffset,
        text,
      }: {
        startOffset: number;
        endOffset: number;
        text: string;
      }) => {
        const range = document.createRange();
        const textNode = findTextNode(
          document.body,
          text,
          startOffset,
          endOffset
        );
        if (textNode) {
          range.setStart(textNode, startOffset);
          range.setEnd(textNode, endOffset);
          highlightText(range);
        }
      }
    );
  };

  const findTextNode = (
    node: Node,
    text: string,
    startOffset: number,
    endOffset: number
  ): Node | null => {
    if (node.nodeType === 3) {
      const nodeText = (node as Text).textContent || '';
      if (nodeText.includes(text) && nodeText.length >= endOffset) {
        return node;
      }
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      const result = findTextNode(
        node.childNodes[i],
        text,
        startOffset,
        endOffset
      );
      if (result) return result;
    }

    return null;
  };

  useEffect(() => {
    applySavedHighlights();
    console.log(content);
    console.log(document.getElementById(parentElementId).textContent);
  }, []);
  return (
    <HighlightableTextBlock id={parentElementId} onMouseUp={handleMouseUp}>
      {parse(content || '')}
    </HighlightableTextBlock>
  );
};

export default HighlightableText;
