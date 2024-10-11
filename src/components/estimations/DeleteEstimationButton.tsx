import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EstimationDeleteModal from './EstimationDeleteModal';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

function DeleteEstimationButton({estimation,id}:{estimation:string, id:string}) {
  const classes = useStyles();
  const [IsButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsButtonClicked(true);
  };

  const handleClose = () => {
    setIsButtonClicked(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </Button>
      <EstimationDeleteModal open={IsButtonClicked} onClose={handleClose} estimation={estimation} id={id}/>
    </>
  );
}

export default DeleteEstimationButton;
