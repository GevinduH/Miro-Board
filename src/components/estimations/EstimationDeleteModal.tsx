import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { Button, Snackbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function EstimationDeleteModal({ id,open, onClose,estimation }: { open: boolean, onClose: () => void , estimation:string,id:string}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const navigate = useNavigate()

  const onClickYes = async (e: React.MouseEvent) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/estimations/delete/${id}`);
      console.log('Estimation created:', response.data);
      setSnackbarMessage('Estimation deleted');
      setSnackbarOpen(true); 
      onClose();
    } catch (error) {
      console.error('Error deleting estimation:', error);
    }
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Delete Estimation</h2>
      <p id="simple-modal-description">
        Are you sure you want to delete the estimation {estimation}?
      </p>
      <div className='inputsInTheModal'>
        <button type="button" onClick={onClose}>
            No
        </button>
        <button type="button" onClick={onClickYes}>
            Yes
        </button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
