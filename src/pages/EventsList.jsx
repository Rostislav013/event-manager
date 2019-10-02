import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../e-api/api';
import styled from 'styled-components';
import 'react-table/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

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
            //console.log(events.data.data)
                
            //show only upcoming events
            let newList = [];
            for(let i = 0; i < events.data.data.length; i++){
                
                if((Date.parse(events.data.data[i].date) - Date.parse(new Date())) > -6800000  ) {
                    newList.push(events.data.data[i]); // pushing if it is an upcoming event
                    console.log(Date.parse(events.data.data[i].date)-Date.parse(new Date()));
                }
            } 
            //console.log(newList)
            this.setState({
                events: newList.sort(function(a,b){return   new Date(a.date) - new Date(b.date); }), //sort by dates
                isLoading: false,
            })
        })
    }

    render() {
        const { events, isLoading } = this.state
        const columns = [
           {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Organizer',
                accessor: 'organizator',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'description',
                filterable: true,
                minWidth: 300,
                style: { 'whiteSpace': 'unset' } // allow for all words wrap inside only this cell
            },
            {
                Header: 'Date',
                accessor: 'date',
                Cell: props =>  props.value.slice(8,10) + '.' + props.value.slice(5,7) + '.' + props.value.slice(0,4)        // here can show data my needed way
            },
            {
                Header: 'Time',
                accessor: 'time',
                
            },
        ]

        let showTable = true;
        if (!events.length) {
            showTable = false
        }

        return (
            <div>
                <h3 style={{textAlign: 'center'}}>Choose wisely where to go</h3>
                <Wrapper>
                    {showTable && (
                        <ReactTable
                        style={{
                            marginBottom: '55px',
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
        )
    }
}

export default EventsList