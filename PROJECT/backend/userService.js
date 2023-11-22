const db = require("./db");

async function createUser(name, city, password) {
    const pk = Math.floor(new Date().getTime()/1000)
    return await db.run(`
        insert into Customer 
        (userid, customername, city, password) values 
        (${pk}, '${name}', '${city}', '${password}')
    `).then((res)=>true).catch((err)=>false);
}

async function generateUserSession(uid, password, singleUse) {
    const userid = await db.run(`SELECT userid FROM Customer WHERE userid=${uid} AND password='${password}'`).then((res)=>res).catch(()=>false)
    if (userid !== false) {
        console.log(userid);
        const token = "wrgouhfebdw3frsvnaoenfgnaeonbigonrfesvdx"; // Implement random string generator
        const su = singleUse?1:0;
        const diff = 120;
        const expire = singleUse?new Date(Date.now() + diff*60000):null;
        return await db.run(`
            insert into CustomerSession 
            (userid, sessionToken, singleUse, expire) values 
            (${userid}, '${token}', ${su}, ${expire})
        `)
    }
}

async function getAuthUserInfo(sessionToken) {
    const res = await db.run(`
    SELECT Customer.userid, Customer.customername, Customer.city 
    FROM Customer, CustomerSession 
    WHERE Customer.userid = CustomerSession.userid 
    AND CustomerSession.sessionid = '${sessionToken}'
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

async function getUserTickets(userid) {
    return await db.getFromDB(`
        SELECT Ticket.ticketid, Ticket.rownumber, Ticket.seatnumber, 
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
            Issued.userid = ${parseInt(userid)} AND
            Issued.ticketid = Ticket.ticketid AND
            Ticket.eventid = EVTable.eventid AND
            Ticket.venueid = EVTable.venueid
    `).then((res)=>res).catch((err)=>{
        console.log(err);
        return false;
    })
}

module.exports = {
    getUserTickets,
    getAllUsers
}