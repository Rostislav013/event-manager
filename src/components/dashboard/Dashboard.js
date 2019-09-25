import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import api from '../../e-api/api';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  //-----------------------
  constructor(props) {
    super(props)
    this.state = {
        events: [],
        columns: [],
        isLoading: false,
        newEvent: [],
    }
};

componentDidMount = async () => {
    this.setState({ isLoading: true })
    const { user } = this.props.auth; 
     
    await api.getAllEvents().then(events => {
        let userEvent = events.data.data
       
        //show only the user's events
        let newList = [];
        for(let i = 0; i < userEvent.length; i++){
            if(userEvent[i].userID === user.id) {
                newList.push(userEvent[i]);
            }
        } 

        this.setState({
            events: newList.sort(function(a,b){return   new Date(a.date) - new Date(b.date); }), //sort by dates,
            isLoading: false,
        })
    })
};

  
render() {
    const { user } = this.props.auth;
    const { events, isLoading } = this.state
    const columns = [
            {
                Header:'Name',
                accessor: 'name',
                filterable: true,
                style: { 'whiteSpace': 'unset' } // allow for words wrap inside only this cell
            },
            {
                Header: 'Description',
                accessor: 'description',
                filterable: true,
                minWidth: 500,
                style: { 'whiteSpace': 'unset' } // allow for words wrap inside only this cell
            },
            {
                Header: 'Date',
                accessor: 'date',
                filterable: true,
                Cell: props => props.value.slice(8,10) + '.' + props.value.slice(5,7) + '.' + props.value.slice(0,4) // here can show data my needed way
            },
            {
                Header: 'Time',
                accessor: 'time',
            },
            
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                   return (
                        <span>
                            <DeleteEvent id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                  return (
                        <span>
                            <UpdateEvent id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!events.length) {
            showTable = false
        }

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

                <Link to={`dashboard/events/create` } className="nav-link" style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    padding: "5px",
                    marginLeft: "200px"
                    }}>
                    <Button variant="contained" color="primary"  style={{
                        backgroundColor: 'black', 
                        width: "140px", 
                        }}> 
                        Create event
                    </Button>
                </Link>
            </div>
        </div>

        <Wrapper>
                {showTable && (
                    <ReactTable
                    style={{
                        width: "100%",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",  
                    }}
                        data={events}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={20}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
        </Wrapper>
        
    </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

//---------------------------------------------------------

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateEvent extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/events/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Edit</Update>
    }
}

class DeleteEvent extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the event ${this.props.id} permanently?`,
            )
        ) {
            api.deleteEventById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

export default 
 
  connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard);