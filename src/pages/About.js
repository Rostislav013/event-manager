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
    color: theme.palette.text.secondary
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
      <Typography variant="body1" gutterBottom>
        EventID is created for companies and communities internal use. With EventID you can
      </Typography>
        <Paper className={classes.paper}>
            <div>

            <Typography variant="body1" gutterBottom>
            <ul>
              <li><CheckIcon />Create events for sharing sessions</li>
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
    </Grid>
  </div>
  <Container maxWidth="sm" className={classes.secondContainer}>
      <Typography variant="h5" gutterBottom className={classes.h5}>
        How to use our App
      </Typography>


      <Typography variant="body1" gutterBottom className={classes.howto}>
        Our App is very easy to use! You have two options to choose - to see all upcoming events OR to register and manage events by yoursefl.
      </Typography>
      <Typography>
      <h3>Email Us</h3>
      <form method="POST" action="/send" id='client'>
        <p>
          <label>Name</label>
          <input type="text" name="name"></input>
        </p>
        <p>
          <label>Company</label>
          <input type="text" name="company"></input>
        </p>
        <p>
          <label>Email Address</label>
          <input type="email" name="email"></input>
        </p>
        <p>
          <label>Phone Number</label>
          <input type="text" name="phone"></input>
        </p>
        <p class="full">
          <label>Message</label>
          <textarea name="message" rows="5"></textarea>
        </p>
        <p class="full">
          <button type="submit" value="reset">Submit</button>
        </p>
      </form>
      </Typography>
</Container>
</Container>
  </React.Fragment>
  </div>
     );
    }
