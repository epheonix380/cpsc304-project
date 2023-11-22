const db = require("./db");

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

function insertCityProvinceMap(city, province) {
    return db.run(`
        INSERT INTO CityProvinceMap (city, province) values ('${city}', '${province}')
    `)
}

function insertCustomer(userID, name, city, password) {
    return db.run(`
        INSERT INTO Customer 
            (userID, customerName, city, password) values
            (${userID}, '${name}', '${city}', '${password}')
    `)
}

function insertVendor(vendorID, name) {
    return db.run(`
        INSERT INTO Vendor 
            (vendorID, vendorName) values
            (${vendorID}, '${name}')
    `)
}

function insertVenue(venueID, vendorID, name, city) {
    return db.run(`
        INSERT INTO Venue 
            (venueID, vendorID, venueName, city) values
            (${venueID}, ${vendorID}, '${name}', '${city}')
    `)
}

function insertEvent(eventID, type, name, author, description) {
    return db.run(`
        INSERT INTO Event 
            (eventID, type, eventName, author, description) values
            (${eventID}, '${type}', '${name}', '${author}', '${description}')
    `)
}

function insertHolds(eventID, venueID, startTime) {
    return db.run(`
        INSERT INTO Holds 
            (eventID, venueID, startTime) values
            (${eventID}, ${venueID}, date '${startTime}')
    `)
}

function insertSection( eventID, venueID, sectionNumber, numberOfSeats, type) {
    return db.run(`
        INSERT INTO Section 
            (eventID, venueID, sectionNumber, numberOfSeats, type) values
            (${eventID}, ${venueID},${sectionNumber}, ${numberOfSeats}, '${type}')
    `)
}

function insertTicket( eventID, venueID, sectionNumber, cost, rowNumber, seatNumber, id) {
    return db.run(`
        INSERT INTO Ticket
            (ticketID, cost, rowNumber, seatNumber, eventID, venueID, sectionNumber) values
            (${id}, ${cost}, ${rowNumber}, ${seatNumber}, ${eventID}, ${venueID},${sectionNumber})
    `)
}

function insertIssued(ticketID, userID) {
    return db.run(`
        INSERT INTO Issued
            (ticketID, userID) values
            (${ticketID}, ${userID})
    `)
}

async function insertData() {
    return await new Promise(async(resolve, reject)=>{
        let id = 1;


        // Insert CityProvinceMap
        await insertCityProvinceMap("Vancouver", "British Columbia").catch((err)=>console.log(`CityProvinceMap: ${err}`))
        await insertCityProvinceMap("Calgary", "Alberta").catch((err)=>console.log(`CityProvinceMap: ${err}`))
        await insertCityProvinceMap("Toronto", "Ontario").catch((err)=>console.log(`CityProvinceMap: ${err}`))
        await insertCityProvinceMap("Montreal", "Quebec").catch((err)=>console.log(`CityProvinceMap: ${err}`))
        await insertCityProvinceMap("Victoria", "British Columbia").catch((err)=>console.log(`CityProvinceMap: ${err}`))
        
        
        // Insert Customer
        await insertCustomer(1, "John", "Vancouver", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(2, "Sarah", "Calgary", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(3, "Peter", "Toronto", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(4, "Bella", "Montreal", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(5, "Bob", "Victoria", "12345").catch((err)=>console.log(`Customer: ${err}`));


        // Insert Vendor
        await insertVendor(1, "Vendor 1").catch((err)=>console.log(`Vendor: ${err}`));
        await insertVendor(2, "Vendor 2").catch((err)=>console.log(`Vendor: ${err}`));
        await insertVendor(3, "Vendor 3").catch((err)=>console.log(`Vendor: ${err}`));
        await insertVendor(4, "Vendor 4").catch((err)=>console.log(`Vendor: ${err}`));
        await insertVendor(5, "Vendor 5").catch((err)=>console.log(`Vendor: ${err}`));


        // Insert Venue
        await insertVenue(1, 1, "Rogers Arena", "Vancouver").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(2, 1, "BC Place", "Vancouver").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(3, 2, "Scotiabank Saddledome", "Calgary").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(4, 2, "Calgary Event Centre", "Calgary").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(5, 3, "Rogers Centre", "Toronto").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(6, 3, "Scotiabank Arena", "Toronto").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(7, 4, "Centre Bell", "Montreal").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(8, 4, "Place Bell", "Montreal").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(9, 5, "The Q Centre Arena", "Victoria").catch((err)=>console.log(`Venue: ${err}`));
        await insertVenue(10, 5, "Save-On-Foods Memorial Centre", "Victoria").catch((err)=>console.log(`Venue: ${err}`));


        // Insert Event
        await insertEvent(1, "CNCRT", "Eras Tour", "Taylor Swift", "I heard its good").catch((err)=>console.log(`Event: ${err}`));
        await insertEvent(2, "CNCRT", "Coldplay Tour", "Coldplay", "I heard its good").catch((err)=>console.log(`Event: ${err}`));
        await insertEvent(3, "MUSCL", "Hadestown", "Anais Mitchell", "Lots of music").catch((err)=>console.log(`Event: ${err}`));
        await insertEvent(4, "MUSCL", "Hamilton", "Lin-Manuel Miranda", "Lots of music").catch((err)=>console.log(`Event: ${err}`));
        await insertEvent(5, "HOCKY", "Canucks Game", "NHL", "Lots of hockey").catch((err)=>console.log(`Event: ${err}`));
        await insertEvent(6, "HOCKY", "Not canucks game", "NHL", "Lots of hockey").catch((err)=>console.log(`Event: ${err}`));
        await insertEvent(7, "BSBLL", "Some baseball game", "Baseball", "Lots of baseballs").catch((err)=>console.log(`Event: ${err}`));


        // Insert Holds
        await insertHolds(1, 1, "2023-11-04").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 3, "2024-01-04").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 5, "2024-02-04").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 7, "2024-03-04").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 9, "2024-04-04").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 2, "2023-11-06").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 4, "2024-01-06").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 6, "2024-02-06").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 8, "2024-03-06").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 10, "2024-04-06").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(5, 1, "2023-11-10").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(6, 3, "2024-01-10").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(7, 5, "2024-02-10").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(3, 7, "2024-03-10").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(4, 9, "2024-04-10").catch((err)=>console.log(`Holds: ${err}`));
        

        // INSERT Section
        await insertSection(1, 1, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(1, 3, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(1, 5, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(1, 7, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(1, 9, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(2, 2, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(2, 4, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(2, 6, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(2, 8, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(2, 10, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(5, 1, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(6, 3, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(7, 5, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(3, 7, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        await insertSection(4, 9, 1, 10, "STAND").catch((err)=>console.log(`Section: ${err}`));
        

        // INSERT TICKET
        for (let i = 0; i<10; i++) {
            await insertTicket(1, 1, 1, 100, 1,i, id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(1, 3, 1, 100, 1,i, id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(1, 5, 1, 100, 1,i ,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(1, 7, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(1, 9, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(2, 2, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(2, 4, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(2, 6, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(2, 8, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(2, 10, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(5, 1, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(6, 3, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(7, 5, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(3, 7, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            await insertTicket(4, 9, 1, 100, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }


        // INSERT Issued
        // Tickets are randomly Issued, do not expect the same tickets to be issued to the same user
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*5);
            await insertIssued(10*i+delta, (i%5)+1).catch((err)=>console.log(`Ticket: ${err}`));
        }
        resolve(true);

    })
}

module.exports = {
    insertData,
}
