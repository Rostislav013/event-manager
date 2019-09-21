import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';



import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    margin: '20px',
    right: '0px',
    color: 'white',
  },
  butts: {
      position: 'absolute',
      right: '0px',
  },
  headerBar: {
    backgroundColor: 'black',
    color: 'white',
  }
}));

export default function ButtonAppBar() {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.headerBar}>
        <Toolbar>
        <Link
              to="/"
              style={{
                fontFamily: "monospace",
                
              }}
              className="col s5 brand-logo center black-text"
            >
              Events
            </Link>


          <div className={classes.butts}>
                   
          <Link to="/events/list">
          <Button className={classes.button}>
          Event List
            </Button>
              </Link>

              <Link to="/login" >
              <Button className={classes.button}>
              Log in
            </Button>
            </Link>

              <Link to="/register">
              <Button className={classes.button}>
              Register
            </Button>             
              </Link>
<Button variant="contained" color="primary" style={{
                    backgroundColor: 'black', 
                    width: "120px", 
                    }}   > 
                    Logout
                </Button>

         </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}