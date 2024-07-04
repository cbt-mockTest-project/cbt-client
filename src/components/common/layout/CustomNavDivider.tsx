import palette from '@styles/palette';
import { Divider } from 'antd';
import React from 'react';
import { useTheme } from 'styled-components';

const CustomNavDivider = () => {
  const theme = useTheme();
  return (
    <Divider
      style={{
        margin: '10px auto',
        width: '80%',
        height: '1px',
        backgroundColor: theme.color('colorBorder'),
      }}
    />
  );
};

export default CustomNavDivider;
