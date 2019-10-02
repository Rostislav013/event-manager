import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles(theme => ({
  
  appBar: {
    top: 'auto',
    bottom: 0,
    paddingTop: '15px',
    backgroundColor: 'black',
    height: '60px',
  },
  typo: {
    marginLeft: '10px',
  }
  
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
     
      
      <AppBar position="fixed" color="primary" className={classes.appBar}>

      <Typography className={classes.typo}>
        Made by <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/anastasia-aleksandrova-46010974/'>Anastasia Aleksandrova</a>, <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/valentina-jakobson/'>Valentina Jakobson</a>, <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/rostislavpetrenko/'>Rostislav Petrenko</a>, <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/veselovskii/'>Konstantin Veselovskii</a>.    
      </Typography>  
     
      </AppBar>
    </React.Fragment>
  );
}