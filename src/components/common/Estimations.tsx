import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteEstimationButton from './DeleteEstimationButton';

interface EstimationsProps {
  onClick: (open: boolean) => void;
  estimation:string
}

function Estimations({ onClick, estimation }: EstimationsProps) {
  return (
    <>
      <ListItem button onClick={()=>{onClick}}>
        <ListItemText primary={estimation} />
        <DeleteEstimationButton />
      </ListItem>
    </>
  );
}

export default Estimations;
