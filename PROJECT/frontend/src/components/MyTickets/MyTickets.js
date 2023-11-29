import './MyTickets.css'
import React, {useEffect, useState} from "react";
import Filters from '../Filters/Filters.js'
import SelectTicket from '../SelectTicket/SelectTicket.js'
import {Table, Modal, InputNumber, Checkbox} from "antd";

function MyTickets() {
    const [isLoading, setIsLoading] = useState(null);
    const [isError, setIsError] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState('')

    useEffect(() => {
        const filterObj = filters ? { "filter": filters } : {}

        fetch(`${process.env.REACT_APP_URL}/tickets/1`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filterObj),
        }).then(
                (response) => {
                    response.json().then(
                        (jsonResponse) => {
                            const data = jsonResponse.data;
                            const newData = data.map((res, index)=>{
                                res.key = index;
                                return res;
                            })
                            setTickets(newData);
                            setIsLoading(false);
                        }
                    ).catch(
                        (err)=>{
                            console.log(err);
                            setIsError(true)
                        }
                    )

                }
            ).catch(
                (err)=>{
                    console.log(err);
                    setIsError(true)
                }
            )

    }, [filters])

    const plainColumns = ['Cost', 'Event', 'Seat#', 'Row#', 'Section#'];
    const columns = [
        {
            title: 'TicketID',
            dataIndex: 'ticketid',
            key: 'ticketid',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'Event',
            dataIndex: 'eventname',
            key: 'eventname',
        },
        {
            title: 'Seat#',
            dataIndex: 'seatnumber',
            key: 'seatnumber',
        },
        {
            title: 'Row#',
            dataIndex: 'rownumber',
            key: 'rownumber',
        },
        {
            title: 'Section#',
            dataIndex: 'sectionnumber',
            key: 'sectionnumber',
        },
    ];

    if (isLoading) {
        return <div className="maincontent">Loading...</div>;
    }

    if (isError) {
        return <div className="maincontent">Error: {isError}</div>;
    }

    return (
    <div className="mytickets maincontent">
        <div className="filters">
            <h1>Filter Settings</h1>
            {/*<p>What columns would you like to show?</p>*/}
            {/*<Checkbox.Group options={plainColumns} onChange={onChange} />*/}
            <p>What filters would you like to add?</p>
            <Filters filters={filters} setFilters={setFilters}/>
        </div>
        {/*To perform operations and clear selections after selecting some rows,
        use rowSelection.selectedRowKeys to control selected rows.*/}
        <Table className="table"  dataSource={tickets} columns={columns}
               rowSelection={{
                   type: "radio",
                   onChange: (selectedRowKey, selectedRow) => {
                       setSelectedTicket(selectedRow)
                   },
               }}
        />
        <SelectTicket selectedTicket={selectedTicket}/>
    </div>
  );
}

export default MyTickets;