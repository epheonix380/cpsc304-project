import './SelectTicket.css'
import React, {useEffect, useState} from "react";
import {Modal, Select} from "antd";

function SelectTicket({selectedTicket}) {
    const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [oldTicket, setOldTicket] = useState({});
    const [newTicket, setNewTicket] = useState({});
    const [ticketToDelete, setTicketToDelete] = useState({});
    const ticketNumber = selectedTicket.length === 0 ? undefined : selectedTicket[0].ticketid;
    const eventname = selectedTicket.length === 0 ? '' : selectedTicket[0].eventname;
    let newTicketNumber = 0;

    // need a useEffect() to set availableTickets that will show in dropdown
    // pass in eventid & userid, make sure tickets are not yet Issued

    useEffect(() => {
        console.log(oldTicket);
        console.log(newTicket);
    }, [oldTicket, newTicket]) // when newTicket is updated, that means send update query

    useEffect(() => {
        console.log(ticketToDelete);
    }, [ticketToDelete]) // when ticketToDelete is updated, that means send delete query

    const availableTickets = [
        { value: 0, label: 'seatnumber: 1, rownumber: 2, sectionnumber: 3' },
        { value: 1, label: 'seatnumber: 4, rownumber: 5, sectionnumber: 6' },
        { value: 2, label: 'seatnumber: 7, rownumber: 8, sectionnumber: 9' },
        { value: 4, label: 'seatnumber: 10, rownumber: 20, sectionnumber: 30' },
    ]

    const showModal = (type) => {
        if (ticketNumber === undefined) {
            alert("Please select a ticket first!");
        } else if (type === 'select') {
            setIsSelectModalOpen(true);
        } else {
            setIsDeleteModalOpen(true);
        }
    };

    const handleOk = (type) => {
        if (type === 'select') {
            setOldTicket({ticketid: ticketNumber});
            setNewTicket({ticketid: newTicketNumber});
            setIsSelectModalOpen(false);
        } else {
            setTicketToDelete({ticketid: ticketNumber});
            setIsDeleteModalOpen(false);
        }
    };

    const handleCancel = (type) => {
        if (type === 'select') {
            setIsSelectModalOpen(false);
        } else {
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div>
            <Modal title={`Updating ticket #${ticketNumber}`} destroyOnClose={true}
                   open={isSelectModalOpen} onOk={() => handleOk('select')} onCancel={() => handleCancel('select')}>
                <p>What seat would you like to change to?</p>
                <Select
                    options={availableTickets}
                    defaultValue={0}
                    onChange={(e) => newTicketNumber = e}
                />
            </Modal>
            <Modal title={`Are you sure you want to delete ticket #${ticketNumber}?`}
                   open={isDeleteModalOpen} onOk={() => handleOk('delete')} onCancel={() => handleCancel('delete')}>
                <p>This is for the event: {eventname}</p>
            </Modal>
            <div>
                <button onClick={() => showModal('select')} id="select">SELECT TICKET</button>
                <button onClick={() => showModal('delete')} id="delete">DELETE</button>
            </div>
        </div>
    );
}

export default SelectTicket;