import palette from '@styles/palette';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionCard } from 'types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useToggle from '@lib/hooks/useToggle';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Controller, useForm } from 'react-hook-form';
import { AddQuestionCardModalForm } from '@components/common/modal/addQuestionCardModal/AddQuestionCardModal';

export interface OnUpdateQuestionCardArgs {
  question: string;
  solution: string;
  id: number;
}

interface MemoCardProps {
  card: QuestionCard;
  defalueIsSolutionVisible?: boolean;
  onDeleteQuestionCard: (id: number) => void;
  onUpdateQuestionCard: (args: OnUpdateQuestionCardArgs) => Promise<boolean>;
}

const MemoCard: React.FC<MemoCardProps> = ({
  card,
  defalueIsSolutionVisible = true,
  onDeleteQuestionCard,
  onUpdateQuestionCard,
}) => {
  const { control, getValues } = useForm<AddQuestionCardModalForm>({
    defaultValues: { question: card.question, solution: card.solution },
  });
  const { value: isEditMode, onToggle: onToggleIsEditMode } = useToggle(false);
  const {
    value: isSolutionVisible,
    setValue: setIsSolutionVisible,
    onToggle: onToggleIsSolutionVisible,
  } = useToggle(true);

  useEffect(() => {
    setIsSolutionVisible(defalueIsSolutionVisible);
  }, [defalueIsSolutionVisible]);

  return (
    <MemoCardContainer>
      {isEditMode ? (
        <Controller
          control={control}
          name="question"
          render={({ field }) => (
            <TextArea
              className="memo-page-question-card-list-edit-text-area"
              onChange={field.onChange}
              autoSize={true}
              defaultValue={card.question}
              value={getValues('question')}
            />
          )}
        />
      ) : (
        <p className="memo-page-question-card-list-item-question">
          {card.question}
        </p>
      )}

      {isEditMode ? (
        <div className="memo-page-question-card-list-item-solution-wrapper">
          <Controller
            control={control}
            name="solution"
            render={({ field }) => (
              <TextArea
                className="memo-page-question-card-list-edit-text-area"
                onChange={field.onChange}
                autoSize={true}
                defaultValue={card.question}
                value={getValues('solution')}
              />
            )}
          />
          <div className="memo-page-question-card-bottom-button-wrapper">
            <Button
              type="primary"
              onClick={async () => {
                const res = await onUpdateQuestionCard({
                  question: getValues('question'),
                  solution: getValues('solution'),
                  id: card.id,
                });
                if (res) {
                  onToggleIsEditMode();
                }
              }}
            >
              수정
            </Button>
            <Button type="primary" danger onClick={onToggleIsEditMode}>
              취소
            </Button>
          </div>
        </div>
      ) : (
        <div className="memo-page-question-card-list-item-solution-wrapper">
          <button
            className="memo-page-question-card-list-item-solution-hide-button"
            onClick={onToggleIsSolutionVisible}
          >
            {isSolutionVisible ? (
              <>
                <VisibilityIcon className="memo-page-question-card-list-item-solution-hide-button-icon" />
                <span className="memo-page-question-card-list-item-solution-hide-button-label">
                  가리기
                </span>
              </>
            ) : (
              <>
                <VisibilityOffIcon className="memo-page-question-card-list-item-solution-hide-button-icon" />
                <span className="memo-page-question-card-list-item-solution-hide-button-label">
                  보이기
                </span>
              </>
            )}
          </button>
          <div className="memo-page-question-card-list-item-solution">
            <p className={`${!isSolutionVisible && 'blur'}`}>{card.solution}</p>
          </div>
          <div className="memo-page-question-card-bottom-button-wrapper">
            <Button type="primary" onClick={onToggleIsEditMode}>
              수정
            </Button>
            <Button
              type="primary"
              onClick={() => onDeleteQuestionCard(card.id)}
            >
              삭제
            </Button>
          </div>
        </div>
      )}
    </MemoCardContainer>
  );
};

export default MemoCard;

const MemoCardContainer = styled.li`
  .memo-page-question-card-list-item-question,
  .memo-page-question-card-list-item-solution {
    white-space: pre-wrap;
    word-break: break-all;
  }
  .memo-page-question-card-list-item-question {
    padding: 20px;
    border-radius: 5px;
    background-color: ${palette.gray_100};
  }
  .memo-page-question-card-list-item-solution-wrapper {
    margin-top: 10px;
  }
  .memo-page-question-card-list-item-solution {
    padding: 20px;
    border: 1px solid ${palette.gray_300};
    border-radius: 5px;
    border-top-left-radius: 0;
  }
  .memo-page-question-card-list-item-solution-hide-button {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border: 1px solid ${palette.gray_300};
    padding: 5px 10px 5px 0;
    border-bottom: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .memo-page-question-card-list-item-solution-hide-button-icon {
    height: 16px;
  }
  .memo-page-question-card-list-item-solution-hide-button-label {
    font-size: 0.8rem;
  }
  .memo-page-question-card-bottom-button-wrapper {
    margin-top: 10px;
    display: flex;
    gap: 5px;
  }
  .memo-page-question-card-list-edit-text-area {
    max-height: 300px;
  }
  .blur {
    filter: blur(5px);
  }
`;
