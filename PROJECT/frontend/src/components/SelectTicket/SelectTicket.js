import './SelectTicket.css'
import React, {useEffect, useState} from "react";
import {Modal, Select} from "antd";

function SelectTicket({selectedTicket}) {
    const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [availableTickets, setAvailableTickets] = useState([]);
    const ticketNumber = selectedTicket.length === 0 ? undefined : selectedTicket[0].ticketid;
    const eventname = selectedTicket.length === 0 ? '' : selectedTicket[0].eventname;
    let newTicketNumber = 0;

    // need a useEffect() to set availableTickets that will show in dropdown
    // pass in eventid & userid, make sure tickets are not yet Issued

    useEffect(()=>{
        if (selectedTicket.length>0) {
            const ticket = selectedTicket[0];
            fetch(`${process.env.REACT_APP_URL}/sections?eventid=${ticket.eventid}&venueid=${ticket.venueid}&amount=1`)
            .then((response)=>{
                response.json().then((jsonResponse)=>{
                    const data = jsonResponse.data;
                    const newData = data.map((res, index)=>{
                        res.value = res.ticketid;
                        res.label = `Seat No:${res.seatnumber} | Row No:${res.rownumber} | Section No:${res.sectionnumber}` ;
                        return res;
                    })
                    setAvailableTickets(newData);
                })
                
            })
        }
    },[selectedTicket])

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
            fetch(`${process.env.REACT_APP_URL}/update/ticket`, {
                method: 'POST',
                headers: {
                      "Content-Type": "application/json",
                },
                body: JSON.stringify({oldTicketID:ticketNumber, newTicketID:newTicketNumber, userID:1}),
              }).then(()=>{
                window.location.reload();
                setIsSelectModalOpen(false);
              })
            
        } else {
            fetch(`${process.env.REACT_APP_URL}/tickets/${ticketNumber}`, {
                method: 'DELETE',
            }).then(()=>{
                window.location.reload();
                setIsDeleteModalOpen(false);
            })
            
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
                    defaultValue={availableTickets[0]}
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