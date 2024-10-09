import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, Select, MenuItem, TextareaAutosize } from '@material-ui/core';

interface DraggableCardProps {
    id: string;
    content: string;
    text: string;
    storyPoints: number;
    workItemNumber: string;
    status: string;
    index: number;
    onTextChange: (id: string, text: string) => void;
    onStatusChange: (id: string, status: string) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
    id,
    content,
    text,
    storyPoints,
    workItemNumber,
    status,
    index,
    onTextChange,
    onStatusChange,
}) => {

    const getBackgroundColor = (status: string) => {
        switch (status) {
            case 'OKR':
                return '#4CAF50'; 
            case 'Board':
                return '#2196F3'; 
            case 'Waiting':
                return '#9C27B0'; 
            case 'Other':
                return '#FFFFFF'; 
            default:
                return '#FFFFFF'; 
        }
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <Card
                    className='workItemCard'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        marginBottom: '8px', 
                        backgroundColor: getBackgroundColor(status),
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        width: '210px',
                    }}
                >
                    <CardContent>
                        <Typography variant="body2">Work Item Number: {workItemNumber}</Typography>
                        <Typography variant="body2">Story Points: {storyPoints}</Typography>
                        <Select
                            value={status}
                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => onStatusChange(id, e.target.value as string)}
                            fullWidth
                        >
                            <MenuItem value="OKR">OKR</MenuItem>
                            <MenuItem value="Board">Board</MenuItem>
                            <MenuItem value="Waiting">Waiting</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        <TextareaAutosize
                            value={text}
                            onChange={(e) => onTextChange(id, e.target.value)}
                            placeholder="Additional Text"
                            style={{
                                width: '200px', 
                                marginTop: '10px',
                            }}
                            minRows={3}
                        />
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
};

export default DraggableCard;
