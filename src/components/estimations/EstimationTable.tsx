import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, makeStyles, Typography
} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const fibonacciSequence = ['1/2', '1', '2', '3', '5', '8', '13', '20', '>20'];

const initialItems = [
  { id: '1', name: 'Item 1', storyPoints: 3 },
  { id: '2', name: 'Item 2', storyPoints: 8 },
  { id: '3', name: 'Item 3', storyPoints: 21 }, 
];

const useStyles = makeStyles({
  tableContainer: {
    margin: '20px auto',
    maxWidth: '90%',
  },
  tableHead: {
    backgroundColor: '#f5f5f5',
  },
  tableCell: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#e0e0e0',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
  },
});


interface Item {
  id: string;
  name: string;
  storyPoints: number;
}

const EstimationTableWithDrag: React.FC = () => {
  const classes = useStyles();
  const [unassignedItems, setUnassignedItems] = React.useState<Item[]>(initialItems);
  const [assignedItems, setAssignedItems] = React.useState<{ [key: string]: Item[] }>({});

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    if (source.droppableId === 'unassignedItems' && destination.droppableId) {
      const draggedItem = unassignedItems[source.index];
      const newUnassignedItems = Array.from(unassignedItems);
      newUnassignedItems.splice(source.index, 1);
      setUnassignedItems(newUnassignedItems);

      const destColumn = destination.droppableId;
      const newAssignedItems = { ...assignedItems };
      newAssignedItems[destColumn] = [...(newAssignedItems[destColumn] || []), draggedItem];
      setAssignedItems(newAssignedItems);
    }
  };

  return (
    <Paper className={classes.tableContainer}>
      <Typography variant="h6" align="center" gutterBottom>
         Estimation Table
      </Typography>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
          <Droppable droppableId="unassignedItems">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ padding: '16px' }}>
                <Typography variant="h6" gutterBottom>Unassigned Items</Typography>
                {unassignedItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={classes.cardContainer}
                      >
                        {item.name} (SP: {item.storyPoints})
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableCell}>Item Name</TableCell>
              {fibonacciSequence.map((fib, index) => (
                <TableCell key={index} className={classes.tableCell}>
                  {fib} SP
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {fibonacciSequence.map((fib, index) => (
              <TableRow key={index}>
                <TableCell className={classes.tableCell}>{fib}</TableCell>
                <Droppable droppableId={fib}>
                  {(provided:any) => (
                    <TableCell
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={classes.tableCell}
                    >
                      {(assignedItems[fib] || []).map((item, idx) => (
                        <div key={item.id} className={classes.cardContainer}>
                          {item.name} (SP: {item.storyPoints})
                        </div>
                      ))}
                      {provided.placeholder}
                    </TableCell>
                  )}
                </Droppable>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DragDropContext>
    </Paper>
  );
};

export default EstimationTableWithDrag;
