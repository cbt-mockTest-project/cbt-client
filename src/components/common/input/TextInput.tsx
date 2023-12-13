import { Input, InputProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

const TextInputBlock = styled(Input)`
  border-radius: 0 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  background-color: transparent !important;
  &:focus {
    box-shadow: none !important;
  }
`;

interface TextInputProps extends InputProps {}

const TextInput: React.FC<TextInputProps> = (props) => {
  return <TextInputBlock {...props} />;
};

export default TextInput;
