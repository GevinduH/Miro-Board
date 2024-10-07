import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rules from '../rules/Rules';
import AppWithDrawer from './AppWithDrawer';
import { useLocation, useNavigate } from 'react-router-dom';
import EstimationTable from '../estimations/EstimationTable';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  drawerContainer: {
    display: 'flex',
    width: '100%',
  },
  drawer: {
    width: '70px',
    display: 'inline-block',
  },
  tabContainer: {
    width: 'calc(100% - 50px)', 
    display: 'inline-block',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/rules') {
      setValue(0);
    } else if (location.pathname === '/estimations') {
      setValue(1); 
    }
  }, [location.pathname]);
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/rules');
    } else if (newValue === 1) {
      navigate('/estimations');
    }
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
    if (index === 0) {
      navigate('/rules');
    } else if (index === 1) {
      navigate('/estimations');
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <div className={classes.drawerContainer}>
        <div className={classes.drawer}>
            <AppWithDrawer />
          </div>
          <div className={classes.tabContainer}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Rules" {...a11yProps(0)} />
              <Tab label="Estimations" {...a11yProps(1)} />
            </Tabs>
          </div>
        </div>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Rules/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <EstimationTable/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
