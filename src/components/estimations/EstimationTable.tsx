import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { AssignedItems } from '../../types';

interface EstimationTableProps {
  assignedItems: AssignedItems;
  onTextChange: (_id: string, description: string) => void;
  onStatusChange: (_id: string, status: string) => void;
}

const EstimationTable: React.FC<EstimationTableProps> = ({
  assignedItems,
  onTextChange,
  onStatusChange,
}) => {
  const fibonacciStoryPoints = ['1/2', '1', '2', '3', '5', '8', '13', '20', '>20'];

  return (
    <Paper>
      <Typography variant="h6" align="center" gutterBottom>
        Estimation Table
      </Typography>
      <div style={{ display: 'flex', width: '100%' }}>
        {fibonacciStoryPoints.map((point) => (
          <div key={point} style={{ flex: 1, border: '1px solid gray', margin: '4px' }}>
            <Droppable droppableId={point} type="group">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    minHeight: '100px',
                    padding: '8px',
                    backgroundColor: snapshot.isDraggingOver ? '#e0f7fa' : 'white',
                  }}
                >
                  <Typography variant="subtitle1">Story Points: {point}</Typography>
                  {assignedItems[point]?.map((item, index) => (
                    <DraggableCard
                      key={item._id}
                      _id={item._id}
                      description={item.description}
                      storyPoints={item.storyPoints}
                      workItemNumber={item.workItemNumber}
                      status={item.status}
                      index={index}
                      onTextChange={onTextChange}
                      onStatusChange={onStatusChange}
                      product={item.product}
                      assigned={item.assigned}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default EstimationTable;
