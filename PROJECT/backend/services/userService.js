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

async function getUser(userid) {
    let sanUserID;
    try {
        sanUserID = parseInt(userid);
    } catch {
        return false;
    }

    let query = `
        SELECT * FROM Customer
        WHERE userid = :userid`;

    return await db.getFromDB(query, [sanUserID])
        .then((res) => res)
        .catch((err) => {
            console.log(err);
            return false;
        });
}

async function updateUserTicket(userid, username, name, city, password) {
    const re = /[a-zA-Z1-9]*/;
    let sanUsername, sanName, sanCity, sanPassword, sanUserid;
    console.log({
        userid, username, name, city, password
    })
    try {
        sanUserid = parseInt(userid);
        sanUsername = username.match(re)[0];
        sanName = name.match(re)[0];
        sanCity = city.match(re)[0];
        sanPassword = password.match(re)[0];
    } catch (e) { 
        console.log(e);
        console.log("Failed to sanitize")
        return false;
    }
    return await db.run(`
        UPDATE Customer
        SET username = \:username, customername = \:name, city = \:city, password = \:password
        WHERE userid = \:userid
    `, [sanUsername, sanName, sanCity, sanPassword, sanUserid])
}

async function deleteUser(userid) {
    let sanUserID;
    try {
        sanUserID = parseInt(userid);
    } catch {
        return false;
    }
    return await db.run(`
        DELETE FROM Customer
        WHERE userid = \:userid
    `, [sanUserID])

}

async function getUserTickets(userid, filter) {
    let sanUserID;
    try {
        sanUserID = parseInt(userid);
    } catch {
        return false;
    }

    // TODO: Selection

    let query = `
        SELECT Ticket.ticketid, Ticket.cost, Ticket.rownumber, Ticket.seatnumber, 
        Ticket.sectionnumber, Ticket.eventid, EVTable.eventname, EVTable.author,
        EVTable.venuename, EVTable.venueid, EVTable.city, EVTable.starttime
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

    return await db.getFromDB(query, [sanUserID])
        .then((res) => res)
        .catch((err) => {
            console.log(err);
            return false;
        });
}

module.exports = {
    getUserTickets,
    getUser,
    getAllUsers,
    updateUserTicket,
    deleteUser
}