import './MyTickets.css'
import React, {useEffect, useState} from "react";
import {Table, Modal, InputNumber, Checkbox, Select, Input} from "antd";

function MyTickets() {
    const [isLoading, setIsLoading] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                            setTickets(data);
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

    const andOr = [
        {value: 'and', label: 'and'},
        {value: 'or', label: 'or'},
    ];

    const FilterItem = () => {
        const filterColumns = [
            {value: 'Ticket.ticketid', label: 'Ticket ID'},
            {value: 'cost', label: 'Cost'},
            {value: 'event', label: 'Event'},
            {value: 'seatnumber', label: 'Seat#'},
            {value: 'rownumber', label: 'Row#'},
            {value: 'sectionnumber', label: 'Section#'}
        ];

        return (
            <div>
                <Select
                    options={filterColumns}
                    onChange={(value) => filterColumn = value}
                    defaultValue={filterColumn}
                /> is equal to <Input
                placeholder="value"
                style={{ width: 300 }}
                onChange={(value) => filterValue = value} />
            </div>
        )
    }

    const handleApply = () => {
        if (filterValue !== undefined) {
            setFilters(`${filterColumn} = ${filterValue.target.value}`);
            console.log(andOrOperator, filterColumn, filterValue.target.value);
        } else {
            alert("You have not filled out a filter value!")
        }
    }

    return (
    <div className="mytickets maincontent">
        <div className="filters">
            <h1>Filter Settings</h1>
            <p>What columns would you like to show?</p>
            <Checkbox.Group options={plainColumns} onChange={onChange} />
            <p>What filters would you like to add?</p>
            <FilterItem/>
            <Select
                options={andOr}
                onChange={(value) => andOrOperator = value}
                defaultValue={andOrOperator}
                bordered={false}
            />
            {/*<FilterItem/>*/}
            <button onClick={handleApply}>APPLY</button>
        </div>
        {/*To perform operations and clear selections after selecting some rows,
        use rowSelection.selectedRowKeys to control selected rows.*/}
        <Table className="table" dataSource={tickets} columns={columns}
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