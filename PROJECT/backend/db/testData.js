const db = require("./db");

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

function insertCityProvinceMap(city, province) {
    return db.run(`
        INSERT INTO CityProvinceMap (city, province) values ('${city}', '${province}')
    `)
}

function insertCustomer(userid, name, city, username, password) {
    return db.run(`
        INSERT INTO Customer 
            (userid, username, customername, city, password) values
            (${userid}, '${name+userid}', '${name}', '${city}', '${password}')
    `)
}

function insertVendor(vendorid, name) {
    return db.run(`
        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (${vendorid}, '${name}')
    `)
}

function insertVenue(venueid, vendorid, name, city) {
    return db.run(`
        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (${venueid}, ${vendorid}, '${name}', '${city}')
    `)
}

function insertEvent(eventid, type, name, author, description) {
    return db.run(`
        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (${eventid}, '${type}', '${name}', '${author}', '${description}')
    `)
}

function insertHolds(eventid, venueid, startTime) {
    return db.run(`
        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (${eventid}, ${venueid}, ${db.getIsOracle()?"date":""} '${startTime}')
    `)
}

function insertSection( eventid, venueid, sectionnumber, numberOfSeats, type) {
    return db.run(`
        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (${eventid}, ${venueid},${sectionnumber}, ${numberOfSeats}, '${type}')
    `)
}

function insertTicket( eventid, venueid, sectionnumber, cost, rownumber, seatnumber, id) {
    return db.run(`
        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (${id}, ${cost}, ${rownumber}, ${seatnumber}, ${eventid}, ${venueid},${sectionnumber})
    `)
}

function insertIssued(ticketid, userid, attended=0) {
    return db.run(`
        INSERT INTO Issued
            (ticketid, userid, attended) values
            (${ticketid}, ${userid}, ${attended})
    `)
}

function insertConcession(name, price, specifier) {
    return db.run(`
        INSERT INTO Concession
            (itemname, price, specifier) values
            ('${name}', ${price}, '${specifier}')
    `)
}

