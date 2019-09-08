import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import ReactTable from 'react-table'
import api from '../../e-api/api'
import { ReactTableDefaults } from 'react-table';
import styled from 'styled-components'

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  //-----------------------
  constructor(props) {
    super(props)
    this.state = {
        movies: [],
        filterVal: '',
        columns: [],
        isLoading: false,
    }
};

componentDidMount = async () => {
    this.setState({ isLoading: true })
    const { user } = this.props.auth;
    console.log(user.name);
    await api.getAllMovies().then(movies => {
        this.setState({
            movies: movies.data.data,
            filterVal: user.name,
            isLoading: false,
        })
    })
   
};

  //----------------
  
render() {
    const { user } = this.props.auth;
    //console.log('TCL: MoviesList -> render -> movies', user);
    
    //-------------------------------
    const { movies, isLoading } = this.state
        //console.log('TCL: MoviesList -> render -> movies', movies) 
        console.log( this.state.movies)
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
                
            },
            {
                Header: 'User',
                accessor: 'user',
                filterable: true,
                filtered:'Kar',
                                
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'rating',
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
                            <DeleteMovie id={props.original._id} />
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
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

    //---------------------
return (
      <div>
        
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              
            </h4>
            <button
              style={{
                backgroundColor: "yellow",
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

            <Link to="dashboard/events/create" className="nav-link"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              backgroundColor: "yellow",
              padding: "5px",
              marginLeft: "200px"
            }}>
              Create Event
            </Link>


          </div>
        </div>
        <Wrapper>
                {showTable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
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

class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/events/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Edit</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the event ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
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

// MoviesList;
