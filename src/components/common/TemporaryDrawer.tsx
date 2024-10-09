import React from 'react';
import { Drawer, List, ListItemText } from '@material-ui/core';
import AddEstimationButton from './AddEstimationButton';
import Estimations from '../estimations/Estimations';
import { useRecoilState } from 'recoil';
import {allEstimations, assignedItemsAtom} from './recoilState'
import { AssignedItems, Estimation } from '../../types';


interface TemporaryDrawerProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({ isOpen, toggleDrawer }) => {
  const [estimations, setEstimations] = useRecoilState(allEstimations);
  const [assignedItems, setAssignedItems] = useRecoilState<AssignedItems>(assignedItemsAtom);

  function handleEstimationClick(estimation:Estimation) {
    () => toggleDrawer(false);
    const newAssignedItems: AssignedItems = {};
    estimation.items.forEach(item => {
      const storyPointKey = String(item.storyPoints);
      if (!newAssignedItems[storyPointKey]) {
        newAssignedItems[storyPointKey] = [];
      }
      newAssignedItems[storyPointKey].push(item);
    })
    console.log("🚀 ~ handleEstimationClick ~ newAssignedItems:", newAssignedItems)
    setAssignedItems(newAssignedItems)
    toggleDrawer(false)()
  }
    
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <List>
        {estimations.map((estimation:Estimation) => (
        <Estimations 
          key={`${estimation.year}-${estimation.quarter}`} 
          onClick={()=>handleEstimationClick(estimation)} 
          estimation={`${estimation.year}${estimation.quarter}`}
        />
      ))}
      </List>
        <AddEstimationButton/>      
    </Drawer>
  );
};

export default TemporaryDrawer;
