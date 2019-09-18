import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import api from '../../e-api/api'
import styled from 'styled-components'
import { MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';


const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    width: 500px;
    margin: 0 30px;
    center;
    border: 2px solid black;
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

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class EventInsert extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

componentDidMount = async () => {
    
    const { user } = this.props.auth; 
    //console.log(user);
};

constructor(props) {
    super(props)

    this.state = {
        name: '',
        organizator: '',
        description: '',
        date: new Date(), // checke here
        time: '',
        userID: '',
        
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
  let dateToStr = value.toString()
  let den = dateToStr.slice(4,10).split(" ").reverse().join(" ");
  let year = dateToStr.slice(11,15);
  let data = `${den} ${year}`;
  let date = data;
  console.log(date)
  this.setState({ date})
  
}

handleChangeInputTime = async event => {
    const time = event.target.value
    this.setState({ time})
    
}


/*
handleChangeInputUser = async event => {
    const { user } = this.props.auth;
  const userID = user.id //event.target.value  // MUST MAKE IT USER:NAME
   
  
    this.setState({ userID })
}*/

handleIncludeEvent = async () => {
    const { name, organizator, description, date, time, userID } = this.state
    const arrayTime = time.split('/')
    const payload = { userID, name, organizator, description, date, time: arrayTime }

    await api.insertEvent(payload).then(res => {
        window.alert(`Event inserted successfully`)
        this.setState({
            name: '',
            organizator: '',
            description: '',
            //date: '',
            time: '',
            userID: '',
        })
    })
}

render() {
    const { user } = this.props.auth;
    //console.log(user.id);
    const { userID, name, organizator, description, date, time } = this.state;
    
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

         

          <Label>Time: </Label>
          <InputText
            type="text"
            value={time}
            onChange={this.handleChangeInputTime}
          />
           <Label>Date: </Label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                // label="Date picker inline"
                value={date}
                onChange={ this.handleChangeInputDate }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider> 

          <br></br>
            <Button onClick={this.handleIncludeEvent} style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '15px',        
                }} >Add Event
            </Button>
                     
            <Button href={'/dashboard'} style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '15px',
                }}>Cancel
            </Button>
          </Wrapper>  
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

// Dashboard;
