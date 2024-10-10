import React from 'react'; 
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { AssignedItems } from '../../types';


interface EstimationTableProps {
    assignedItems: AssignedItems;
    onTextChange: (_id: string, description: string) => void;
    onStatusChange: (_id: string, status: string) => void;
}


const EstimationTable: React.FC<EstimationTableProps> = ({ assignedItems, onTextChange, onStatusChange }) => {
    const fibonacciStoryPoints = ['1/2', '1', '2', '3', '5', '8', '13', '20', '>20'];

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
                                                assigned={item.assigned}                                            />
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
