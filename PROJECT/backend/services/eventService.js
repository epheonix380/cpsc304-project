const db = require("../db/db");

async function getEvents(orderBy="starttime") {
    const datetime = new Date(Date.now())
    const datetimeString = `${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()}`
    let order;
    switch(orderBy) {
        case "type":
            order = "Event.type"
            break;
        case "eventname":
            order = "Event.eventname"
            break;
        case "author":
            order = "Event.author"
            break;
        case "starttime":
            order = "Holds.starttime"
            break;
        case "venuename":
            order = "Venue.venuename"
            break;
        case "city":
            order = "Venue.city"
            break;
        default:
            order = "Holds.starttime"
            break;
    }

    // TODO: Join

    // Here sanitization is not necessary as the inputs are guaranteed to be safe
    return await db.getFromDB(`
        SELECT Event.eventid, Event.type, Event.eventname, 
        Event.author, Event.description, Holds.starttime, 
        Venue.venueid, Venue.venuename, Venue.city
        FROM Event, Holds, Venue
        WHERE Event.eventid = Holds.eventid AND
        Holds.venueid = Venue.venueid AND
        Holds.starttime > ${db.getIsOracle()?"date":""} '${datetimeString}'
        ORDER BY ${order}
    `).then((res)=>res).catch((err)=>{
        console.log(err);
        return false
    })
}

async function multiCityTour() {

    // TODO: Aggregation with HAVING

    return await db.getFromDB(`
        SELECT Event.*
        FROM Event, (
            SELECT Event.eventid, COUNT(city) as count
            FROM Event, Holds, Venue
            WHERE Event.eventid = Holds.eventid AND
                Holds.venueid = Venue.venueid
            GROUP BY Event.eventid
            HAVING COUNT(city) > 1
        ) CTable
        WHERE CTable.eventid = Event.eventid
        
    `)
}

async function canadianTour() {

    // TODO: Division

    return await db.getFromDB(`
    SELECT Event.*
    FROM Event, (
        SELECT EP.eventid, COUNT(DISTINCT province) as count
        FROM (
            SELECT eventid, province
            FROM Holds, Venue, CityProvinceMap
            WHERE Holds.venueid = Venue.venueid AND
                Venue.city = CityProvinceMap.city) EP
        GROUP BY EP.eventid
        HAVING COUNT(province) >= (
            SELECT COUNT(*)
            FROM (SELECT DISTINCT province FROM CityProvinceMap))) EC
    WHERE Event.eventid = EC.eventid
    `)
}

async function popular() {

    // TODO: Division

    return await db.getFromDB(`
    SELECT Event.*
    FROM Event, (
        SELECT Holds.eventid, COUNT(*) as count
        FROM Holds, Issued, Ticket
        WHERE Holds.venueid = Ticket.venueid AND
            Ticket.eventid = Holds.eventid AND
            Holds.starttime = Ticket.starttime AND
            Ticket.ticketid = Issued.ticketid
        GROUP BY Holds.eventid) EC
    WHERE Event.eventid = EC.eventid AND
        count > (
            SELECT AVG(*)
            FROM Issued, Ticket
            WHERE Issued.ticketid = Ticket.ticketid
            GROUP BY Ticket.eventid
        )
        
    `)
}

async function getVenuesFromEventID(eventid) {
    const datetime = new Date(Date.now())
    const datetimeString = `${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDate()}`
    let sanEventID;
    try {
        sanEventID = parseInt(eventid);
    } catch {
        return false;
    }
    return await db.getFromDB(`
        SELECT Event.eventid, Event.type, Event.eventname, 
        Event.author, Event.description, Holds.starttime, 
        Venue.venueid, Venue.venuename, Venue.city
        FROM Event, Holds, Venue
        WHERE Event.eventid = Holds.eventid AND
        Holds.venueid = Venue.venueid AND
        Holds.starttime > ${db.getIsOracle()?"date":""} '${datetimeString}' AND
        Event.eventid = \:eventid
    `, [sanEventID]);
}

module.exports = {
    getEvents,
    canadianTour,
    multiCityTour,
    getVenuesFromEventID,
    popular
}