import {
  Button,
  ButtonProps,
  Divider,
  Input,
  InputProps,
  Select,
  SelectProps,
  Space,
} from 'antd';
import React from 'react';
import styled from 'styled-components';

export interface SelectAddProps {
  selectOption: SelectProps;
  inputOption: InputProps;
  buttonOption: ButtonProps;
}

const SelectAdd: React.FC<SelectAddProps> = ({
  selectOption,
  inputOption,
  buttonOption,
}) => {
  return (
    <Select
      {...selectOption}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input {...inputOption} />
            <Button {...buttonOption}>{buttonOption.children}</Button>
          </Space>
        </>
      )}
    />
  );
};

export default SelectAdd;

const SelectAddContainer = styled.div``;
