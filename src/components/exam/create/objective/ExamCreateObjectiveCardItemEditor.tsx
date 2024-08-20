import React from 'react';
import styled from 'styled-components';
import { Button, Radio } from 'antd';
import { CreateExamForm, CreateQuestionForm } from 'customTypes';
import { useFormContext } from 'react-hook-form';
import Clear from '@mui/icons-material/Clear';
import { PlusOutlined } from '@ant-design/icons';
import ExamCreateEditor from '../ExamCreateEditor';

const ExamCreateObjectiveCardItemEditorBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px dashed ${({ theme }) => theme.color('colorBorder')};
  border-radius: 5px;
  padding: 20px;
  .exam-create-objective-card-item-editor-answer-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    font-size: 14px;
  }
  .exam-create-objective-card-item-editor-wrapper {
    display: flex;
    flex-direction: column;
    .exam-create-objective-card-item-editor-top-wrapper {
      display: flex;
      gap: 10px;
      .exam-create-objective-card-item-editor-clear-button {
        cursor: pointer;
        width: 20px;
        height: 20px;
        svg {
          font-size: 20px;
        }
      }
    }
    .exam-create-objective-card-item-editor-add-button {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-top: 30px;
      position: relative;
      top: -20px;
      svg {
        font-size: 20px;
      }
    }
  }
`;

interface ExamCreateObjectiveCardItemEditorProps {
  question: CreateQuestionForm;
  handleEditorImageChange: (
    url: string,
    type: 'question_img' | 'solution_img'
  ) => void;
  handleEditorTextChange: (text: string, type: 'question' | 'solution') => void;
}

const ExamCreateObjectiveCardItemEditor: React.FC<
  ExamCreateObjectiveCardItemEditorProps
> = ({ question: defaultQuestion }) => {
  const [question, setQuestion] =
    React.useState<CreateQuestionForm>(defaultQuestion);
  const { setValue, getValues } = useFormContext<CreateExamForm>();
  const handleObjectiveEditorTextChange = (
    text: string,
    contentIndex: number
  ) => {
    setValue(
      'questions',
      getValues('questions').map((v: CreateQuestionForm) => {
        if (v.orderId === question.orderId) {
          return {
            ...v,
            objectiveData: {
              ...v.objectiveData,
              content: v.objectiveData.content.map((v, index) => {
                if (index === contentIndex) {
                  return {
                    ...v,
                    content: text,
                  };
                }
                return v;
              }),
            },
          };
        }
        return v;
      })
    );
  };
  const handleObjectiveEditorImageChange = (url, contentIndex) => {
    setValue(
      'questions',
      getValues('questions').map((v: CreateQuestionForm) => {
        if (v.orderId === question.orderId) {
          return {
            ...v,
            objectiveData: {
              ...v.objectiveData,
              content: v.objectiveData.content.map((v, index) => {
                if (index === contentIndex) {
                  return {
                    ...v,
                    url,
                  };
                }
                return v;
              }),
            },
          };
        }
        return v;
      })
    );
  };
  const handleSelectAnswer = (answer: number) => {
    setValue(
      'questions',
      getValues('questions').map((v: CreateQuestionForm) => {
        if (v.orderId === question.orderId) {
          return {
            ...v,
            objectiveData: {
              ...v.objectiveData,
              answer,
            },
          };
        }
        return v;
      })
    );
  };
  const handleDeleteContent = (contentIndex: number) => {
    setQuestion({
      ...question,
      objectiveData: {
        ...question.objectiveData,
        content: question.objectiveData.content.filter(
          (_, index) => index !== contentIndex
        ),
      },
    });
    setValue(
      'questions',
      getValues('questions').map((v: CreateQuestionForm) => {
        if (v.orderId === question.orderId) {
          return {
            ...v,
            objectiveData: {
              ...v.objectiveData,
              content: v.objectiveData.content.filter(
                (_, index) => index !== contentIndex
              ),
            },
          };
        }
        return v;
      })
    );
  };
  const handleAddContent = () => {
    setQuestion({
      ...question,
      objectiveData: {
        ...question.objectiveData,
        content: [
          ...question.objectiveData.content,
          {
            content: '',
            url: '',
          },
        ],
      },
    });
    setValue(
      'questions',
      getValues('questions').map((v: CreateQuestionForm) => {
        if (v.orderId === question.orderId) {
          return {
            ...v,
            objectiveData: {
              ...v.objectiveData,
              content: [
                ...v.objectiveData.content,
                {
                  content: '',
                  url: '',
                },
              ],
            },
          };
        }
        return v;
      })
    );
  };
  return (
    <ExamCreateObjectiveCardItemEditorBlock>
      {question.objectiveData?.content.map((v, i) => (
        <div
          key={question.orderId + v.content + i + v.url}
          className="exam-create-objective-card-item-editor-wrapper"
        >
          <div className="exam-create-objective-card-item-editor-top-wrapper">
            <ExamCreateEditor
              onChangeImage={(value) =>
                handleObjectiveEditorImageChange(value, i)
              }
              key={question.orderId + v.content + i + v.url}
              onChangeText={(value) =>
                handleObjectiveEditorTextChange(value, i)
              }
              defaultValue={v.content}
              defaultImgUrl={v.url}
              editorPlaceholder={`${i + 1}번 선택지를 입력해주세요.`}
            />
            {i !== 0 ? (
              <div
                role="button"
                className="exam-create-objective-card-item-editor-clear-button"
                onClick={() => handleDeleteContent(i)}
              >
                <Clear />
              </div>
            ) : (
              <div style={{ width: 20, height: 20 }} />
            )}
          </div>
          {i === question.objectiveData.content.length - 1 && i < 4 && (
            <Button
              type="dashed"
              shape="circle"
              className="exam-create-objective-card-item-editor-add-button"
              onClick={handleAddContent}
            >
              <PlusOutlined />
            </Button>
          )}
        </div>
      ))}
      <div className="exam-create-objective-card-item-editor-answer-wrapper">
        <div>정답을 선택해주세요.</div>
        <Radio.Group
          defaultValue={question.objectiveData?.answer}
          onChange={(e) => handleSelectAnswer(e.target.value)}
        >
          {Array.from(
            { length: question.objectiveData?.content.length },
            (_, i) => i + 1
          ).map((v) => (
            <Radio key={v} value={v}>
              {v}번
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </ExamCreateObjectiveCardItemEditorBlock>
  );
};

export default ExamCreateObjectiveCardItemEditor;
