import React, { useState } from 'react';
import TooltipIconSVG from '@assets/svg/icon-noti-tooltip-question.svg';
import styled, { css } from 'styled-components';
import palette from '../../../_styles/palette';
import { AnimatePresence, motion, Variant, Variants } from 'framer-motion';
import useToggle from '../../../_lib/hooks/useToggle';

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
  const {
    value: tooltipState,
    setValue: setTooltipState,
    onToggle: onToggleTooltipState,
  } = useToggle(false);
  const tootipVariants: Variants = {
    initial: {
      opacity: 0,
      translateY:
        position === 'bottom'
          ? 'calc(0% + (-8px))'
          : position === 'top'
          ? 'calc(-100% + (-23px))'
          : undefined,
    },
    animate: {
      opacity: 1,
      translateY:
        position === 'bottom'
          ? 'calc(0% + (-1px))'
          : position === 'top'
          ? 'calc(-100% + (-30px))'
          : position === 'top-left'
          ? 'calc(-100% + (-30px))'
          : undefined,
    },
    exit: {
      opacity: 0,
      translateY:
        position === 'bottom'
          ? 'calc(0% + (-8px))'
          : position === 'top'
          ? 'calc(-100% + (-23px))'
          : undefined,
    },
  };
  return (
    <TooltipBlock className={className} padding={padding}>
      <div
        className="tooltip-wrapper"
        onMouseOver={() => setTooltipState(true)}
        onMouseLeave={() => setTooltipState(false)}
        onClick={onToggleTooltipState}
      >
        <TooltipIconSVG
          width={iconWidth}
          height={iconHeight}
          viewBox="0 0 24 24"
        />
      </div>
      <AnimatePresence>
        {tooltipState && (
          <motion.div
            variants={tootipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="tooltip-content"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipBlock>
  );
};

export default Tooltip;

interface TooltipBlockProps {
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
  }
`;
