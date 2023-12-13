import { Input, InputProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

const TextInputBlock = styled(Input)`
  margin-top: 20px;
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  max-width: 500px;
  background-color: transparent;
  &:focus {
    box-shadow: none;
  }
`;

interface TextInputProps extends InputProps {}

const TextInput: React.FC<TextInputProps> = (props) => {
  return <TextInputBlock {...props} />;
};

export default TextInput;
