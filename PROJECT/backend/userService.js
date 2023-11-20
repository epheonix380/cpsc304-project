const db = require("./db");

async function createUser(name, city, password) {
    const pk = Math.floor(new Date().getTime()/1000)
    return await db.run(`
        insert into Customer 
        (userID, name, city, password) values 
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
    SELECT Customer.userID, Customer.name, Customer.city 
    FROM Customer, CustomerSession 
    WHERE Customer.userID = CustomerSession.userID 
    AND CustomerSession.sessionID = '${sessionToken}'
    AND CustomerSession.singleUse <> -1`).then((res)=>res).catch(()=>false);

    return res
}

async function getUserTickets(userID) {
    console.log(parseInt(userID))
    return await db.getFromDB(`
        SELECT Ticket.ticketID, Ticket.rowNumber, Ticket.seatNumber, 
        Ticket.sectionNumber, Ticket.eventID, EVTable.eName, EVTable.author,
        EVTable.vName, EVTable.city, EVTable.startTime
        FROM Customer, UserTicket, Ticket, (
            SELECT Event.eventID, Event.name as eName, Event.author, 
            Venue.name as vName, Venue.city, EventVenue.startTime
            FROM Event, EventVenue, Venue
            WHERE 
                Event.eventID = EventVenue.eventID AND
                EventVenue.venueID = Venue.venueID
        ) as EVTable
        WHERE
            Customer.userID = ${parseInt(userID)} AND
            UserTicket.userID = Customer.userID AND
            UserTicket.ticketID = Ticket.ticketID AND
            Ticket.eventID = EVTable.eventID
    `).then((res)=>{
        console.log(res)
        return res;
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

module.exports = {
    getUserTickets,
}