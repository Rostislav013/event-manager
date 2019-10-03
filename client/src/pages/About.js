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
    //width: '100%',
    flexGrow: 1,
    marginBottom: '90px',
   // backgroundColor: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    marginLeft: '10px',
    color: theme.palette.text.secondary,
    marginTop:'40px',
  },
  paper1: {
    padding: theme.spacing(2),
    marginLeft: '10px',
    color: theme.palette.text.secondary,
    marginTop:'10px',
  },
  title: {
      marginTop:'30px',
      marginBottom:'40px',
  },
  h5: {
      marginTop: '40px',

  },
  secondContainer: {
    float:'left'
  },
  shortdescr: {
    fontSize:'16px',
    color:'black',
    color: theme.palette.text.secondary
  }
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
       <Typography variant="p" gutterBottom className={classes.shortdescr}>
          Companies and communities can use EventID for their internal events and sharing sessions.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
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
      <Grid item xs={12}>
        <Paper className={classes.paper1}>
        <Typography variant="body1" gutterBottom>
          <h6 style={{color:'black'}}>How to use EventID</h6>
        <Typography variant="body1" gutterBottom className={classes.howto}>
          <ol>
            <li>Go to <b>Account</b> to create an event</li>
            <li>Login if you already have an accout or press <b>Register</b></li>
            <li>Fill all the fiedls and <b>Sing in</b></li>
            <li>Create an event (name, description, date)</li>
            <li>See all your events in the <b>Account</b></li>
            <li>Stay logged in to <b>Edit</b> and <b>Delete</b> your events</li>
            <li>Go to <b>Event List</b> to see all the upcoming events</li>
            <li>Search for events by name, organizer or description</li>
            <li>Use the form below to send us a feedback :)</li>
          </ol>
        </Typography>
        </Typography>
        </Paper>
        <Paper className={classes.paper1}>
        <Typography>
            <h6 style={{color:'black'}}>Email Us</h6>
            <form method="POST" action="/send" id='client'>
              <p>
                <label>Name</label>
                <input type="text" name="name" required></input>
              </p>
              <p>
                <label>Company</label>
                <input type="text" name="company"></input>
              </p>
              <p>
                <label>Email Address</label>
                <input type="email" name="email" required></input>
              </p>
              <p>
                <label>Phone Number</label>
                <input type="text" name="phone"></input>
              </p>
              <p class="full">
                <label>Message</label>
                <textarea name="message" rows="5" required></textarea>
              </p>
              <p class="full">
                <button type="submit" value="reset">Submit</button>
              </p>
            </form>
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