import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteEstimationButton from './DeleteEstimationButton';
import { useNavigate } from 'react-router-dom';

interface EstimationsProps {
  onClick: (open: boolean) => void;
  estimation: string;
}

const Estimations: React.FC<EstimationsProps> = ({ onClick, estimation }: EstimationsProps) => {
  const navigate = useNavigate()
  return (
    <>
      <ListItem button onClick={() => onClick(true)}> 
        <ListItemText primary={estimation} />
        <DeleteEstimationButton />
      </ListItem>
    </>
  );
};

export default Estimations;
