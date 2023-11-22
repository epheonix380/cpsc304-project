const db = require("./db");

async function getEvents(orderBy="starttime") {
    const datetime = new Date(Date.now())
    const datetimeString = `${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDate()}`
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

async function getSection(eventid, venueid, amount) {
    return await db.getFromDB(`
        SELECT Ticket.* 
        FROM Ticket, (
            SELECT sectionnumber, eventid, venueid
            FROM
                (SELECT Ticket.sectionnumber, Ticket.eventid, Ticket.venueid,
                    COUNT(*) as amount, Section.numberofseats
                    FROM Ticket, Issued, Section
                    WHERE 
                        Ticket.ticketid = Issued.ticketid AND
                        Ticket.eventid = ${eventid} AND
                        Ticket.venueid = ${venueid} AND
                        Section.eventid = Ticket.eventid AND
                        Section.venueid = Ticket.venueid AND
                        Section.sectionnumber = Ticket.sectionnumber
                    GROUP BY Ticket.sectionnumber
                    ) SectionAgr
            WHERE (numberofseats - amount) >= ${amount}
        ) Sections
        WHERE 
            Ticket.sectionnumber = Sections.sectionnumber AND
            Ticket.eventid = Sections.eventid AND
            Ticket.venueid = Sections.venueid AND
            Ticket.ticketid NOT IN (
                SELECT Ticket.ticketid
                FROM Ticket, Issued
                WHERE 
                    Ticket.ticketid = Issued.ticketid AND
                    Ticket.eventid = ${eventid} AND
                    Ticket.venueid = ${venueid}
            )
    `)
}

async function purchaseTicket(userid, list) {
    const successList = [];
    for (let i = 0; i<list.length; i++) {
        await db.run(`
            INSERT INTO Issued 
                (ticketid, userid) values
                (${list[i]}, ${userid})

        `).then(()=>{
            successList.push(list[i])
        }).catch(()=>{})
    }
    return successList;

}

module.exports = {
    getEvents,
    purchaseTicket,
    getSection
}