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
  .category-controlbar-filter-wrapper {
    display: flex;
    align-items: flex-end;
    gap: 17px;
  }
`;

interface CategoryControlbarProps {
  switch: {
    checked: boolean;
    onChangeSwitch: () => void;
  };
  textInput: { onChangeText: (v: string) => void };
  additionalFilterComponent?: React.ReactNode;
}

const CategoryControlbar: React.FC<CategoryControlbarProps> = ({
  switch: { checked, onChangeSwitch },
  textInput: { onChangeText },
  additionalFilterComponent = null,
}) => {
  return (
    <CategoryControlbarBlock>
      <div className="category-multiple-select-toggle-switch-wrapper">
        <Switch checked={checked} onChange={onChangeSwitch} />
        <div>다중 선택 모드</div>
      </div>
      <div className="category-controlbar-filter-wrapper">
        {additionalFilterComponent}
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