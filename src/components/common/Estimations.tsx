import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteEstimationButton from './DeleteEstimationButton';

interface EstimationsProps {
  onClick: (open: boolean) => void;
  estimation:string
}

function Estimations({ onClick, estimation }: EstimationsProps) {
    const estimations = [{ id: 1, name: "Estimation 1" }, { id: 2, name: "Estimation 2" }];

  return (
    <>
      <ListItem button onClick={()=>{onClick}}>
        <ListItemText primary={estimation} />
        <DeleteEstimationButton/>
      </ListItem>
    </>
  );
}

export default Estimations;
