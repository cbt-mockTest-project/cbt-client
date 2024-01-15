// import { colors } from "@/styles/colors";
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import styled, { css } from 'styled-components';
import { ItalicOutlined, BoldOutlined } from '@ant-design/icons';
import { ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';
import palette from '@styles/palette';
import EditorStyle from '@styles/editorStyle';

const CustomToolbarBlock = styled.div<{
  position: CustomToolbarPosition | null;
  display: string;
}>`
  border: 1px solid ${palette.gray_100};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  background-color: ${palette.gray_50};
  position: absolute;
  padding: 8px 10px;
  z-index: 100;
  gap: 15px;
  display: ${(props) => props.display};
  ${EditorStyle};
  ${(props) =>
    props.position &&
    css`
      top: ${props.position.y}px;
      left: ${props.position.x}px;
    `}

  .custom-tool-bar-button {
    color: ${palette.gray_700};
    font-size: 16px;
  }
`;

export interface CustomToolbarPosition {
  x: number;
  y: number;
}

interface CustomToolbarProps {
  position: CustomToolbarPosition | null;
  staticPosition: CustomToolbarPosition | null;
  reactQuillRef: React.MutableRefObject<ReactQuill | null>;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  position,
  staticPosition,
  reactQuillRef,
}) => {
  const toolBarRef = useRef<HTMLDivElement>(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const toggleBold = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault();
    if (!reactQuillRef.current) return;
    const quill = reactQuillRef.current.getEditor();
    const format = quill.getFormat();
    quill.format('bold', !format.bold);
  };
  const toggleItalic = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();
    if (!reactQuillRef.current) return;
    const quill = reactQuillRef.current.getEditor();
    const format = quill.getFormat();
    quill.format('italic', !format.italic);
  };
  const changeColor = (value: Color) => {
    if (!reactQuillRef.current) return;
    const quill = reactQuillRef.current.getEditor();
    quill.format('color', value.toHexString());
  };
  const toggleScriptSub = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();
    if (!reactQuillRef.current) return;
    const quill = reactQuillRef.current.getEditor();
    const format = quill.getFormat();
    quill.format('script', format.script === 'sub' ? false : 'sub');
  };
  const toggleScriptSuper = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();
    if (!reactQuillRef.current) return;
    const quill = reactQuillRef.current.getEditor();
    const format = quill.getFormat();
    quill.format('script', format.script === 'super' ? false : 'super');
  };

  useEffect(() => {
    if (!position || !toolBarRef.current) return;
    const handleKeydown = (e: KeyboardEvent) => {
      const preventEvent = (e: KeyboardEvent) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      };
      if (e.altKey && e.key === 'b') {
        preventEvent(e);
        toggleBold();
      }
      if (e.altKey && e.key === 'ArrowDown') {
        preventEvent(e);
        toggleScriptSub();
      }
      if (e.altKey && e.key === 'ArrowUp') {
        preventEvent(e);
        toggleScriptSuper();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [position, toolBarRef]);
  return (
    <CustomToolbarBlock
      id="toolbar"
      ref={toolBarRef}
      position={colorPickerOpen ? staticPosition : position}
      display={!!(position || colorPickerOpen) ? 'flex' : 'none'}
    >
      <button className="custom-tool-bar-button bold" onClick={toggleBold}>
        <BoldOutlined />
      </button>
      <button className="custom-tool-bar-button italic" onClick={toggleItalic}>
        <ItalicOutlined />
      </button>
      <button className="custom-tool-bar-button sub" onClick={toggleScriptSub}>
        x<sub>2</sub>
      </button>
      <button
        className="custom-tool-bar-button super"
        onClick={toggleScriptSuper}
      >
        x<sup>2</sup>
      </button>
      <button onClick={(e) => e.preventDefault()}>
        <ColorPicker
          size="small"
          onChange={changeColor}
          onOpenChange={setColorPickerOpen}
          presets={[
            {
              label: 'Recommended',
              colors: [
                '#000000',
                '#000000E0',
                '#000000A6',
                '#00000073',
                '#00000040',
                '#00000026',
                '#0000001A',
                '#00000012',
                '#0000000A',
                '#00000005',
                '#F5222D',
                '#FA8C16',
                '#FADB14',
                '#8BBB11',
                '#52C41A',
                '#13A8A8',
                '#1677FF',
                '#2F54EB',
                '#722ED1',
                '#EB2F96',
                '#F5222D4D',
                '#FA8C164D',
                '#FADB144D',
                '#8BBB114D',
                '#52C41A4D',
                '#13A8A84D',
                '#1677FF4D',
                '#2F54EB4D',
                '#722ED14D',
                '#EB2F964D',
              ],
            },
          ]}
        />
      </button>
    </CustomToolbarBlock>
  );
};

export default CustomToolbar;
