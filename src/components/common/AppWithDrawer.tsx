import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from './TemporaryDrawer';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import {allEstimations} from './recoilState'
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 16,
  },
}));

const AppWithDrawer: React.FC = () => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [estimations, setEstimations] = useRecoilState(allEstimations);
  const navigate = useNavigate();
  console.log("🚀 ~ estimations:", estimations)

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
     
    const fetchEstimations = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:5000/api/estimations/`,
          responseType: 'json',
        });
  
        const estimationData = response.data.Estimations;
        setEstimations(estimationData);
      } catch (error) {
        console.error("Error fetching all estimations:", error);
        navigate('/estimations/error');
      }
    };
  
    if (isDrawerOpen) {
      fetchEstimations();
    }
  }, [isDrawerOpen]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default AppWithDrawer;
