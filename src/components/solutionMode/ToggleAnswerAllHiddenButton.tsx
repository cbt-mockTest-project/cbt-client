import { Button, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { mockExamActions } from '@modules/redux/slices/mockExam';

const ToggleAnswerAllHiddenButtonBlock = styled.div``;

interface ToggleAnswerAllHiddenButtonProps {}

const ToggleAnswerAllHiddenButton: React.FC<
  ToggleAnswerAllHiddenButtonProps
> = () => {
  const dispatch = useAppDispatch();
  const isAnswerAllHidden = useAppSelector(
    (state) => state.mockExam.isAnswerAllHidden
  );
  const setIsAnswerAllHidden = (isAnswerAllHidden: boolean) => {
    dispatch(mockExamActions.setIsAnswerAllHidden(isAnswerAllHidden));
  };
  return (
    <ToggleAnswerAllHiddenButtonBlock>
      <Tooltip
        title={
          isAnswerAllHidden
            ? '정답을 모두 보이게 합니다. '
            : '정답을 모두 가립니다.'
        }
      >
        <Button onClick={() => setIsAnswerAllHidden(!isAnswerAllHidden)}>
          {isAnswerAllHidden ? (
            <div className="solution-mode-control-button-inner">
              <VisibilityOffIcon />
              <span>전체</span>
            </div>
          ) : (
            <div className="solution-mode-control-button-inner">
              <RemoveRedEyeIcon />
              <span>전체</span>
            </div>
          )}
        </Button>
      </Tooltip>
    </ToggleAnswerAllHiddenButtonBlock>
  );
};

export default ToggleAnswerAllHiddenButton;
