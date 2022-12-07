import React from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import palette from '@styles/palette';
import { checkboxOption } from 'customTypes';
import { QuestionState } from 'types';
import SquareSelectboxGroup from '../selectbox/SquareSelectboxGroup';
import { circleIcon, triangleIcon } from '@lib/constants';

interface AchievCheckButtonGroupProps {
  onCheckboxChange: (value: checkboxOption['value']) => Promise<void>;
  initialSelectedValue: QuestionState;
}

const AchievCheckButtonGroup: React.FC<AchievCheckButtonGroupProps> = ({
  onCheckboxChange,
  initialSelectedValue,
}) => {
  const checkboxOptions: checkboxOption[] = [
    { value: QuestionState.High, label: circleIcon },
    { value: QuestionState.Middle, label: triangleIcon },
    { value: QuestionState.Row, label: <ClearIcon /> },
  ];
  return (
    <AchievCheckButtonGroupContainer>
      <SquareSelectboxGroup
        options={checkboxOptions}
        onChange={(value: checkboxOption['value']) => onCheckboxChange(value)}
        initialSelectedValue={initialSelectedValue}
      />
    </AchievCheckButtonGroupContainer>
  );
};

export default AchievCheckButtonGroup;

const AchievCheckButtonGroupContainer = styled.div`
  display: flex;
  align-items: center;
  .achiev-check-button-group {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  }

  .x {
    svg {
      width: 40px;
    }
  }
  .active-button {
    .ant-btn:focus {
      color: transparent;
      border-color: transparent;
    }
    color: ${palette.antd_blue_01} !important;
    border-color: ${palette.antd_blue_01} !important;
  }
`;
