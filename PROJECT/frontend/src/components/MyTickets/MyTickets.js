import './MyTickets.css'
import React, {useEffect, useState} from "react";
import ShowCard from "../ShowCard/ShowCard";
import Modal from "../Modal/Modal";


function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const dummyData = [
        {ticketNumber: 1, cost: 20, eventid: 123, seatNumber: 2, seatRow: 4, sectionNumber: 5,},
        {ticketNumber: 2, cost: 20, eventid: 123, seatNumber: 5, seatRow: 1, sectionNumber: 3,},
        {ticketNumber: 3, cost: 5, eventid: 412, seatNumber: 1, seatRow: 5, sectionNumber: 2,},
        {ticketNumber: 4, cost: 8, eventid: 23, seatNumber: 8, seatRow: 11, sectionNumber: 1,}
    ];

    // useEffect(() => {
    //     const fetchTickets = async () => {
    //         try {
    //             const response = await fetch('http://127.0.0.1:3001/tickets/1');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             console.log(response);
    //             const jsonResponse = await response.json();
    //             const data = jsonResponse.data
    //             console.log(data);
    //             setTickets(data);
    //         } catch(error){
    //             setError(error.message);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchTickets();
    // }, []);

    if (isLoading) {
        return <div className="maincontent">Loading...</div>;
    }

    if (error) {
        return <div className="maincontent">Error: {error}</div>;
    }

    return (
    <div className="mytickets maincontent">
        <table>
            <thead>
            <tr>
                <th>Ticket#</th>
                <th>Cost</th>
                <th>EventID</th>
                <th>Seat#</th>
                <th>Row#</th>
                <th>Section#</th>
            </tr>
            </thead>
            <tbody>
            {dummyData.map((value, key) => {
                return (
                    <tr key={key}>
                        <td>{value.ticketNumber}</td>
                        <td>${value.cost}</td>
                        <td>{value.eventid}</td>
                        <td>{value.seatNumber}</td>
                        <td>{value.seatRow}</td>
                        <td>{value.sectionNumber}</td>
                        <td><button onClick={toggleModal}>
                            SELECT
                            {/* this only chooses the last row ?? */}
                            <Modal show={modal} onClose={toggleModal}>
                                <>
                                    <h1>Ticket # {value.ticketNumber}</h1>
                                    <p>Cost: ${value.cost}</p>
                                    <p>Need to fix this toggle!</p>
                                </>
                            </Modal>
                        </button></td>
                    </tr>
                );
            })}
            </tbody>
        </table>
        {/*{tickets.map(ticket => (<TicketRow ticket={ticket}/>))}*/}
    </div>
  );
}

export default MyTickets;