import './MyTickets.css'
import React, {useEffect, useState} from "react";
import Filters from '../Filters/Filters.js'
import {Table, Modal, InputNumber, Checkbox, Select, Input} from "antd";

function MyTickets() {
    const [isLoading, setIsLoading] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedFilter, setAddedFilter] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState('')
    let andOrOperator = 'and', filterColumn = 'Ticket.ticketid', filterValue;

    const showModal = () => {setIsModalOpen(true)};
    const handleOk = () => {setIsModalOpen(false)};
    const handleCancel = () => {setIsModalOpen(false)};

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

    const onChange = (value) => {
        console.log('checked = ', value);
    };
    console.log(tickets)
    return (
    <div className="mytickets maincontent">
        <div className="filters">
            <h1>Filter Settings</h1>
            <p>What columns would you like to show?</p>
            <Checkbox.Group options={plainColumns} onChange={onChange} />
            <p>What filters would you like to add?</p>
            <Filters filters={filters} setFilters={setFilters}/>
        </div>
        {/*To perform operations and clear selections after selecting some rows,
        use rowSelection.selectedRowKeys to control selected rows.*/}
        <Table className="table"  dataSource={tickets} columns={columns}
               rowSelection={{
                   type: "radio",
                   onChange: (selectedRowKeys, selectedRows) => {
                       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                       console.log(tickets[0]);
                   },
               }}
        />
        <Modal title={`Updating ticket`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>What seat number would you like?</p>
            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
            <p>What row number would you like?</p>
            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
            <p>What section number would you like?</p>
            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
        </Modal>
        <button onClick={showModal}>SELECT TICKET</button>
    </div>
  );
}

export default MyTickets;