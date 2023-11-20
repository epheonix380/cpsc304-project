const db = require("./db");

async function getEvents(orderBy="startTime") {
    const datetime = new Date(Date.now())
    const dateTimeString = `${datetime.getFullYear()}${datetime.getMonth()}${datetime.getDate()}`
    let order;
    switch(orderBy) {
        case "type":
            order = "Event.type"
            break;
        case "name":
            order = "Event.name"
            break;
        case "author":
            order = "Event.author"
            break;
        case "startTime":
            order = "EventVenue.startTime"
            break;
        case "venueName":
            order = "Venue.name"
            break;
        case "city":
            order = "Venue.city"
            break;
        default:
            order = "EventVenue.startTime"
            break;
    }
    return await db.getFromDB(`
        SELECT Event.eventID, Event.type, Event.name, 
        Event.author, Event.description, EventVenue.startTime, 
        Venue.venueID, Venue.name, Venue.city
        FROM Event, EventVenue, Venue
        WHERE Event.eventID = EventVenue.eventID AND
        EventVenue.venueID = Venue.venueID AND
        EventVenue.startTime > '${dateTimeString}'
        GROUP BY ${order}
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