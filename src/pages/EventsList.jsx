import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../e-api/api';
import styled from 'styled-components';
import 'react-table/react-table.css';
import react from '../components/layout/react.png'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
/*
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`*/
/*
class UpdateEvents extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/events/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}*/

class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllEvents().then(events => {
            this.setState({
                events: events.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { events, isLoading } = this.state
        /*console.log('TCL: MoviesList -> render -> movies', movies) ---test event list--- */

        const columns = [
            /*{
                Header: 'ID',
                accessor: '_id',
                filterable: true,
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
                Header: 'Date & Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            /*{
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
            },*/
        ]

        let showTable = true
        if (!events.length) {
            showTable = false
        }

        return (
            <div>
                <h3 className='eventsHeader'>Choose wisely where to go</h3>
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={events}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
                <div  className="madeInReact">
                    <img src={react} alt="Made in React" />
                </div>
            </div>
        )
    }
}

export default EventsList