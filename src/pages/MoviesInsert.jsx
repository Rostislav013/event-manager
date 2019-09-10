import React, { Component } from 'react'
import api from '../e-api/api'
import styled from 'styled-components'

import { logoutUser } from "../actions/authActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";




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

class MoviesInsert extends Component {
    
     



    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            time: '',
            userID: '',
            
        }
    };


  



    

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

    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }
   
    

    handleChangeInputUser = async event => {
        
      const userID = event.target.value  // MUST MAKE IT USER:NAME
       //const userK = this.props.auth;
      // console.log( user);
        this.setState({ userID })
    }

    handleIncludeMovie = async () => {
        const { name, description, time, userID } = this.state
        const arrayTime = time.split('/')
        const payload = { userID, name, description, time: arrayTime }

        await api.insertMovie(payload).then(res => {
            window.alert(`Event inserted successfully`)
            this.setState({
                name: '',
                description: '',
                time: '',
                userID: '',
            })
        })
    }

    render() {
        
        

        const { name, description, time, userID } = this.state
        //console.log(this.user);
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
                    /*step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"*/
                    value={description}
                    onChange={this.handleChangeInputDescription}
                />

                <Label>Time: </Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={this.handleChangeInputTime}
                />
                <Label>userID: </Label>
                <InputText
                    type="text"
                    value={userID}
                    onChange={this.handleChangeInputUser}
                />

                <Button onClick={this.handleIncludeMovie}>Add Event</Button>
                <CancelButton href={'/dashboard'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}


  

export default MoviesInsert
