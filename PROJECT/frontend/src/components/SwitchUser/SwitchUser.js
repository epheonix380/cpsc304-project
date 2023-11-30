import './SwitchUser.css'
import React, {useEffect, useState} from "react";
import {Modal, Select} from "antd";

function SwitchUser({user, setUser}) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    let chosenUser = user;

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_URL}/users`).then(
            (response) => {
                response.json().then(
                    (jsonResponse) => {
                        const data = jsonResponse.data;
                        setUsers(data);
                        setIsLoading(false);
                    }
                ).catch(
                    (err)=>{
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
    }, [])

    // const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
    // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // const [oldTicket, setOldTicket] = useState({});
    // const [newTicket, setNewTicket] = useState({});
    // const [ticketToDelete, setTicketToDelete] = useState({});
    // const ticketNumber = selectedTicket.length === 0 ? undefined : selectedTicket[0].ticketid;
    // const eventname = selectedTicket.length === 0 ? '' : selectedTicket[0].eventname;
    // let newTicketNumber = 0;
    //
    // // need a useEffect() to set availableTickets that will show in dropdown
    // // pass in eventid & userid, make sure tickets are not yet Issued
    //
    // useEffect(() => {
    //     console.log(oldTicket);
    //     console.log(newTicket);
    // }, [oldTicket, newTicket]) // when newTicket is updated, that means send update query
    //
    // useEffect(() => {
    //     console.log(ticketToDelete);
    // }, [ticketToDelete]) // when ticketToDelete is updated, that means send delete query
    //
    // const availableTickets = [
    //     { value: 0, label: 'seatnumber: 1, rownumber: 2, sectionnumber: 3' },
    //     { value: 1, label: 'seatnumber: 4, rownumber: 5, sectionnumber: 6' },
    //     { value: 2, label: 'seatnumber: 7, rownumber: 8, sectionnumber: 9' },
    //     { value: 4, label: 'seatnumber: 10, rownumber: 20, sectionnumber: 30' },
    // ]
    //
    // const showModal = (type) => {
    //     if (ticketNumber === undefined) {
    //         alert("Please select a ticket first!");
    //     } else if (type === 'select') {
    //         setIsSelectModalOpen(true);
    //     } else {
    //         setIsDeleteModalOpen(true);
    //     }
    // };
    //
    // const handleOk = (type) => {
    //     if (type === 'select') {
    //         setOldTicket({ticketid: ticketNumber});
    //         setNewTicket({ticketid: newTicketNumber});
    //         setIsSelectModalOpen(false);
    //     } else {
    //         setTicketToDelete({ticketid: ticketNumber});
    //         setIsDeleteModalOpen(false);
    //     }
    // };
    //
    // const handleCancel = (type) => {
    //     if (type === 'select') {
    //         setIsSelectModalOpen(false);
    //     } else {
    //         setIsDeleteModalOpen(false);
    //     }
    // };

    if (isLoading) {
        return <div className="maincontent">Loading...</div>;
    }

    if (isError) {
        return <div className="maincontent">Error: {isError}</div>;
    }

    const onClick = () => {
        // do something
    }

    console.log(users);

    return (
        <div>
            <h1>Would you like to switch to another user?</h1>
            {/*<Modal title={`Updating ticket #${ticketNumber}`} destroyOnClose={true}*/}
            {/*       open={isSelectModalOpen} onOk={() => handleOk('select')} onCancel={() => handleCancel('select')}>*/}
            {/*    <p>What seat would you like to change to?</p>*/}
                <Select
                    options={users}
                    defaultValue={0}
                    onChange={(e) => chosenUser = e}
                />
            {/*</Modal>*/}
            {/*<Modal title={`Are you sure you want to delete ticket #${ticketNumber}?`}*/}
            {/*       open={isDeleteModalOpen} onOk={() => handleOk('delete')} onCancel={() => handleCancel('delete')}>*/}
            {/*    <p>This is for the event: {eventname}</p>*/}
            {/*</Modal>*/}
            {/*<div>*/}
            {/*    <button onClick={() => showModal('select')} id="select">SELECT TICKET</button>*/}
                <button onClick={onClick}>SWITCH USER</button>
            {/*</div>*/}
        </div>
    );
}

export default SwitchUser;