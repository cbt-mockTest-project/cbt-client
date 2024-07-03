import { ThemeValue } from 'customTypes';
import styled, { css } from 'styled-components';

export const CustomStyleProvider = styled.div<{ theme: ThemeValue }>`
  ${(props) => props.theme === 'dark' && css``}
  ${(props) => props.theme === 'light' && css``}
`;
