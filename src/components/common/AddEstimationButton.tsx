import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddEstimationModal from './AddEstimationModal';
import {IsAddEstimationButtonclicked} from './recoilState'
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function AddEstimationButton() {
  const classes = useStyles();
  const [isAddEstimationClicked, setIsAddEstimationClicked] = useRecoilState(IsAddEstimationButtonclicked); 

  function handleNewEstimation() {
    setIsAddEstimationClicked(true);
  }

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleNewEstimation}>
        Add New Estimation
      </Button>
      {isAddEstimationClicked && <AddEstimationModal/>}
    </div>
  );
}
