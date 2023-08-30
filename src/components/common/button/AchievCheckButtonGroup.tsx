import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '@styles/palette';
import { checkboxOption } from 'customTypes';
import { QuestionState } from 'types';
import { circleIcon, clearIcon, triangleIcon } from '@lib/constants';
import { responsive } from '@lib/utils/responsive';
import SquareSelectbox from '../selectbox/SquareSelectbox';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { handleError } from '@lib/utils/utils';
interface AchievCheckButtonGroupProps {
  onCheckboxChange: (value: checkboxOption['value']) => Promise<void>;
}

const AchievCheckButtonGroup: React.FC<AchievCheckButtonGroupProps> = ({
  onCheckboxChange,
}) => {
  const [selectedState, setSelectedState] = useState<string>(
    QuestionState.Core
  );
  const currentQuestion = useAppSelector((state) => state.exam.currentQuestion);
  const checkboxOptions: checkboxOption[] = [
    { value: QuestionState.High, label: circleIcon },
    { value: QuestionState.Middle, label: triangleIcon },
    { value: QuestionState.Row, label: clearIcon },
  ];
  const requestOnclick = (value: string) => {
    try {
      onCheckboxChange(value);
      setSelectedState(value);
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    if (!currentQuestion) return;
    setSelectedState(currentQuestion.state[0].state);
  }, [currentQuestion]);

  return (
    <AchievCheckButtonGroupContainer>
      <div className="select-box-group-wrapper">
        {checkboxOptions.map((option, index) => {
          return (
            <SquareSelectbox
              option={option}
              key={index}
              selected={option.value === selectedState}
              onClick={() => requestOnclick(String(option.value))}
            />
          );
        })}
      </div>
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
  .select-box-group-wrapper {
    display: flex;
    gap: 10px;
  }
  @media (max-width: ${responsive.medium}) {
    margin-left: 0;
  }
`;
