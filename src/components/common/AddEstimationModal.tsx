import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRecoilState } from 'recoil';
import { IsAddEstimationButtonclicked } from './recoilState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

export default function AddEstimationModal() {
  const [IsAddEstimationClicked, setIsAddEstimationClicked] = useRecoilState<boolean>(IsAddEstimationButtonclicked);
  const [year, setYear] = useState<string>('');
  const [quarter, setQuarter] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAddEstimationClicked(false);
    setYear('');
    setQuarter('');
    setErrorMessage(null);
  };

  const handleAddEstimation = async () => {
    if (!year || !quarter) {
      setErrorMessage('Please fill in both the year and the quarter.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/estimations/add/`, {
        year,
        quarter,
        items: [],
      });
      console.log('Estimation created:', response.data);
      setSnackbarMessage('Estimation created');
      setSnackbarOpen(true);
      handleClose();
      navigate(`/estimations/${year}/${quarter}`);
    } catch (error) {
      console.error('Error creating estimation:', error);
      setErrorMessage('An error occurred while creating the estimation.');
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={IsAddEstimationClicked} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Estimation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new estimation, please select the "year" and the "quarter".
          </DialogContentText>
          <div className="inputsInTheModal">
            <TextField
              label="Year"
              type="string"
              placeholder="y24-y50"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quarter"
              type="string"
              placeholder="q1-q4"
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEstimation} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
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
}
