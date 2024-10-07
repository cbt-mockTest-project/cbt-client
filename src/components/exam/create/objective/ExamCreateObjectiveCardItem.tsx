import React, { SetStateAction, useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import styled, { css } from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { DownOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import { useFormContext } from 'react-hook-form';
import { CreateExamForm, CreateQuestionForm } from 'customTypes';
import ExamCreateObjectiveCardItemEditor from './ExamCreateObjectiveCardItemEditor';
import ExamCreateEditor from '../ExamCreateEditor';
import ExamObjectiveConvertorForAdmin from './ExamObjectiveConvertorForAdmin';

const ExamCreateObjectiveCardItemBlock = styled.div<{ isFolded: boolean }>`
  .exam-create-objective-item-wrapper {
    border-radius: 10px;
    list-style: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 1px solid ${({ theme }) => theme.color('colorBorder')};
    background-color: ${({ theme }) => theme.color('colorBgContainer')};
    padding-bottom: 20px;
    ${(props) =>
      props.isFolded &&
      css`
        height: 65px;
        overflow: hidden;
      `}
  }
  .exam-create-objective-item-number {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-bottom: 10px;
    width: 52px;
  }
  .exam-create-objective-editor-wrapper {
    padding: 0 20px 20px 20px;
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .editor-uploader-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ant-upload.ant-upload-select,
  .ant-upload-list-item,
  .ant-upload-wrapper,
  .ant-upload-list-item-container {
    width: 80px !important;
    height: 80px !important;
  }
  .exam-create-objective-item-header {
    padding: 20px 20px 0 20px;
    display: flex;
    justify-content: space-between;
  }

  .exam-create-objective-item-header-button-wrapper {
    position: relative;
    bottom: 10px;
    display: flex;
    gap: 5px;
    .exam-create-objective-item-drag-handler {
      cursor: grab;
    }
    .exam-create-objective-item-delete-handler {
      cursor: pointer;
    }
    .exam-create-objective-item-fold-button {
      cursor: pointer;
      height: 16px;
      width: 16px;
    }
  }
  .exam-create-objective-question-add-button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    top: -20px;
    svg {
      font-size: 20px;
    }
  }
  @media (max-width: ${responsive.medium}) {
    .exam-create-objective-editor-wrapper {
      flex-direction: column;
    }
  }
`;

interface ExamCreateObjectiveCardItemProps {
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  setQuestions: React.Dispatch<SetStateAction<CreateQuestionForm[]>>;
  question: CreateQuestionForm;
  index: number;
  defaultQuestionText?: string;
  defaultSolutionText?: string;
}

const ExamCreateObjectiveCardItem: React.FC<
  ExamCreateObjectiveCardItemProps
> = ({ dragHandleProps, setQuestions, question, index }) => {
  const [isFolded, setIsFolded] = useState<boolean>(false);
  const { setValue, getValues } = useFormContext<CreateExamForm>();
  const [isCoverted, setIsCoverted] = useState<boolean>(false);
  const handleEditorTextChange = (
    value: string,
    type: 'question' | 'solution'
  ) => {
    setValue(
      'questions',
      getValues('questions').map((v) => {
        if (v.orderId === question.orderId) {
          return {
            ...v,
            [type]: value,
          };
        }
        return v;
      })
    );
  };

  const handleEditorImageChange = (
    url: string,
    type: 'question_img' | 'solution_img'
  ) => {
    setValue(
      'questions',
      getValues('questions').map((v) => {
        if (v.orderId === question.orderId) {
          return {
            ...v,
            [type]: {
              url,
              name: '',
              uid: '',
            },
          };
        }
        return v;
      })
    );
  };

  const handleAddQuestion = () => {
    setValue(
      'questions',
      getValues('questions')
        .slice(0, index + 1)
        .concat({
          orderId: uuidv4(),
          question_img: [],
          solution_img: [],
          objectiveData: {
            answer: 1,
            content: [
              {
                content: '',
                url: '',
              },
              {
                content: '',
                url: '',
              },
              {
                content: '',
                url: '',
              },
              {
                content: '',
                url: '',
              },
            ],
          },
        })
        .concat(getValues('questions').slice(index + 1))
    );
    setQuestions(getValues('questions'));
  };

  const handleDeleteQuestion = () => {
    if (getValues('questions').length === 1) return;
    setValue(
      'questions',
      getValues('questions').filter((v) => v.orderId !== question.orderId)
    );
    setQuestions(getValues('questions'));
  };

  return (
    <ExamCreateObjectiveCardItemBlock isFolded={isFolded}>
      <div className="exam-create-objective-item-wrapper">
        <div className="exam-create-objective-item-header">
          <p className="exam-create-objective-item-number">{index + 1}번</p>
          <div className="exam-create-objective-item-header-button-wrapper">
            <div
              className={`exam-create-objective-item-fold-button ${
                isFolded ? 'folded' : ''
              }`}
              onClick={() => setIsFolded((prev) => !prev)}
            >
              {isFolded ? <UpOutlined /> : <DownOutlined />}
            </div>
            <div
              className="exam-create-objective-item-drag-handler"
              {...dragHandleProps}
            >
              <DragIndicatorIcon />
            </div>
            {index > 0 && (
              <div
                className="exam-create-objective-item-delete-handler"
                role="button"
                onClick={handleDeleteQuestion}
              >
                <DeleteIcon />
              </div>
            )}
          </div>
        </div>
        <ExamObjectiveConvertorForAdmin
          setIsCoverted={setIsCoverted}
          handleEditorTextChange={handleEditorTextChange}
          question={question}
        />
        <div className="exam-create-objective-editor-wrapper">
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <ExamCreateEditor
              onChangeImage={(value) =>
                handleEditorImageChange(value, 'question_img')
              }
              onChangeText={(value) =>
                handleEditorTextChange(value, 'question')
              }
              defaultValue={
                isCoverted
                  ? getValues(`questions`).find(
                      (v) => v.orderId === question.orderId
                    )?.question
                  : question.question
              }
              defaultImgUrl={question.question_img[0]?.url}
              editorPlaceholder="문제를 입력해주세요."
            />
            <ExamCreateEditor
              onChangeImage={(value) =>
                handleEditorImageChange(value, 'solution_img')
              }
              onChangeText={(value) =>
                handleEditorTextChange(value, 'solution')
              }
              defaultValue={
                isCoverted
                  ? getValues(`questions.${index}.solution`)
                  : question.solution
              }
              defaultImgUrl={question.solution_img[0]?.url}
              editorPlaceholder="해설을 입력해주세요."
            />
          </div>
          <ExamCreateObjectiveCardItemEditor
            key={isCoverted.toString()}
            question={isCoverted ? getValues(`questions.${index}`) : question}
            handleEditorTextChange={handleEditorTextChange}
            handleEditorImageChange={handleEditorImageChange}
          />
        </div>
      </div>
      <Button
        className="exam-create-objective-question-add-button"
        type="dashed"
        shape="circle"
        onClick={handleAddQuestion}
      >
        <PlusOutlined />
      </Button>
    </ExamCreateObjectiveCardItemBlock>
  );
};

export default ExamCreateObjectiveCardItem;
