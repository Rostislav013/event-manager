import React, { Component } from 'react'
import api from '../../e-api/api'
import styled from 'styled-components'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { MuiPickersUtilsProvider, KeyboardDatePicker, TimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
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
 `

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

class EventUpdate extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    
    componentDidMount = async () => {
        const { user } = this.props.auth; // dont delete
            
    };

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            organizator : '',
            description: '',
            date: new Date(), // checke here
            time: '',
            forTime: new Date(),
            userID: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputDescription = async event => {
        const description = event.target.validity.valid ? event.target.value
            : this.state.description
        this.setState({ description })
    }

    handleChangeInputDate = async value => {
        let date = value;
        this.setState({ date})
    }

    handleChangeInputTime = async value => {
        //console.log(value)
        //set TimePicker value into choosen time
        const forTime = value;
        this.setState({ forTime})
        //Edit time to our needed format
        let timeToStr = value.toString()
        let timePicked = timeToStr.slice(16,21)
        const time = timePicked
        this.setState({ time})
    }

    

    handleUpdateEvent = async () => {
        const { id, name, organizator, description, date, time, forTime, userID } = this.state
        const arrayTime = time.split('/')
        const payload = { userID, name, organizator, description, date, forTime, time: arrayTime }

        await api.updateEventById(id, payload).then(res => {
            window.alert(`Event updated successfully`)
            this.setState({
                name: '',
                organizator: '',
                description: '',
                date: new Date(), // checke here
                time: '',
                forTime: new Date(),
                userID: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const event = await api.getEventById(id)

        this.setState({
            name: event.data.data.name,
            organizator: event.data.data.organizator,
            description: event.data.data.description,
            date: event.data.data.date,
            time: event.data.data.time.join('/'),
            userID: event.data.data.userID,
        })
    }

    render() {
        const { user } = this.props.auth; // dont delete
        //console.log(user.name);
        const { name, organizator, description, date, time, forTime, userID } = this.state;
        
        return (
            <Wrapper
            style={{
                marginBottom: '55px',
            }}
            >
                <Title>Update Event</Title>

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
                value={date}
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
            <Button onClick={this.handleUpdateEvent} style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '50px 10px',        
                }} >Update Event
            </Button>
                     
            <Button href={'/dashboard'}>Cancel</Button>
          </Wrapper> 
        )
    }
}


EventUpdate.propTypes = {
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
    )(EventUpdate);