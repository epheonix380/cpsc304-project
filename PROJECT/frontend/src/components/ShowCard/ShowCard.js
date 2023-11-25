import './ShowCard.css'
import Modal from "../Modal/Modal";
import {useState} from "react";

function ShowCard({show}) {

  // {"eventid":1,"type":"CNCRT","eventname":"Eras Tour","author":"Taylor Swift","description":"I heard its good","starttime":"2023-11-04","venueid":1,"venuename":"Rogers Arena","city":"Vancouver"}
  const id = show.eventid;
  const type = show.type;
  const name = show.eventname;
  const author = show.author;
  const description = show.description;
  const venue = `${show.venuename}, ${show.city}`

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <div className="showcard" onClick={toggleModal}>
        <Modal show={modal} onClose={toggleModal}>
            <>
                <h1>{name}</h1>
                <h3>{author}</h3>
                <p>Need to fix this toggle!</p>
            </>
        </Modal>
      <h3>{name}</h3>
      <p className="author">{author}</p>
      <p className="location">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker</title><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>
        {venue}
      </p>
    </div>
  );
}

export default ShowCard;