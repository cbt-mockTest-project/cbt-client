import { ThemeValue } from '../../../customTypes';
import styled, { css } from 'styled-components';

export const CustomStyleProvider = styled.div<{ mode: ThemeValue }>`
  a {
    color: ${({ theme }) => theme.color('colorText')};
  }

  ${(props) => props.mode === 'dark' && css``}
  ${(props) => props.mode === 'light' && css``}
`;
