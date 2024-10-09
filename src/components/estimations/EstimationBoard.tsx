import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { ProductEnum } from '../../types';
ProductEnum


const EstimationBoard: React.FC = () => {
  const [items, setItems] = useState([
      {
        description: "Upgrade SIM platform to support 5G",
        product: ProductEnum.SIM,
        status: 'OKR',
        workItemNumber: 22334,
        assigned: true,
        storyPoints: "13",
        _id: "67067356707e5be253a1802f"
      },
      {
        description: "Launch new marketing campaign for NAPP",
        product: ProductEnum.NAPP,
        status: "Board",
        assigned: false,
        storyPoints: "3",
        _id: "67067356707e5be253a18030",
        workItemNumber: 22334
      },
      {
        description: "Create VAS feature for international roaming",
        product: ProductEnum.VAS,
        status: 'Waiting',
        workItemNumber: 87654,
        assigned: false,
        storyPoints: "8",
        _id: "67067356707e5be253a18031"
      },
  
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

  const onTextChange = (id: string, text: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, text } : item))
    );
  };


  const onStatusChange = (id: string, status: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, status } : item))
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
    </DragDropContext>
  );
};

export default EstimationBoard;
