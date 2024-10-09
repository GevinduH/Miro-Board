import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface NotesSectionProps {
  id: string;
  title: string;
  color: string;
  index: number;
  items: { id: string; content: string }[]; 
}

const NotesSection: React.FC<NotesSectionProps> = ({ id, title, color,items }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: color,
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <Typography>{title}</Typography>
          {items.map((item, itemIndex) => (
            <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    padding: '8px',
                    margin: '4px 0',
                    backgroundColor: 'lightblue',
                    ...provided.draggableProps.style,
                  }}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default NotesSection;
