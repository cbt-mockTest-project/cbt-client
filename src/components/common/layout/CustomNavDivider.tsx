import palette from '@styles/palette';
import { Divider } from 'antd';
import React from 'react';

const CustomNavDivider = () => {
  return (
    <Divider
      dashed
      style={{
        margin: '10px auto',
        width: '80%',
        height: '1px',
        backgroundColor: palette.gray_100,
      }}
    />
  );
};

export default CustomNavDivider;
