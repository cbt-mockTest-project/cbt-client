import useThemeControl from '@lib/hooks/useThemeControl';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import styled, { css, useTheme } from 'styled-components';
import tinycolor from 'tinycolor2';
type BasicCardType = 'basic' | 'primary';

const BasicCardBlock = styled.div<{
  hoverEffect: boolean;
  type: BasicCardType;
}>`
  background-color: ${({ theme }) => theme.color('colorBgContainer')};
  border-radius: 10px;
  padding: 10px 20px;
  list-style: none;
  border: 1px solid
    ${({ type, theme }) => {
      if (type === 'basic') {
        return theme.color('colorSplit');
      }
      return theme.color('colorBorder');
    }};
  width: 100%;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.hoverEffect &&
    css`
      &:hover {
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        cursor: pointer;
      }
    `}
`;

interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
  type?: BasicCardType;
  className?: string;
}

const BasicCard: React.FC<BasicCardProps> = (props) => {
  const router = useRouter();
  const isStudyPage = ['/exam/solution', '/study', '/exams', '/question/'].some(
    (path) => router.pathname.startsWith(path)
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { theme: currentTheme } = useThemeControl();
  const {
    type = 'basic',
    className = '',
    children,
    hoverEffect = false,
    ...divProps
  } = props;
  const isGrayish = (color: string) => {
    const rgb = tinycolor(color).toRgb();
    const tolerance = 30; // RGB 값의 차이가 30 이하면 회색으로 간주
    return (
      Math.abs(rgb.r - rgb.g) <= tolerance &&
      Math.abs(rgb.g - rgb.b) <= tolerance &&
      Math.abs(rgb.r - rgb.b) <= tolerance
    );
  };
  const isColorDark = (color: string) => {
    return tinycolor(color).getBrightness() < 128;
  };

  const getLighterColor = (color: string) => {
    if (isGrayish(color)) {
      return theme.color('colorText');
    }
    return color;
  };

  useEffect(() => {
    if (!isStudyPage) return;
    const adjustColors = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      const color = style.color;

      if (currentTheme === 'light') {
        element.style.removeProperty('color');
      } else if (isColorDark(color)) {
        element.style.color = getLighterColor(color);
      }

      Array.from(element.children).forEach((child) => {
        adjustColors(child as HTMLElement);
      });
    };

    if (cardRef.current) {
      adjustColors(cardRef.current);
    }
  }, [currentTheme, isStudyPage]);
  return (
    <BasicCardBlock
      {...divProps}
      type={type}
      ref={cardRef}
      hoverEffect={hoverEffect}
      className={className}
    >
      {children}
    </BasicCardBlock>
  );
};

export default BasicCard;
