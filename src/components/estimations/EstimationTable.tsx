import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';

type WorkItem = { id: string; content: string; text: string; storyPoints: number; workItemNumber: string; status: string };
type AssignedItems = { [key: string]: WorkItem[] };

interface EstimationTableProps {
    assignedItems: AssignedItems;
    onTextChange: (id: string, text: string) => void;
    onStatusChange: (id: string, status: string) => void; 
}

const EstimationTable: React.FC<EstimationTableProps> = ({ assignedItems, onTextChange, onStatusChange }) => {
  console.log("🚀 ~ assignedItems:", assignedItems)
  const fibonacciStoryPoints = ['1/2', '1', '2', '3', '5', '8', '13', '20', '>20']
    return (
        <Paper>
            <Typography variant="h6" align="center" gutterBottom>
                Estimation Table
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {fibonacciStoryPoints.map((point) => (
                            <TableCell key={point}>Story Points: {point}</TableCell> 
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {fibonacciStoryPoints.map((point) => (
                            <Droppable key={point} droppableId={point}>
                                {(provided, snapshot) => (
                                    <TableCell
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            minHeight: '100vh',
                                            border: '1px solid gray',
                                            padding: '8px',
                                            backgroundColor: snapshot.isDraggingOver ? '#e0f7fa' : 'white',
                                        }}
                                    >
                                        {assignedItems[point]?.map((item, index) => (
                                            <DraggableCard
                                                key={item.id}
                                                id={item.id}
                                                content={item.content}
                                                text={item.text}
                                                storyPoints={item.storyPoints} 
                                                workItemNumber={item.workItemNumber} 
                                                status={item.status} 
                                                index={index} 
                                                onTextChange={onTextChange} 
                                                onStatusChange={onStatusChange} 
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </TableCell>
                                )}
                            </Droppable>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default EstimationTable;
