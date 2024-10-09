import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard'; 

const EstimationBoard: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', content: 'Work Item 1', storyPoints: 3, text: '', workItemNumber: 'W1', status: 'OKR' },
    { id: '2', content: 'Work Item 2', storyPoints: 5, text: '', workItemNumber: 'W2', status: 'Board' },
    { id: '3', content: 'Work Item 3', storyPoints: 8, text: '', workItemNumber: 'W3', status: 'Waiting' },
  ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);

    setItems(newItems);
  };

  // Handler for text changes in DraggableCard
  const onTextChange = (id: string, text: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  // Handler for status changes in DraggableCard
  const onStatusChange = (id: string, status: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="column-1" direction="vertical">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ backgroundColor: snapshot.isDraggingOver ? '#e0f7fa' : 'white', padding: '16px' }}
          >
            {items.map((item, index) => (
              <DraggableCard
                key={item.id}
                id={item.id}
                content={item.content}
                text={item.text} // Pass text prop
                storyPoints={item.storyPoints} // Pass story points
                workItemNumber={item.workItemNumber} // Pass work item number
                status={item.status} // Pass status
                index={index}
                onTextChange={onTextChange} // Pass the text change handler
                onStatusChange={onStatusChange} // Pass the status change handler
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EstimationBoard;
