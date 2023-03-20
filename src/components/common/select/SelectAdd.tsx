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
  editButtonOption: ButtonProps;
}

const SelectAdd: React.FC<SelectAddProps> = ({
  selectOption,
  inputOption,
  createButtonOption,
  deleteButtonOption,
  editButtonOption,
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
            <Button {...createButtonOption}>
              {createButtonOption.children}
            </Button>
            <Button {...deleteButtonOption}>
              {deleteButtonOption.children}
            </Button>
            <Button {...editButtonOption}>{editButtonOption.children}</Button>
          </Space>
        </>
      )}
    />
  );
};

export default SelectAdd;

const SelectAddContainer = styled.div``;
