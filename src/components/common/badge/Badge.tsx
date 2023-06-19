import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  color: 'blue' | 'red';
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ color, label }) => {
  return <BadgeContainer color={color}>{label}</BadgeContainer>;
};

export default Badge;

interface BadgeContainerProps {
  color: 'blue' | 'red';
}

const BadgeContainer = styled.label<BadgeContainerProps>`
  color: ${(props) =>
    props.color === 'blue' ? palette.antd_blue_01 : palette.red_500};
  border: 1px solid;
  padding: 0 5px;
  font-size: 0.5rem;
  border-radius: 20px;
  white-space: nowrap;
  width: max-content;
  border-color: ${(props) =>
    props.color === 'blue' ? palette.antd_blue_01 : palette.red_500};
`;
