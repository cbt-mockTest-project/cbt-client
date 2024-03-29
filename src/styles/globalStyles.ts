import { responsive } from '@lib/utils/responsive';
import { createGlobalStyle } from 'styled-components';
import palette from './palette';

const Globalstyles = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    /* -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none; */
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  *{
    font-family: 'Noto Sans KR', sans-serif;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    /* background-color: ${palette.colorBg}; */
    overflow-x: hidden !important;
    overflow-y : auto;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  * {
    box-sizing : border-box;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration : none;
    color : inherit;
  }
  input, textarea {
    border : none;
    border-radius:0px;
    box-shadow: none;
    outline-style:none;
    -webkit-appearance:none;
    -moz-appearance: none;
    -o-appearance:none;
    appearance: none;
  }
  button{
    background: inherit; 
    border: none; 
    box-shadow: none; 
    border-radius: 0; 
    padding: 0; 
    overflow: visible; 
    cursor: pointer
  }
  .not-draggable {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .ml-auto {
    margin-left : auto;
  }
  .mr-auto {
    margin-left : auto;
  }
  .select-none {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .visible-on-mobile {
    display: none;
    @media (max-width: ${responsive.medium}) {
      display: block;
    }
  }

  .visible-on-pc {
    display: block;
    @media (max-width: ${responsive.medium}) {
      display: none;
    }
  }
  .display-none {
    display: none;
  }
  .hidden-title {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    background-color: transparent;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  .hidden-scroll {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }

  .ant-tooltip-inner {
        font-size: 12px !important;
        max-width: 300px !important;
        white-space: pre-wrap !important;
      }

  /* .ant-modal-content {
    background: #1F1F1F !important;
    color : rgba(255, 255, 255, 0.85) !important;;
  }
  .ant-modal-confirm-title, .ant-modal-confirm-content {
    color : rgba(255, 255, 255, 0.85) !important;;
  }
  .ant-message-notice-content {
    background: #1F1F1F !important;
    color : rgba(255, 255, 255, 0.85) !important;;
  }
  .ant-btn-default {
    background-color: #141414;
    border-color: #424242;
    color: #FFFFFFD9;
  } */
  a {
    :hover{
      color : unset ;
    }
  }

  @media (max-width: ${responsive.lsmall}) {
    * {
      -webkit-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
  }
`;

export default Globalstyles;
