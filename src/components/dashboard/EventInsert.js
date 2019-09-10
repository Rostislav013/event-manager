import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import api from '../../e-api/api'
import styled from 'styled-components'

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
        description: '',
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
    
}

handleChangeInputDescription = async event => {
    const description = event.target.validity.valid
        ? event.target.value
        : this.state.description

    this.setState({ description })
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
    const { user } = this.props.auth;
    //console.log(user.id);
    const { userID, name, description, time } = this.state;
    
return (
      <div>
        
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
            </h4>
            <button
              style={{
                backgroundColor: "white",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                padding: "5px"
              }}
              onClick={this.onLogoutClick}
              
            >
              Logout
            </button>

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
                    /*step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"*/
                    value={description}
                    onChange={this.handleChangeInputDescription}
                />

                <Label>Date & Time: </Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={this.handleChangeInputTime}
                />
                <Button onClick={this.handleIncludeMovie}>Add Event</Button>
                <CancelButton href={'/dashboard'}>Cancel</CancelButton>
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
