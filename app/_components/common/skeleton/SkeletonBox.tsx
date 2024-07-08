import { skeletonStyle } from '../../../_styles/utils';
import React from 'react';
import styled from 'styled-components';

interface SkeletonBoxProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width = '100%',
  height = 'auto',
  borderRadius = '0',
  className,
}) => {
  return (
    <SkeletonBoxContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      className={className}
    />
  );
};

export default SkeletonBox;

const SkeletonBoxContainer = styled.div<SkeletonBoxProps>`
  ${skeletonStyle}
  width : ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
`;
