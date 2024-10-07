import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import AddEstimationButton from './AddEstimationButton';
import Estimations from './Estimations';

interface TemporaryDrawerProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <List>
        <Estimations onClick={toggleDrawer(false)} estimation={"y24q1"}/>
        <Estimations onClick={toggleDrawer(false)} estimation={"y24q2"}/>
      </List>
        <AddEstimationButton/>      
    </Drawer>
  );
};

export default TemporaryDrawer;
