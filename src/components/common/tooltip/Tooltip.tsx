import React, { useState } from 'react';
import TooltipIconSVG from '@assets/svg/icon-noti-tooltip-question.svg';
import styled, { css } from 'styled-components';
import palette from '@styles/palette';

interface TooltipBlockProps {
  position: TooltipPosition;
  tooltipHover: boolean;
  padding: number;
}

const TooltipBlock = styled.div<TooltipBlockProps>`
  position: relative;
  svg {
    cursor: pointer;
  }

  .tooltip-content {
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    ${({ position }) =>
      position === 'bottom'
        ? css`
            transform: translateY(calc(0% + (-8px)));
          `
        : position === 'top' &&
          css`
            transform: translateY(calc(-100% + (-23px)));
          `};
    background-color: ${palette.gray_900};
    border-radius: 5px;
    padding: ${({ padding }) => padding}px;
    position: absolute;
    font-weight: normal;
    width: max-content;
    word-break: break-all;
    z-index: 1;
    pre,
    b {
      color: white;
      font-size: 14px;
    }
    b {
      font-weight: bold;
    }

    ${({ position, tooltipHover }) => {
      if (tooltipHover) {
        if (position === 'bottom')
          return css`
            opacity: 1;
            transform: translateY(calc(0% + (-1px)));
          `;
        if (position === 'top')
          return css`
            opacity: 1;
            transform: translateY(calc(-100% + (-30px)));
          `;
        if (position === 'top-left')
          return css`
            opacity: 1;
            transform: translateY(calc(-100% + (-30px)));
            right: 5px;
          `;
      }
    }}
  }
`;

export type TooltipPosition = 'top' | 'bottom' | 'top-left';

export interface TooltipProps {
  position?: TooltipPosition;
  children?: React.ReactNode;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
  padding?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  position = 'top',
  children,
  iconWidth = 24,
  iconHeight = 24,
  padding = 16,
  className,
}) => {
  const [tooltipHover, setTooltipHover] = useState(false);
  return (
    <TooltipBlock
      position={position}
      tooltipHover={tooltipHover}
      className={className}
      padding={padding}
    >
      <div
        className="tooltip-wrapper"
        onMouseOver={() => setTooltipHover(true)}
        onMouseLeave={() => setTooltipHover(false)}
      >
        <TooltipIconSVG
          width={iconWidth}
          height={iconHeight}
          viewBox="0 0 24 24"
        />
      </div>
      <div className="tooltip-content">{children}</div>
    </TooltipBlock>
  );
};

export default Tooltip;
