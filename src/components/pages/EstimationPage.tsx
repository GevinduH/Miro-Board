import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import EstimationTable from '../estimations/EstimationTable';
import { WorkItem, AssignedItems } from '../../types';
import { useRecoilState } from 'recoil';
import { assignedItemsAtom } from '../common/recoilState';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DraggableCard from '../estimations/DraggableCard';

const storyPointMapping: { [key: string]: number } = {
    '1/2': 0.5,
    '1': 1,
    '2': 2,
    '3': 3,
    '5': 5,
    '8': 8,
    '13': 13,
    '20': 20,
    '>21': 21,
};

const EstimationPage: React.FC = () => {
    const [assignedItems, setAssignedItems] = useRecoilState<AssignedItems>(assignedItemsAtom);
    const { year, quarter } = useParams();
    const navigate = useNavigate();
    const [unassignedItems, setUnassignedItems] = useState<WorkItem[]>([]);

    useEffect(() => {
        const fetchEstimations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/estimations/${year}/${quarter}`);
                const estimationData = response.data.items;
                const newAssignedItems: AssignedItems = {};
                const unassigned: WorkItem[] = [];

                estimationData.forEach((item: WorkItem) => {
                    const storyPointKey = String(item.storyPoints);
                    if (!item.assigned) {
                        unassigned.push(item);
                    } else {
                        if (!newAssignedItems[storyPointKey]) {
                            newAssignedItems[storyPointKey] = [];
                        }
                        newAssignedItems[storyPointKey].push(item);
                    }
                });

                setUnassignedItems(unassigned);
                setAssignedItems(newAssignedItems);
            } catch (error) {
                console.error("Error fetching estimations:", error);
                navigate(`/estimations/error`);
            }
        };

        fetchEstimations();
    }, [year, quarter, setAssignedItems, navigate]);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;
    
        if (!destination) {
            return;
        }
    
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
    
        const newAssignedItems = { ...assignedItems };
    
        if (!newAssignedItems[destination.droppableId]) {
            newAssignedItems[destination.droppableId] = [];
        }
    
        if (source.droppableId === 'unassignedItems' && destination.droppableId !== 'unassignedItems') {
            const draggedItem = unassignedItems[source.index];
            const updatedDestinationList = [...newAssignedItems[destination.droppableId], draggedItem];
            const updatedUnassignedItems = unassignedItems.filter((_, index) => index !== source.index);
    
            setAssignedItems({
                ...newAssignedItems,
                [destination.droppableId]: updatedDestinationList,
            });
            setUnassignedItems(updatedUnassignedItems);
        }
    
        else if (source.droppableId === 'unassignedItems' && destination.droppableId === 'unassignedItems') {
            const newUnassignedItems = Array.from(unassignedItems);
            const [movedItem] = newUnassignedItems.splice(source.index, 1);
            newUnassignedItems.splice(destination.index, 0, movedItem);
            setUnassignedItems(newUnassignedItems);
        }
    };
    

    const handleTextChange = (_id: string, description: string) => {
        setAssignedItems(prev => {
            const updatedItems = Object.entries(prev).map(([key, items]) => {
                return [
                    key,
                    items.map(item => (item._id === _id ? { ...item, description } : item)),
                ] as [string, WorkItem[]];
            });
            return Object.fromEntries(updatedItems);
        });
    };

    const handleStatusChange = (_id: string, status: string) => {
        setAssignedItems(prev => {
            const updatedItems = Object.entries(prev).map(([key, items]) => {
                return [
                    key,
                    items.map(item => (item._id === _id ? { ...item, status } : item)),
                ] as [string, WorkItem[]];
            });
            return Object.fromEntries(updatedItems);
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="unassignedItems" direction="horizontal" type="group">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
                    >
                        <h4>Unassigned Items</h4>
                        {unassignedItems.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index} >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <DraggableCard
                                            _id={item._id}
                                            description={item.description}
                                            storyPoints={item.storyPoints}
                                            workItemNumber={item.workItemNumber}
                                            status={item.status}
                                            onTextChange={handleTextChange}
                                            onStatusChange={handleStatusChange}
                                            product={item.product}
                                            assigned={item.assigned}
                                            index={index} 
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <EstimationTable
                assignedItems={assignedItems}
                onTextChange={handleTextChange}
                onStatusChange={handleStatusChange}
            />
        </DragDropContext>
    );
};

export default EstimationPage;
