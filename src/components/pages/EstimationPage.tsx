import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import EstimationTable from '../estimations/EstimationTable';
import { WorkItem, AssignedItems } from '../../types';
import { useRecoilState } from 'recoil';
import { assignedItemsAtom } from '../common/recoilState';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const storyPointMapping: { [key: string]: number } = {
    '1/2': 0.5,
    '1': 1,
    '2': 2,
    '3': 3,
    '5': 5,
    '8': 8,
    '13': 13,
    '20': 20,
    '>21':21
};

const EstimationPage: React.FC = () => {
    const [assignedItems, setAssignedItems] = useRecoilState<AssignedItems>(assignedItemsAtom);
    const { year, quarter } = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchEstimations = async () => {
          try {
            const response = await axios({
              method: 'get',
              url: `http://localhost:5000/api/estimations/${year}/${quarter}`,
              responseType: 'json',
            });
    
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
          } catch (error) {
            console.error("Error fetching estimations:", error);
            navigate(`/estimations/error`);
          }
        };
        
        fetchEstimations();
        
      }, [year, quarter]);
      
    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;

  
        if (!destination  || source.droppableId == destination.droppableId) {
          return;
      }
      
        const sourceList = assignedItems[source.droppableId] || [];
        const destinationList = assignedItems[destination.droppableId] || [];

        const draggedItem = sourceList[source.index];
        if (!draggedItem) return;

        const newSourceList = sourceList.filter(item => item._id !== draggedItem._id);
        
        const newDestinationItem = {
            ...draggedItem,
            storyPoints: String(storyPointMapping[destination.droppableId]), 
        };

        const newDestinationList = [...destinationList, newDestinationItem];

        setAssignedItems(prev => ({
            ...prev,
            [source.droppableId]: newSourceList,
            [destination.droppableId]: newDestinationList,
        }));
    };

    const handleTextChange = (_id:string, description: string) => {
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
            <EstimationTable 
                assignedItems={assignedItems} 
                onTextChange={handleTextChange} 
                onStatusChange={handleStatusChange}
            />
        </DragDropContext>
    );
};

export default EstimationPage;
