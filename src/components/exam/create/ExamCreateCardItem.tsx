import React, { SetStateAction } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import ExamCreateEditor from './ExamCreateEditor';
import { Button, App } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { useFormContext } from 'react-hook-form';
import { CreateExamForm, CreateQuestionForm } from 'customTypes';
import LinkedQuestionIdsBox from '@components/question/LinkedQuestionIdsBox';

const ExamCreateCardItemBlock = styled.div`
  border-radius: 10px;
  list-style: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: 1px solid ${({ theme }) => theme.color('colorBorder')};
  background-color: ${({ theme }) => theme.color('colorBgContainer')};
  .exam-create-item-number {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-bottom: 10px;
    width: 52px;
  }
  .exam-create-editor-wrapper {
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
  .exam-create-item-header {
    padding: 20px 20px 0 20px;
    display: flex;
    justify-content: space-between;
  }
  .exam-create-item-delete-handler {
    cursor: pointer;
  }
  .exam-create-item-drag-handler {
    cursor: grab;
  }
  .exam-create-item-header-button-wrapper {
    position: relative;
    bottom: 10px;
    display: flex;
    gap: 5px;
  }
  .exam-create-question-add-button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    top: 20px;
    svg {
      font-size: 20px;
    }
  }
  @media (max-width: ${responsive.medium}) {
    .exam-create-editor-wrapper {
      flex-direction: column;
    }
  }
`;

interface ExamCreateCardItemProps {
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  setQuestions: React.Dispatch<SetStateAction<CreateQuestionForm[]>>;
  question: CreateQuestionForm;
  index: number;
  defaultQuestionText?: string;
  defaultSolutionText?: string;
}

const ExamCreateCardItem: React.FC<ExamCreateCardItemProps> = ({
  dragHandleProps,
  setQuestions,
  question,
  index,
}) => {
  const { message } = App.useApp();
  const { setValue, getValues } = useFormContext<CreateExamForm>();
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
    if (getValues('questions').length >= 100) {
      return message.error('문제는 최대 100개까지 등록할 수 있습니다.');
    }
    setValue(
      'questions',
      getValues('questions')
        .slice(0, index + 1)
        .concat({
          orderId: uuidv4(),
          question_img: [],
          solution_img: [],
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
    <ExamCreateCardItemBlock>
      <div className="exam-create-item-header">
        <p className="exam-create-item-number">{index + 1}번</p>
        <div className="exam-create-item-header-button-wrapper">
          <div className="exam-create-item-drag-handler" {...dragHandleProps}>
            <DragIndicatorIcon />
          </div>
          {index > 0 && (
            <div
              className="exam-create-item-delete-handler"
              role="button"
              onClick={handleDeleteQuestion}
            >
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
      <div className="exam-create-editor-wrapper">
        <ExamCreateEditor
          onChangeImage={(value) =>
            handleEditorImageChange(value, 'question_img')
          }
          onChangeText={(value) => handleEditorTextChange(value, 'question')}
          defaultValue={question.question}
          defaultImgUrl={question.question_img?.[0]?.url || ''}
          editorPlaceholder="문제를 입력해주세요."
        />
        <ExamCreateEditor
          onChangeImage={(value) =>
            handleEditorImageChange(value, 'solution_img')
          }
          onChangeText={(value) => handleEditorTextChange(value, 'solution')}
          defaultValue={question.solution}
          defaultImgUrl={question.solution_img?.[0]?.url || ''}
          editorPlaceholder="정답을 입력해주세요."
        />
      </div>
      <LinkedQuestionIdsBox
        currentQuestionId={question.id || 0}
        defaultLinkedQuestionIds={question.linkedQuestionIds}
        onChange={(value) => {
          setValue(
            'questions',
            getValues('questions').map((v) => {
              if (v.orderId === question.orderId) {
                return {
                  ...v,
                  linkedQuestionIds: value.filter((el) => el > 0),
                };
              }
              return v;
            })
          );
        }}
      />
      <Button
        className="exam-create-question-add-button"
        type="dashed"
        shape="circle"
        onClick={handleAddQuestion}
      >
        <PlusOutlined />
      </Button>
    </ExamCreateCardItemBlock>
  );
};

export default ExamCreateCardItem;
