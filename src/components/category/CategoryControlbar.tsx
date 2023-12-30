import TextInput from '@components/common/input/TextInput';
import { Switch } from 'antd';
import React from 'react';
import styled from 'styled-components';

const CategoryControlbarBlock = styled.div`
  .category-multiple-select-toggle-switch-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 17px;
  }
  .category-exam-filter-input {
    margin-top: 20px;
    max-width: 500px;
  }
`;

interface CategoryControlbarProps {
  switch: {
    checked: boolean;
    onChangeSwitch: () => void;
  };
  textInput: { onChangeText: (v: string) => void };
}

const CategoryControlbar: React.FC<CategoryControlbarProps> = ({
  switch: { checked, onChangeSwitch },
  textInput: { onChangeText },
}) => {
  return (
    <CategoryControlbarBlock>
      <div className="category-multiple-select-toggle-switch-wrapper">
        <Switch checked={checked} onChange={onChangeSwitch} />
        <span>다중 선택 모드</span>
      </div>
      <div>
        <TextInput
          className="category-exam-filter-input"
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="시험지 필터링"
        />
      </div>
    </CategoryControlbarBlock>
  );
};

export default CategoryControlbar;
