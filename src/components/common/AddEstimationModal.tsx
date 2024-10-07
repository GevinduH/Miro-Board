import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRecoilState } from 'recoil';
import {IsAddEstimationButtonclicked} from './recoilState'
import InputFields from './InputFields';

export default function AddEstimationModal() {
  const [IsAddEstimationClicked, setIsAddEstimatiojClicked] = useRecoilState<boolean>(IsAddEstimationButtonclicked); 
  const handleClose = () => {
    setIsAddEstimatiojClicked(false);
  };

  return (
    <div>
      <Dialog open={IsAddEstimationClicked} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Estimation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add a new estimation, please select the "year" and the "Quarter". 
          </DialogContentText>
          <div className='inputsInTheModal'>
            <InputFields max={2050} min={2024} componentName={'Year'} placeHolder={'2024-2050'}/>
            <InputFields max={4} min={1} componentName={'Quarter'} placeHolder={'1-4'}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