function insertConcessionsVenue(name, venueid, specifier) {
    return db.run(`
        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('${name}', ${venueid}, '${specifier}')
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
        await insertCustomer(1, "John", "Vancouver", "johnuser", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(2, "Sarah", "Calgary", "sarahuser", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(3, "Peter", "Toronto", "peteruser", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(4, "Bella", "Montreal", "bellauser", "12345").catch((err)=>console.log(`Customer: ${err}`));
        await insertCustomer(5, "Bob", "Victoria", "bobuser", "12345").catch((err)=>console.log(`Customer: ${err}`));


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
        await insertHolds(1, 1, "2023-11-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 3, "2024-01-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 5, "2024-02-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 7, "2024-03-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(1, 9, "2024-04-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 2, "2023-11-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 4, "2024-01-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 6, "2024-02-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 8, "2024-03-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(2, 10, "2023-04-11").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(5, 1, "2024-11-12").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(5, 3, "2024-12-12").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(6, 3, "2024-01-12").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(7, 5, "2024-02-12").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(3, 7, "2024-03-12").catch((err)=>console.log(`Holds: ${err}`));
        await insertHolds(4, 9, "2024-04-12").catch((err)=>console.log(`Holds: ${err}`));
        

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
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(1, 1, 1, 100+delta, 1,i, id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(1, 3, 1, 100+delta, 1,i, id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(1, 5, 1, 100+delta, 1,i ,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(1, 7, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(1, 9, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(2, 2, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(2, 4, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(2, 6, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(2, 8, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(2, 10, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(5, 1, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(6, 3, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(7, 5, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(3, 7, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*10)*10;
            await insertTicket(4, 9, 1, 100+delta, 1,i,id).catch((err)=>console.log(`Ticket: ${err}`));
            id++
        }


        // INSERT Issued
        // Tickets are randomly Issued, do not expect the same tickets to be issued to the same user
        for (let i = 0; i<10; i++) {
            const delta = Math.floor(Math.random()*5);
            await insertIssued(10*i+delta, (i%5)+1).catch((err)=>console.log(`Ticket: ${err}`));
        }
        await insertIssued(101, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(102, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(103, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(104, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(105, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(106, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(107, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(108, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(109, 1, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(110, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(111, 1).catch((err)=>console.log(`Ticket: ${err}`));
        await insertIssued(112, 1).catch((err)=>console.log(`Ticket: ${err}`));






        // INSERT Concession
        await insertConcession("Coke", 5.00, "S")
        await insertConcession("Coke", 7.50, "M")
        await insertConcession("Coke", 10.00, "L")
        await insertConcession("Fanta", 5.00, "S")
        await insertConcession("Fanta", 7.50, "M")
        await insertConcession("Fanta", 10.00, "L")
        await insertConcession("Sprite", 5.00, "S")
        await insertConcession("Sprite", 7.50, "M")
        await insertConcession("Sprite", 10.00, "L")
        await insertConcession("Water", 5.00, "S")
        await insertConcession("Water", 7.50, "M")
        await insertConcession("Water", 10.00, "L")
        await insertConcession("Popcorn", 10.00, "N")
        await insertConcession("Chips", 5.00, "N")
        await insertConcession("Candy", 5.00, "N")
        await insertConcession("Hotdog", 10.00, "N")
        await insertConcession("Hotdog", 15.00, "Y")
        await insertConcession("Hamburger", 10.00, "N")
        await insertConcession("Hamburger", 15.00, "Y")

        // INSERT ConcessionVenue

        await insertConcessionsVenue("Coke", 1, "S");
        await insertConcessionsVenue("Coke", 1, "M");
        await insertConcessionsVenue("Coke", 1, "L");

        await insertConcessionsVenue("Fanta", 1, "S");
        await insertConcessionsVenue("Fanta", 1, "M");
        await insertConcessionsVenue("Fanta", 1, "L");

        await insertConcessionsVenue("Sprite", 1, "S");
        await insertConcessionsVenue("Sprite", 1, "M");
        await insertConcessionsVenue("Sprite", 1, "L");

        await insertConcessionsVenue("Water", 1, "S");
        await insertConcessionsVenue("Water", 1, "M");
        await insertConcessionsVenue("Water", 1, "L");

        await insertConcessionsVenue("Popcorn", 1, "N");
        await insertConcessionsVenue("Chips", 1, "N");
        await insertConcessionsVenue("Candy", 1, "N");

        await insertConcessionsVenue("Hotdog", 1, "N");
        await insertConcessionsVenue("Hotdog", 1, "Y");

        await insertConcessionsVenue("Hamburger", 1, "N");
        await insertConcessionsVenue("Hamburger", 1, "Y");
        
        await insertConcessionsVenue("Coke", 2, "S");
        await insertConcessionsVenue("Coke", 2, "M");
        await insertConcessionsVenue("Coke", 2, "L");
        await insertConcessionsVenue("Fanta", 2, "S");
        await insertConcessionsVenue("Fanta", 2, "M");
        await insertConcessionsVenue("Fanta", 2, "L");
        await insertConcessionsVenue("Sprite", 2, "S");
        await insertConcessionsVenue("Sprite", 2, "M");
        await insertConcessionsVenue("Sprite", 2, "L");
        await insertConcessionsVenue("Water", 2, "M");
        await insertConcessionsVenue("Popcorn", 2, "N");
        await insertConcessionsVenue("Chips", 2, "N");
        await insertConcessionsVenue("Candy", 2, "N");
        await insertConcessionsVenue("Hotdog", 2, "N");
        await insertConcessionsVenue("Hamburger", 2, "N");

        await insertConcessionsVenue("Coke", 3, "S");
        await insertConcessionsVenue("Coke", 3, "M");
        await insertConcessionsVenue("Coke", 3, "L");
        await insertConcessionsVenue("Sprite", 3, "S");
        await insertConcessionsVenue("Sprite", 3, "M");
        await insertConcessionsVenue("Sprite", 3, "L");
        await insertConcessionsVenue("Popcorn", 3, "N");
        await insertConcessionsVenue("Candy", 3, "N");
        await insertConcessionsVenue("Hamburger", 3, "N");

        await insertConcessionsVenue("Fanta", 4, "S");
        await insertConcessionsVenue("Fanta", 4, "M");
        await insertConcessionsVenue("Fanta", 4, "L");
        await insertConcessionsVenue("Water", 4, "L");
        await insertConcessionsVenue("Chips", 4, "N");
        await insertConcessionsVenue("Hotdog", 4, "N");

        await insertConcessionsVenue("Popcorn", 5, "N");
        await insertConcessionsVenue("Chips", 5, "N");
        await insertConcessionsVenue("Candy", 5, "N");
        await insertConcessionsVenue("Hotdog", 5, "N");
        await insertConcessionsVenue("Hamburger", 5, "N");

        await insertConcessionsVenue("Coke", 6, "S");
        await insertConcessionsVenue("Coke", 6, "M");
        await insertConcessionsVenue("Coke", 6, "L");
        await insertConcessionsVenue("Fanta", 6, "S");
        await insertConcessionsVenue("Fanta", 6, "M");
        await insertConcessionsVenue("Fanta", 6, "L");
        await insertConcessionsVenue("Sprite", 6, "S");
        await insertConcessionsVenue("Sprite", 6, "M");
        await insertConcessionsVenue("Sprite", 6, "L");
        await insertConcessionsVenue("Water", 6, "S");

        await insertConcessionsVenue("Coke", 7, "S");
        await insertConcessionsVenue("Coke", 7, "M");
        await insertConcessionsVenue("Coke", 7, "L");
        await insertConcessionsVenue("Fanta", 7, "S");
        await insertConcessionsVenue("Fanta", 7, "M");
        await insertConcessionsVenue("Fanta", 7, "L");
        await insertConcessionsVenue("Sprite", 7, "S");
        await insertConcessionsVenue("Sprite", 7, "M");
        await insertConcessionsVenue("Sprite", 7, "L");
        await insertConcessionsVenue("Water", 7, "M");
        await insertConcessionsVenue("Popcorn", 7, "N");
        await insertConcessionsVenue("Chips", 7, "N");
        await insertConcessionsVenue("Candy", 7, "N");

        await insertConcessionsVenue("Water", 8, "S");
        await insertConcessionsVenue("Water", 8, "M");
        await insertConcessionsVenue("Water", 8, "L");

        await insertConcessionsVenue("Water", 9, "S");

        resolve(true);

    })
}

module.exports = {
    insertData,
}
