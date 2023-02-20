import { css } from 'styled-components';
import palette from './palette';

export const skeletonStyle = css`
  @keyframes shine-lines {
    0% {
      background-position: 130%;
    }
    40%,
    100% {
      background-position: -50%;
    }
  }
  animation: shine-lines 1.6s infinite linear;
  background-image: linear-gradient(
    to left,
    ${palette.gray_100},
    ${palette.gray_100} 42%,
    ${palette.gray_200} 54%,
    ${palette.gray_100} 66%,
    ${palette.gray_100}
  );
  background-size: 100vh;
`;
