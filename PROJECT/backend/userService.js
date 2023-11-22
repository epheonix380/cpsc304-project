const db = require("./db");

async function createUser(name, city, password) {
    const pk = Math.floor(new Date().getTime()/1000)
    return await db.run(`
        insert into Customer 
        (userID, customerName, city, password) values 
        (${pk}, '${name}', '${city}', '${password}')
    `).then((res)=>true).catch((err)=>false);
}

async function generateUserSession(uid, password, singleUse) {
    const userID = await db.run(`SELECT userID FROM Customer WHERE userID=${uid} AND password='${password}'`).then((res)=>res).catch(()=>false)
    if (userID !== false) {
        console.log(userID);
        const token = "wrgouhfebdw3frsvnaoenfgnaeonbigonrfesvdx"; // Implement random string generator
        const su = singleUse?1:0;
        const diff = 120;
        const expire = singleUse?new Date(Date.now() + diff*60000):null;
        return await db.run(`
            insert into CustomerSession 
            (userID, sessionToken, singleUse, expire) values 
            (${userID}, '${token}', ${su}, ${expire})
        `)
    }
}

async function getAuthUserInfo(sessionToken) {
    const res = await db.run(`
    SELECT Customer.userID, Customer.customerName, Customer.city 
    FROM Customer, CustomerSession 
    WHERE Customer.userID = CustomerSession.userID 
    AND CustomerSession.sessionID = '${sessionToken}'
    AND CustomerSession.singleUse <> -1`).then((res)=>res).catch(()=>false);

    return res
}

async function getAllUsers() {
    return await db.getFromDB(`
        SELECT * FROM Customer
    `).then((res)=>res).catch((err)=>{
        console.log(err);
        return false;
    })

}

async function getUserTickets(userID) {
    return await db.getFromDB(`
        SELECT Ticket.ticketID, Ticket.rowNumber, Ticket.seatNumber, 
        Ticket.sectionNumber, Ticket.eventID, EVTable.eventName, EVTable.author,
        EVTable.venueName, EVTable.city, EVTable.startTime
        FROM Issued, Ticket, (
            SELECT Event.eventID, Holds.venueID, Event.eventName, Event.author, 
            Venue.venueName, Venue.city, Holds.startTime
            FROM Event, Holds, Venue
            WHERE 
                Event.eventID = Holds.eventID AND
                Holds.venueID = Venue.venueID
        ) as EVTable
        WHERE
            Issued.userID = ${parseInt(userID)} AND
            Issued.ticketID = Ticket.ticketID AND
            Ticket.eventID = EVTable.eventID AND
            Ticket.venueID = EVTable.venueID
    `).then((res)=>res).catch((err)=>{
        console.log(err);
        return false;
    })
}

module.exports = {
    getUserTickets,
    getAllUsers
}