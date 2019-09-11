import React, { Component } from 'react'
import api from '../../e-api/api'
import styled from 'styled-components'


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
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

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
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
            description: '',
            date: '',
            time: '',
            userID: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
        
       
    
    }

    handleChangeInputDescription = async event => {
        const description = event.target.validity.valid
            ? event.target.value
            : this.state.description

        this.setState({ description })
        
    }
    handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    }
    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleUpdateEvent = async () => {
        const { id, name, description, date, time, userID } = this.state
        const arrayTime = time.split('/')
        const payload = { userID, name, description, date, time: arrayTime }

        await api.updateEventById(id, payload).then(res => {
            window.alert(`Event updated successfully`)
            this.setState({
                name: '',
                description: '',
                date: '',
                time: '',
                userID: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const event = await api.getEventById(id)

        this.setState({
            name: event.data.data.name,
            description: event.data.data.description,
            date: event.data.data.date,
            time: event.data.data.time.join('/'),
            userID: event.data.data.userID,
        })
    }

    render() {
        const { user } = this.props.auth; // dont delete
        console.log(user.name);
        const { name, description, date, time, userID } = this.state
        return (
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
                <Label>Date: </Label>
                <InputText
                    type="text"
                    value={date}
                    onChange={this.handleChangeInputDate}
                />
                <Label>Date & Time: </Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={this.handleChangeInputTime}
                />

                <Button  onClick={this.handleUpdateEvent} >Update Event</Button>
                <CancelButton href={'/dashboard'}>Cancel</CancelButton>
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