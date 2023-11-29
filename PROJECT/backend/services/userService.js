const db = require("../db/db");

async function getAllUsers() {
    // Does not need sanitization
    return await db.getFromDB(`
        SELECT * FROM Customer
    `).then((res)=>res).catch((err)=>{
        console.log(err);
        return false;
    })

}

async function getUserTickets(userid, filter) {
    let sanUserID;
    try {
        sanUserID = parseInt(userid);
    } catch {
        return false;
    }

    let query = `
        SELECT Ticket.ticketid, Ticket.cost, Ticket.rownumber, Ticket.seatnumber, 
        Ticket.sectionnumber, Ticket.eventid, EVTable.eventname, EVTable.author,
        EVTable.venuename, EVTable.city, EVTable.starttime
        FROM Issued, Ticket, (
            SELECT Event.eventid, Holds.venueid, Event.eventname, Event.author, 
            Venue.venuename, Venue.city, Holds.starttime
            FROM Event, Holds, Venue
            WHERE 
                Event.eventid = Holds.eventid AND
                Holds.venueid = Venue.venueid
        ) EVTable
        WHERE
            Issued.userid = :userid AND
            Issued.ticketid = Ticket.ticketid AND
            Ticket.eventid = EVTable.eventid AND
            Ticket.venueid = EVTable.venueid`;

    if (filter) {
        query += ` AND ${filter}`;
    }

    return await db.getFromDB(query, [sanUserID]).then((res) => res).catch((err) => {
        console.log(err);
        return false;
    });
}

module.exports = {
    getUserTickets,
    getAllUsers
}