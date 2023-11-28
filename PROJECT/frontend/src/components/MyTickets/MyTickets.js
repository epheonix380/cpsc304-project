import './MyTickets.css'
import React, {useEffect, useState} from "react";
import {Table, Modal, InputNumber, Checkbox, Select, Input} from "antd";

function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {setIsModalOpen(true)};
    const handleOk = () => {setIsModalOpen(false)};
    const handleCancel = () => {setIsModalOpen(false)};
    const handleFilterClick = () => {setIsModalOpen(false)};

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3001/tickets/1');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                const jsonResponse = await response.json();
                const data = jsonResponse.data
                console.log(data);
                setTickets(data);
            } catch(error){
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTickets();
    }, []);


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

    if (error) {
        return <div className="maincontent">Error: {error}</div>;
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
            {value: 'ticketid', label: 'Ticket ID'},
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
                    onChange={onChange}
                    defaultValue="ticketid"
                /> is equal to <Input placeholder="value" style={{ width: 300 }} />
            </div>
        )
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
                onChange={onChange}
                defaultValue="and"
                bordered={false}
            />
            <FilterItem/>
            <button onClick={handleFilterClick} className="apply">APPLY</button>
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