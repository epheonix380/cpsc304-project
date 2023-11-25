import './MyTickets.css'
import React, {useEffect, useState} from "react";
import Modal from "../Modal/Modal";


function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

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
            {tickets.map((value, key) => {
                return (
                    <tr key={key}>
                        <td>{value.ticketid}</td>
                        <td>${value.cost}</td>
                        <td>{value.eventid}</td>
                        <td>{value.seatnumber}</td>
                        <td>{value.rownumber}</td>
                        <td>{value.sectionnumber}</td>
                        <td><button onClick={toggleModal}>
                            SELECT
                            <Modal show={modal} onClose={toggleModal}>
                                <>
                                    <h1>Ticket # {value.ticketid}</h1>
                                    <p>Cost: ${value.cost}</p>
                                    <p>this only chooses the last row ??</p>
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