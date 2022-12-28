import React from 'react';
import styled from 'styled-components';
import palette from '@styles/palette';
import { checkboxOption } from 'customTypes';
import { QuestionState } from 'types';
import SquareSelectboxGroup from '../selectbox/SquareSelectboxGroup';
import { circleIcon, clearIcon, triangleIcon } from '@lib/constants';
import { responsive } from '@lib/utils/responsive';
interface AchievCheckButtonGroupProps {
  onCheckboxChange: (value: checkboxOption['value']) => Promise<void>;
  currentQuestionId: number;
}

const AchievCheckButtonGroup: React.FC<AchievCheckButtonGroupProps> = ({
  onCheckboxChange,
  currentQuestionId,
}) => {
  const checkboxOptions: checkboxOption[] = [
    { value: QuestionState.High, label: circleIcon },
    { value: QuestionState.Middle, label: triangleIcon },
    { value: QuestionState.Row, label: clearIcon },
  ];
  return (
    <AchievCheckButtonGroupContainer>
      <SquareSelectboxGroup
        options={checkboxOptions}
        onClick={onCheckboxChange}
        currentQuestionId={currentQuestionId}
      />
    </AchievCheckButtonGroupContainer>
  );
};

export default AchievCheckButtonGroup;

const AchievCheckButtonGroupContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  .achiev-check-button-group {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  }
  .active-button {
    .ant-btn:focus {
      color: transparent;
      border-color: transparent;
    }
    color: ${palette.antd_blue_01} !important;
    border-color: ${palette.antd_blue_01} !important;
  }
  @media (max-width: ${responsive.medium}) {
    margin-left: 0;
  }
`;
