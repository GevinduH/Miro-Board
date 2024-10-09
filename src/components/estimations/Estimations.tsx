import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteEstimationButton from './DeleteEstimationButton';

interface EstimationsProps {
  onClick: (open: boolean) => void;
  estimation: string;
}

const Estimations: React.FC<EstimationsProps> = ({ onClick, estimation }: EstimationsProps) => {
  const estimations = [{ id: 1, name: "Estimation 1" }, { id: 2, name: "Estimation 2" }];

  return (
    <>
      <ListItem button onClick={() => onClick(true)}> {/* Call the onClick function with true */}
        <ListItemText primary={estimation} />
        <DeleteEstimationButton />
      </ListItem>
    </>
  );
};

export default Estimations;
