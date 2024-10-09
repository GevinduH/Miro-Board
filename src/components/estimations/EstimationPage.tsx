import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import EstimationTable from './EstimationTable';
import axios from 'axios'

type WorkItem = {
    id: string;
    content: string;
    text: string;
    storyPoints: number;
    workItemNumber: string; 
    status: string; 
};

type AssignedItems = { [key: string]: WorkItem[] };

const storyPointMapping: { [key: string]: number } = {
    '1/2': 0.5,
    '1': 1,
    '2': 2,
    '3': 3,
    '5': 5,
    '8': 8,
    '13': 13,
    '20': 20
};

const EstimationPage: React.FC = () => {
    const [assignedItems, setAssignedItems] = useState<AssignedItems>({});
    const year = "24"
    const quarter = "q2"
    
    
    useEffect(() => {
      axios({
        method: 'get',
        url: `http://localhost:5000/api/estimations/${year}/${quarter}`,
        responseType: 'json'
      })
        .then(function (response) {
          console.log("🚀 ~ response:", response)
        const estimationData = response.data.items;
        const newAssignedItems: AssignedItems = {};

        estimationData.forEach((item: WorkItem) => {
            const storyPointKey = String(item.storyPoints);
            if (!newAssignedItems[storyPointKey]) {
                newAssignedItems[storyPointKey] = [];
            }
            newAssignedItems[storyPointKey].push(item);
          });
          
  
          setAssignedItems(newAssignedItems);
        });
      },[])
      
      console.log("🚀 ~ assignedItems:", assignedItems)
    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;

  
        if (!destination  || source.droppableId == destination.droppableId) {
          return;
      }
      
        const teest = assignedItems
        const sourceList = assignedItems[source.droppableId] || [];
        const destinationList = assignedItems[destination.droppableId] || [];

        const draggedItem = sourceList[source.index];
        if (!draggedItem) return;

        const newSourceList = sourceList.filter(item => item.id !== draggedItem.id);
        
        const newDestinationItem = {
            ...draggedItem,
            storyPoints: storyPointMapping[destination.droppableId], 
        };

        const newDestinationList = [...destinationList, newDestinationItem];

        setAssignedItems(prev => ({
            ...prev,
            [source.droppableId]: newSourceList,
            [destination.droppableId]: newDestinationList,
        }));
    };

    const handleTextChange = (id: string, text: string) => {
        setAssignedItems(prev => {
            const updatedItems = Object.entries(prev).map(([key, items]) => {
                return [
                    key,
                    items.map(item => (item.id === id ? { ...item, text } : item)),
                ] as [string, WorkItem[]];
            });
            return Object.fromEntries(updatedItems);
        });
    };

    const handleStatusChange = (id: string, status: string) => {
        setAssignedItems(prev => {
            const updatedItems = Object.entries(prev).map(([key, items]) => {
                return [
                    key,
                    items.map(item => (item.id === id ? { ...item, status } : item)),
                ] as [string, WorkItem[]];
            });
            return Object.fromEntries(updatedItems);
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <EstimationTable 
                assignedItems={assignedItems} 
                onTextChange={handleTextChange} 
                onStatusChange={handleStatusChange}
            />
        </DragDropContext>
    );
};

export default EstimationPage;
