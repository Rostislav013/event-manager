import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import api from '../../e-api/api'
import styled from 'styled-components'
import { MuiPickersUtilsProvider, KeyboardDatePicker, TimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import react from '../layout/react.png';

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    width: 500px;
    margin: 0 30px;
    
    
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`
/*
const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`*/



class EventInsert extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

componentDidMount = async () => {
    
    const { user } = this.props.auth; 
    //console.log(user);
    
    await api.getAllEvents().then(events => {
      let her = events.data.data
      //console.log(her[0].user);

      let newList = [];
      for(let i = 0; i < her.length; i++){
          newList.push(her[i].date);
      } 
    
     newList = newList.reverse().join(`/`);
    

      //console.log(newList);
      this.setState({
          events: newList,
          isLoading: false,
          booked: newList,
      })
  })
};

constructor(props) {
    super(props)

    this.state = {
        name: '',
        organizator: '',
        description: '',
        date: '', // checke here
        forDate: new Date(),
        time: '',
        forTime: new Date(),
        userID: '',
        booked: '',
    }
};



handleChangeInputName = async event => {
    const name = event.target.value
    this.setState({ name })
    const { user } = this.props.auth;
    const userID = user.id
      this.setState({ userID})
      const organizator = user.name
      this.setState({ organizator })
    
}

handleChangeInputDescription = async event => {
    const description = event.target.validity.valid
        ? event.target.value
        : this.state.description

    this.setState({ description })
}

handleChangeInputDate = async value => {

  const forDate = value
  //Choosen date go into datePicker value
  this.setState({ forDate })


// transfer date to string n edit in our needed format
  let dateToStr = value.toString()
  let den = dateToStr.slice(4,10).split(" ").reverse().join(" ");
  let year = dateToStr.slice(11,15);
  let data = `${den} ${year}`;
  let date = data;

  this.setState({ date})
  
}

handleChangeInputTime = async value => {
    //console.log(value)
    //set TimePicker value into choosen time
    const forTime = value;
    this.setState({ forTime})
    //Edit time to our needed format
    let timeToStr = value.toString()
    console.log(timeToStr)
    let timePicked = timeToStr.slice(16,21)
    console.log(timePicked)
    const time = timePicked
    this.setState({ time})
  
}


/*
handleChangeInputUser = async event => {
    const { user } = this.props.auth;
  const userID = user.id //event.target.value  // MUST MAKE IT USER:NAME
   
  
    this.setState({ userID })
}*/

handleIncludeEvent = async () => {
    const { name, organizator, description, date, forDate, time, forTime, userID, booked } = this.state
    const arrayTime = time.split('/')
    const payload = { userID, name, organizator, description, date, forDate, time: arrayTime,booked,forTime}

    await api.insertEvent(payload).then(res => {
        window.alert(`Event inserted successfully`)
        this.setState({
            name: '',
            organizator: '',
            description: '',
            //date: '',
            //time: '',
            userID: '',
        })
    })
}



render() {
    const { user } = this.props.auth;
    //console.log(user.id);
    const { userID, name, organizator, description, date, forDate, time, forTime, booked } = this.state;
    
return (
      <div>
        
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
            </h4>
            <Button variant="contained" color="primary" style={{
                    backgroundColor: 'black', 
                    width: "120px", 
                    }}      onClick={this.onLogoutClick}> 
                    Logout
              </Button>

          </div>
        </div>
        <Wrapper>
        <Title>Create Event</Title>
        <div>{booked}</div>


          <Label>Name: </Label>
           <InputText
              type="text"
              value={name}
              onChange={this.handleChangeInputName}
          />

          <Label>Description: </Label>
          <InputText
              type="text"
              value={description}
              onChange={this.handleChangeInputDescription}
          />

         
           <Grid  container
                  direction="column"
                  justify="space-around"
                  alignItems="flex-start">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
             

              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date "
                format="MM/dd/yyyy"
                value={forDate}
                onChange={ this.handleChangeInputDate }
                KeyboardButtonProps={{
                'aria-label': 'change date',
                  }} style={{ margin: '5px'  }}
                />

                <TimePicker 
                  clearable
                  ampm={false}
                  //disableFuture
                  value={forTime}
                  minutesStep={5}
                  onChange={this.handleChangeInputTime}
                  label="Time" style={{ margin: '5px'  }}
                 />

                



            </MuiPickersUtilsProvider> 

            </Grid>


            <Button onClick={this.handleIncludeEvent} style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '50px 10px',        
                }} >Add Event
            </Button>
                     
            <Button href={'/dashboard'} style={{
             
              
                }}>Cancel
            </Button>
          </Wrapper> 
          <div  className="madeInReact">
                    <img src={react} alt="Made in React" style={{position: 'absolute',right: '0', }} />
            </div> 
      </div>
    );
  }
}

EventInsert.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});




  
   











export default 
 
  connect(
    mapStateToProps,
    { logoutUser }
  )(EventInsert);


