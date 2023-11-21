const db = require("./db");

async function getEvents(orderBy="startTime") {
    const datetime = new Date(Date.now())
    const dateTimeString = `${datetime.getFullYear()}${datetime.getMonth()}${datetime.getDate()}`
    let order;
    switch(orderBy) {
        case "type":
            order = "Event.type"
            break;
        case "eName":
            order = "Event.name"
            break;
        case "author":
            order = "Event.author"
            break;
        case "startTime":
            order = "Holds.startTime"
            break;
        case "vName":
            order = "Venue.name"
            break;
        case "city":
            order = "Venue.city"
            break;
        default:
            order = "Holds.startTime"
            break;
    }
    return await db.getFromDB(`
        SELECT Event.eventID, Event.type, Event.name, 
        Event.author, Event.description, Holds.startTime, 
        Venue.venueID, Venue.name, Venue.city
        FROM Event, Holds, Venue
        WHERE Event.eventID = Holds.eventID AND
        Holds.venueID = Venue.venueID AND
        Holds.startTime > '${dateTimeString}'
        ORDER BY ${order}
    `).then((res)=>res).catch((err)=>{
        console.log(err);
        return false
    })
}

async function getSection(eventID, venueID, amount) {

}

async function purchaseTicket(eventID, venueID, map) {

    db.getFromDB(`
        SELECT * FROM Section WHERE 
    `)

}

module.exports = {
    getEvents,
    purchaseTicket,
}