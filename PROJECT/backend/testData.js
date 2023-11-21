const db = require("./db");

function insertCityProvinceMap(city, province) {
    return db.run(`
        INSERT INTO CityProvinceMap (city, province) values ('${city}', '${province}')
    `)
}

function insertCustomer(userID, name, city, password) {
    return db.run(`
        INSERT INTO Customer 
            (userID, name, city, password) values
            (${userID}, '${name}', '${city}', '${password}')
    `)
}

function insertVendor(vendorID, name) {
    return db.run(`
        INSERT INTO Vendor 
            (vendorID, name) values
            (${vendorID}, '${name}')
    `)
}

function insertVenue(venueID, vendorID, name, city) {
    return db.run(`
        INSERT INTO Venue 
            (venueID, vendorID, name, city) values
            (${venueID}, ${vendorID}, '${name}', '${city}')
    `)
}

function insertEvent(eventID, type, name, author, description) {
    return db.run(`
        INSERT INTO Event 
            (eventID, type, name, author, description) values
            (${eventID}, '${type}', '${name}', '${author}', '${description}')
    `)
}

function insertHolds(eventID, venueID, startTime) {
    return db.run(`
        INSERT INTO Holds 
            (eventID, venueID, startTime) values
            (${eventID}, ${venueID}, '${startTime}')
    `)
}

function insertSection(sectionNumber, eventID, venueID, numberOfSeats, type) {
    return db.run(`
        INSERT INTO Section 
            (eventID, venueID, sectionNumber, numberOfSeats, type) values
            (${eventID}, ${venueID},${sectionNumber}, ${numberOfSeats}, '${type}')
    `)
}

function insertTicket(ticketID, cost, rowNumber, setNumber, eventID, sectionNumber) {
    return db.run(`
        INSERT INTO Ticket
            (ticketID, cost, rowNumber, setNumber, eventID, sectionNumber) values
            (${ticketID}, ${cost}, ${rowNumber}, ${setNumber}, ${eventID}, ${sectionNumber})
    `)
}

async function insertData() {
    const promises = [
        // Insert CityProvinceMap
        insertCityProvinceMap("Vancouver", "British Columbia"),
        insertCityProvinceMap("Calgary", "Alberta"),
        insertCityProvinceMap("Toronto", "Ontario"),
        insertCityProvinceMap("Montreal", "Quebec"),
        insertCityProvinceMap("Victoria", "British Columbia"),

        // Insert Customer
        insertCustomer(1, "John", "Vancouver", "12345"),
        insertCustomer(2, "Sarah", "Calgery", "12345"),
        insertCustomer(3, "Peter", "Toronto", "12345"),
        insertCustomer(4, "Bella", "Montreal", "12345"),
        insertCustomer(5, "Bob", "Victoria", "12345"),

        // Insert Vendor
        insertVendor(1, "Vendor 1"),
        insertVendor(2, "Vendor 2"),
        insertVendor(3, "Vendor 3"),
        insertVendor(4, "Vendor 4"),
        insertVendor(5, "Vendor 5"),

        // Insert Venue
        insertVenue(1, 1, "Rogers Arena", "Vancouver"),
        insertVenue(2, 1, "BC Place", "Vancouver"),
        insertVenue(3, 2, "Scotiabank Saddledome", "Calgary"),
        insertVenue(4, 2, "Calgary Event Centre", "Calgary"),
        insertVenue(5, 3, "Rogers Centre", "Toronto"),
        insertVenue(6, 3, "Scotiabank Arena", "Toronto"),
        insertVenue(7, 4, "Centre Bell", "Montreal"),
        insertVenue(8, 4, "Place Bell", "Montreal"),
        insertVenue(9, 5, "The Q Centre Arena", "Victoria"),
        insertVenue(10, 5, "Save-On-Foods Memorial Centre", "Victoria"),

        // Insert Event
        insertEvent(1, "CNCRT", "Eras Tour", "Taylor Swift", "I heard its good"),
        insertEvent(2, "CNCRT", "Coldplay Tour", "Coldplay", "I heard its good"),
        insertEvent(3, "MUSCL", "Hadestown", "Anais Mitchell", "Lots of music"),
        insertEvent(4, "MUSCL", "Hamilton", "Lin-Manuel Miranda", "Lots of music"),
        insertEvent(5, "HOCKY", "Canucks Game", "NHL", "Lots of hockey"),
        insertEvent(6, "HOCKY", "Not canucks game", "NHL", "Lots of hockey"),
        insertEvent(7, "BSBLL", "Some baseball game", "Baseball", "Lots of baseballs"),

        // Insert Holds
        insertHolds(1, 1, "20231204"),
        insertHolds(1, 3, "20240104"),
        insertHolds(1, 5, "20240204"),
        insertHolds(1, 7, "20240304"),
        insertHolds(1, 9, "20240404"),
        insertHolds(2, 2, "20231206"),
        insertHolds(2, 4, "20240106"),
        insertHolds(2, 6, "20240206"),
        insertHolds(2, 8, "20240306"),
        insertHolds(2, 10, "20240406"),
        insertHolds(5, 1, "20231218"),
        insertHolds(6, 3, "20240118"),
        insertHolds(7, 5, "20240218"),
        insertHolds(3, 7, "20240318"),
        insertHolds(4, 9, "20240418"),
        

        // INSERT Section
        insertSection(1, 1, 1, 100, "STAND"),
        insertSection(1, 3, 1, 100, "STAND"),
        insertSection(1, 5, 1, 100, "STAND"),
        insertSection(1, 7, 1, 100, "STAND"),
        insertSection(1, 9, 1, 100, "STAND"),
        insertSection(2, 2, 1, 100, "STAND"),
        insertSection(2, 4, 1, 100, "STAND"),
        insertSection(2, 6, 1, 100, "STAND"),
        insertSection(2, 8, 1, 100, "STAND"),
        insertSection(2, 10, 1, 100, "STAND"),
        insertSection(5, 1, 1, 100, "STAND"),
        insertSection(6, 3, 1, 100, "STAND"),
        insertSection(7, 5, 1, 100, "STAND"),
        insertSection(3, 7, 1, 100, "STAND"),
        insertSection(4, 9, 1, 100, "STAND"),
        


    ]
    return await Promise.all(promises).then((res)=>res).catch(
        (err)=>{
            console.log(err);
            return false
        }
    );
}

module.exports = {
    insertData,
}
