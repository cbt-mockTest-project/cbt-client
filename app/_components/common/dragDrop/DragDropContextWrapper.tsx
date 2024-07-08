import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface DragDropContextWrapperProps {
  droppableId: string;
  children: React.ReactNode;
  onDragEnd: (result: DropResult) => void;
}

const DragDropContextWrapper: React.FC<DragDropContextWrapperProps> = ({
  droppableId,
  children,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropContextWrapper;
