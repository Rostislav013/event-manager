import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import about1 from './img/about1.jpg';
import CardMedia from '@material-ui/core/CardMedia';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles (theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginLeft: '10px',
    color: theme.palette.text.secondary,
    marginTop:'10px',
  },
  title: {
      marginTop:'60px',
      marginBottom:'40px',
  },
  h5: {
      marginTop: '40px',
      
  },
  secondContainer: {
    float:'left'
  },
}));

export default function Types() {
  const classes = useStyles();

  return (
    <div>
   
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
    <Typography variant="h3" gutterBottom className={classes.title}>
    EventID. Simple event management
    </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Typography variant="p" gutterBottom style={{fontSize:'19px'}}>
        Companies and communities can use EventID<br />for their internal events and sharing sessions.
      </Typography>
        <Paper className={classes.paper}>
            <div>
           
            <Typography variant="body1" gutterBottom>
            <h6 style={{color:'black'}}>With EventID it is easy to</h6>
            <ul>
              <li><CheckIcon />Create events</li>
              <li><CheckIcon />Edit events</li>
              <li><CheckIcon />Delete events</li>
         
            </ul>
            </Typography>
            </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
      <CardMedia
          component="img"
          className={classes.media}
          image={about1}
          title="people"
        />
      </Grid>
      <Grid item xs={6}>
          <Paper className={classes.paper}>
          <Typography variant="p" gutterBottom style={{fontSize:'19px'}}>
      How to use our App
      </Typography>
      <Typography variant="body1" gutterBottom className={classes.howto}>
        Our App is very easy to use!<br />
        To create an event you have to go to <b>Account</b>, Login if you already have an accout or press <b>Register</b>, fill all the fiedls and Sing in.
        When you are logged in you can create an event and see it in you <b>Account</b>. When you are logged in you can also Edit and Delete events what you created.
      </Typography>
          </Paper>
          
        </Grid>
    </Grid>
  </div>  
</Container>
  </React.Fragment>
  </div>
     );
    }