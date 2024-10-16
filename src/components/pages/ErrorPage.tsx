import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: '2.5rem',
    color: theme.palette.error.main,
  },
  button: {
    marginTop: theme.spacing(3),
    fontSize: '1rem',
    padding: theme.spacing(1, 3),
  },
}));

const ErrorPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/rules');
  };

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.title}>
        Oops! Something went wrong. <br/>
        Select a Estimation from the Menu! 
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.button} 
        onClick={handleButtonClick}
      >
        Go to Rules
      </Button>
    </div>
  );
};

export default ErrorPage;
