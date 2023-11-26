const db = require("../db/db");

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

module.exports = {
    getEvents
}