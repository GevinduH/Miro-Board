import React from 'react';
import { Paper } from '@material-ui/core';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

interface CustomDroppableProvided extends DroppableProvided {
  isDraggingOver: boolean;
}

interface ColumnProps {
  storyPoints: number | string;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ storyPoints, children }) => {
  return (
    <Droppable droppableId={storyPoints.toString()}>
      {(provided: CustomDroppableProvided, snapshot: DroppableStateSnapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: snapshot.isDraggingOver ? '#e0f7fa' : 'white',
            minHeight: '400px',
            padding: '16px',
          }}
        >
          {children}
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};

export default Column;
