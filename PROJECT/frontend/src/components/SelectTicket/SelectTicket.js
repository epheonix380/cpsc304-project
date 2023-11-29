import './SelectTicket.css'
import React, {useEffect, useState} from "react";
import Filters from '../Filters/Filters.js'
import {Table, Modal, InputNumber, Checkbox} from "antd";

function SelectTicket({selectedTicket}) {
    const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const showModal = (type) => {
        if (type === 'select') {
            setIsSelectModalOpen(true);
        } else {
            setIsDeleteModalOpen(true);
        }
    };
    const handleOk = (type) => {
        if (type === 'select') {
            setIsSelectModalOpen(false);
        } else {
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
    const onChange = (value) => {
        console.log('checked = ', value);
    };
    const ticketNumber = selectedTicket.length === 0 ? 0 : selectedTicket[0].ticketid;
    const eventname = selectedTicket.length === 0 ? '' : selectedTicket[0].eventname;
    // TODO: add error handling for if a ticket is not selected

    return (
        <div>
            <Modal title={`Updating ticket #${ticketNumber}`}
                   open={isSelectModalOpen} onOk={() => handleOk('select')} onCancel={() => handleCancel('select')}>
                <p>What seat number would you like?</p>
                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
                <p>What row number would you like?</p>
                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
                <p>What section number would you like?</p>
                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
            </Modal>
            <Modal title={`Are you sure you want to sell ticket #${ticketNumber}?`}
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