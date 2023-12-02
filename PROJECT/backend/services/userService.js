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

async function deleteUser(userID) {
    let sanUserID;
    try {
        sanUserID = parseInt(userID);
    } catch {
        return false;
    }

    let query = `
        DELETE FROM Customer
        WHERE userid = :userid`;

    return await db.run(query, [sanUserID])
        .then((res) => {
            console.log("NO error in UserService");
            return {success: true, message: 'Delete successful'};
        })
        .catch((err) => {
            console.log("error in UserService");
            return {success: false, message: 'Delete failed', error: err.message};
        });
}


async function updateUser(userid, name, city, username, password) {
    const re = /^[a-zA-Z][a-zA-Z0-9 ]*$|^[0-9]+$/;
    let sanUserID, sanName, sanCity, sanUsername, sanPassword;
    try {
        sanUserID = parseInt(userid);
        if (!re.test(name)) {
            throw new Error('Invalid name');
        }
        sanName = name;
        if (!re.test(city)) {
            throw new Error('Invalid city');
        }
        sanCity = city;
        if (!re.test(username)) {
            throw new Error('Invalid username');
        }
        sanUsername = username;
        if (!re.test(password)) {
            throw new Error('Invalid password');
        }
        sanPassword = password;
    } catch(err) {
        return { success: false, message: 'Input validation failed', error: err.message };
    }

    let query = `
        UPDATE Customer
        SET customername = :name, city = :city, username = :username, password = :password
        WHERE userid = :userid`;

    return await db.run(query, [sanName, sanCity, sanUsername, sanPassword, sanUserID])
        .then((res) => {
            return {success: true, message: 'Update successful'};
        })
        .catch((err) => {
            return {success: false, message: 'Update failed', error: err.message};
        });
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
    updateUser,
    getAllUsers,
    deleteUser
}