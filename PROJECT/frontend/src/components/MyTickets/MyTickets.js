import './MyTickets.css'
import React, {useEffect, useMemo, useState} from "react";
import {Table, Modal, InputNumber, Checkbox} from "antd";
import Dropdown from "react-dropdown";

function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {setIsModalOpen(true)};
    const handleOk = () => {setIsModalOpen(false)};
    const handleCancel = () => {setIsModalOpen(false)};

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

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const items = [
        {
            label: '1st menu item',
            key: '0',
        },
        {
            label: '2nd menu  item',
            key: '1',
        },
        {
            label: '3rd menu item',
            key: '2',
        },
    ];

    return (
    <div className="mytickets maincontent">
        <div className="filters">
            <h1>Filter Settings</h1>
            <p>What columns would you like to show?</p>
            <Checkbox.Group options={plainColumns} onChange={onChange} />
            <p>What filters would you like to add?</p>
            <Dropdown
                options={plainColumns}
                value={plainColumns[0]}
                className={""}
            /> IS EQUAL TO
            <Dropdown
            options={plainColumns}
            value={plainColumns[0]}
            className={""}
            />
            {/*<Dropdown*/}
            {/*    menu={{*/}
            {/*        items,*/}
            {/*    }}*/}
            {/*    trigger={['click']}*/}
            {/*    onOpenChange={() => console.log('CHANGED')}*/}
            {/*>*/}
            {/*    <a onClick={(e) => e.preventDefault()}>*/}
            {/*        Click me*/}
            {/*    </a>*/}
            {/*</Dropdown>*/}
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
        <button onClick={showModal}>SELECT ROW</button>
    </div>
  );
}

export default MyTickets;