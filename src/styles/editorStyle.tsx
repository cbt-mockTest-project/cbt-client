import { css } from 'styled-components';
import palette from './palette';
import 'quill-better-table/dist/quill-better-table.css';
const EditorStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: bold;
  }
  li {
    margin: 0;
  }
  li[data-list='ordered'],
  li[data-list='bullet'] {
    padding: 0;
    .ql-ui {
      ::before {
        content: none;
      }
    }
  }
  strong {
    font-weight: bold;
    color: inherit;
    * {
      font-weight: bold;
    }
  }

  br {
    line-height: 170%;
  }
  p {
    font-family: Noto Sans, Noto Sans KR, sans-serif;
    font-size: 16px;
    display: block;
    word-break: break-word;
    line-height: 24px;
  }
  h1 {
    font-size: 21px;
    line-height: 30px;
  }
  h2 {
    font-size: 18px;
    line-height: 27px;
  }
  h3 {
    font-size: 16px;
    line-height: 24px;
  }
  h4 {
    font-size: 14px;
    line-height: 21px;
  }
  h5 {
    font-size: 12px;
    line-height: 17px;
  }
  h6 {
    font-size: 10px;
    line-height: 15px;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    object-fit: contain;
  }
  hr {
    display: block;
    align-items: center;
    position: relative;
    margin: 12px 0;
    width: 100%;
    border: none;
    overflow: visible;
    height: 12px;
    overflow: visibility;
  }
  /** 밑줄 */
  u,
  em {
    color: inherit;
  }

  /** 링크 */
  a {
    line-height: 1.5;
    display: block;
    cursor: pointer;
    text-decoration: none !important;
  }

  li {
    line-height: 26px;
    &::before {
      display: block;
      margin-right: 8px;
      text-align: right;
      font-weight: bold;
    }
  }
  ol {
    counter-reset: ol;
    li:not([data-list='bullet']) {
      display: flex;
      align-items: flex-start;
      &::before {
        counter-increment: ol;
        content: counter(ol);
        width: 20px;
      }
    }

    @supports (not (content: counter(ol, '①'))) {
      li:not([data-list='bullet']):nth-child(1)::before {
        content: '① ';
      }
      li:not([data-list='bullet']):nth-child(2)::before {
        content: '② ';
      }
      li:not([data-list='bullet']):nth-child(3)::before {
        content: '③ ';
      }
      li:not([data-list='bullet']):nth-child(4)::before {
        content: '④ ';
      }
      li:not([data-list='bullet']):nth-child(5)::before {
        content: '⑤ ';
      }
      li:not([data-list='bullet']):nth-child(6)::before {
        content: '⑥ ';
      }
      li:not([data-list='bullet']):nth-child(7)::before {
        content: '⑦ ';
      }
      li:not([data-list='bullet']):nth-child(8)::before {
        content: '⑧ ';
      }
      li:not([data-list='bullet']):nth-child(9)::before {
        content: '⑨ ';
      }
      li:not([data-list='bullet']):nth-child(10)::before {
        content: '⑩ ';
      }
      li:not([data-list='bullet']):nth-child(11)::before {
        content: '⑪ ';
      }
      li:not([data-list='bullet']):nth-child(12)::before {
        content: '⑫ ';
      }
      li:not([data-list='bullet']):nth-child(13)::before {
        content: '⑬ ';
      }
      li:not([data-list='bullet']):nth-child(14)::before {
        content: '⑭ ';
      }
      li:not([data-list='bullet']):nth-child(15)::before {
        content: '⑮ ';
      }
      /* 필요한 만큼 계속 추가 가능 */
    }
  }
  ul {
    li {
      &::before {
        content: '•';
        display: inline-block;
      }
    }
  }
  ol {
    li[data-list='bullet'] {
      &::before {
        content: '•';
        display: inline-block;
      }
    }
  }
  .youtube-video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    .youtube-video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .ql-divider {
    width: 100%;
    margin: 12px auto 12px 0;
  }
  .ql-half-left-divider {
    width: 50%;
    margin: 12px auto 12px 0;
  }
  .ql-half-right-divider {
    width: 50%;
    margin: 12px 0 12px auto;
  }
  .ql-smile-divider {
    &::after {
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: url('/static/svg/project/miniintern_smile.svg');
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      background: white;
    }
  }
  .ql-container {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .ql-toolbar {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  /** 정렬하기 */
  .ql-align-justify {
    text-align: justify;
  }
  .ql-align-left {
    text-align: left;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }

  .ql-editor.ql-blank::before {
    font-style: normal;
    color: ${palette.gray_400};
    font-weight: normal;
    font-size: 15px;
  }

  /** 들여쓰기 */
  .ql-indent-1 {
    padding-left: 3em;
  }
  .ql-indent-2 {
    padding-left: 6em;
  }
  .ql-indent-3 {
    padding-left: 9em;
  }
  .ql-indent-4 {
    padding-left: 12em;
  }
  .ql-indent-5 {
    padding-left: 15em;
  }
  .ql-indent-6 {
    padding-left: 18em;
  }
  .ql-indent-7 {
    padding-left: 21em;
  }
  .ql-indent-8 {
    padding-left: 24em;
  }
  li {
    display: flex !important;
    sub {
      align-self: flex-end;
      height: 22px;
    }
  }
  sub {
    vertical-align: sub;
    font-size: smaller;
  }
  sup {
    vertical-align: super;
    font-size: smaller;
  }
`;

export default EditorStyle;
