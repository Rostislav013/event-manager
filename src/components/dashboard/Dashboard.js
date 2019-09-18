import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import api from '../../e-api/api';
import styled from 'styled-components';
import react from '../layout/react.png';
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
    const { user } = this.props.auth; // dont delete
    
   /*----checking whats user has------  
        const data = this.props.auth;
        console.log(typeof data);
        let newAuth = [];
        for (var key in data) {
        newAuth.push(data[key]);
        console.log(newAuth);
      }*/
    
    await api.getAllEvents().then(events => {
        let her = events.data.data
        //console.log(her[0].user);

        let newList = [];
        for(let i = 0; i < her.length; i++){
            if(her[i].userID === user.id) {
                newList.push(her[i]);
                //console.log(newList);
            }
            
        } 

        this.setState({
            events: newList,
            isLoading: false,
        })
    })
    //console.log(this.state.events);
};

  
render() {
    const { user } = this.props.auth;
    //console.log(user.name);
    const { events, isLoading } = this.state
        //console.log('TCL: MoviesList -> render -> events', events) 
          
       const columns = [
            /*{
                Header: 'ID',
                accessor: '_id',
                filterable: true,
                
            },*/
            /*{
                Header: 'Organizator',
                accessor: 'organizator',
            },*/
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'description',
                filterable: true,
            },
            {
                Header: 'Date',
                accessor: 'date',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
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
                        width: "80%",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",  
                    }}
                        data={events}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
        </Wrapper>
        <div className="madeInReact">
            <img src={react} alt="Made in React" />
        </div>
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

// Dashboard;
