import './ShowCard.css'
// import Modal from "../Modal/Modal";
import React, {useState} from "react";
import {InputNumber, Modal} from "antd";

function ShowCard({show}) {

  // {"eventid":1,"type":"CNCRT","eventname":"Eras Tour","author":"Taylor Swift","description":"I heard its good","starttime":"2023-11-04","venueid":1,"venuename":"Rogers Arena","city":"Vancouver"}
  const id = show.eventid;
  const type = show.type;
  const name = show.eventname;
  const author = show.author;
  const description = show.description;
  const venue = `${show.venuename}, ${show.city}`;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const showModal = () => {setIsModalOpen(true)};
    const handleCancel = () => {setIsModalOpen(false)};
    const onChange = (value) => {
        // console.log(value)
        setInputValue(value);
    };



    const handleOk = () => {
      console.log(inputValue);
      getAndPurchaseTickets();
      setIsModalOpen(false);
    };

    const getAndPurchaseTickets = async () => {
      const ticketIdsToPurchase = await getUnsoldTickets();
      console.log(ticketIdsToPurchase);
      purchaseTickets(ticketIdsToPurchase);
    }

    const getUnsoldTickets = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/tickets/unsold`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // console.log(response);
        const jsonResponse = await response.json();
        const data = jsonResponse.data
        const thisEventTickets = data.filter((ticket) => ticket.eventid === id);
        const firstInputValueTickets = thisEventTickets.slice(0, inputValue);
        const firstInputValueTicketIds = firstInputValueTickets.map((ticket) => ticket.ticketid);
        // console.log(firstInputValueTicketIds);
        return firstInputValueTicketIds;    
      } catch(error){
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const purchaseTickets = async (listTicketIds) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/purchase`, {
          method: 'POST',
          headers: {
                "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "userid": 1,
            "tickets": listTicketIds,
          }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        const jsonResponse = await response.json();
        const data = jsonResponse.data
        console.log(`successful tickets: ${data}`);
        
      } catch(error){
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };


    


  return (
      <>
          <Modal title={name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>{author} @ {venue}</p>
              <p>How many tickets would you like to buy?</p>
              <InputNumber min={1} max={10} defaultValue={1} onChange={onChange}/>
          </Modal>
          <div className="showcard" onClick={showModal}>
              <h3>{name}</h3>
              <p className="author">{author}</p>
              <p className="location">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker</title><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>
                  {venue}
              </p>
          </div>
      </>

  );
}

export default ShowCard;