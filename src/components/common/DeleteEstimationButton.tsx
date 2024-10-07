import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EstimationDeleteModal from './EstimationDeleteModal';
import { useRecoilState } from 'recoil';
import { isButtonClickedState } from './recoilState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

function DeleteEstimationButton() {
  const classes = useStyles();
  const [IsButtonClicked, setIsButtonClicked] = useRecoilState(isButtonClickedState); 

  const handleDelete = (e:any) => {
    e.stopPropagation()
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
      <EstimationDeleteModal open={IsButtonClicked} onClose={handleClose} />
    </>
  );
}

export default DeleteEstimationButton;
