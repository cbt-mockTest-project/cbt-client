import DragDropContextWrapper from '@components/common/dragDrop/DragDropContextWrapper';
import React, { useEffect, useState } from 'react';
import { Draggable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ExamCreateCardItem from './ExamCreateCardItem';
import { useFormContext } from 'react-hook-form';
import { CreateExamForm, CreateQuestionForm } from 'customTypes';
import { useRouter } from 'next/router';
import ExamCreateObjectiveCardItem from './ExamCreateObjectiveCardItem';

const ExamCreateCardListBlock = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface ExamCreateCardListProps {
  defaultQuestions: CreateQuestionForm[];
}

const ExamCreateCardList: React.FC<ExamCreateCardListProps> = ({
  defaultQuestions,
}) => {
  const router = useRouter();
  const examType = router.query.examType as 'subjective' | 'objective';
  const { setValue, getValues } = useFormContext<CreateExamForm>();
  const [questions, setQuestions] = useState<CreateQuestionForm[]>([]);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const reorderedItems = Array.from(getValues('questions'));
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);
    setValue('questions', reorderedItems);
    setQuestions(reorderedItems);
  };

  useEffect(() => {
    setQuestions(defaultQuestions);
  }, [defaultQuestions]);

  return (
    <DragDropContextWrapper
      droppableId="exam-create-droppable"
      onDragEnd={onDragEnd}
    >
      <ExamCreateCardListBlock>
        {questions.map((question, index) => {
          return (
            <Draggable
              key={question.orderId}
              index={index}
              draggableId={`${question.orderId}`}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                >
                  {examType === 'subjective' ? (
                    <ExamCreateCardItem
                      index={index}
                      key={JSON.stringify(defaultQuestions)}
                      question={question}
                      setQuestions={setQuestions}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  ) : (
                    <ExamCreateObjectiveCardItem
                      index={index}
                      key={JSON.stringify(defaultQuestions)}
                      question={question}
                      setQuestions={setQuestions}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  )}
                </div>
              )}
            </Draggable>
          );
        })}
      </ExamCreateCardListBlock>
    </DragDropContextWrapper>
  );
};

export default ExamCreateCardList;
