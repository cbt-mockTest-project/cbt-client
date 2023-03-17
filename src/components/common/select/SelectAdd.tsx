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
  createButtonOption: ButtonProps;
  deleteButtonOption: ButtonProps;
}

const SelectAdd: React.FC<SelectAddProps> = ({
  selectOption,
  inputOption,
  createButtonOption,
  deleteButtonOption,
}) => {
  return (
    <Select
      {...selectOption}
      removeIcon={<div>hi</div>}
      clearIcon={<div>hi</div>}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input {...inputOption} />
            <Button {...createButtonOption}>
              {createButtonOption.children}
            </Button>
            <Button {...deleteButtonOption}>
              {deleteButtonOption.children}
            </Button>
          </Space>
        </>
      )}
    />
  );
};

export default SelectAdd;

const SelectAddContainer = styled.div``;
