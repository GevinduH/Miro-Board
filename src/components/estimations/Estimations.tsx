import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteEstimationButton from './DeleteEstimationButton';

interface EstimationsProps {
  onClick: (e: React.MouseEvent) => void;
  estimation: string;
  id:string
}

const Estimations: React.FC<EstimationsProps> = ({ id, onClick, estimation }: EstimationsProps) => {

  const handleEstimationClick = (e: React.MouseEvent) => {
    onClick(e); 
  };

  return (
    <>
      <ListItem button onClick={handleEstimationClick}>
        <ListItemText primary={estimation} />
        <DeleteEstimationButton estimation={estimation} id={id}/>
      </ListItem>
    </>
  );
};

export default Estimations;
