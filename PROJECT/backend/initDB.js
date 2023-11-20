async function initDEMOTABLE(db) {

    return db.run(`
    CREATE TABLE DEMOTABLE (
        id NUMBER PRIMARY KEY,
        name VARCHAR2(20)
    )
`);

}

async function dropDEMOTABLE(db) {
    return db.run(`DROP TABLE IF EXISTS DEMOTABLE`);
}

async function initVenue(db) {

    return db.run(`
            CREATE TABLE Venue
                (venueID INTEGER PRIMARY KEY,
                vendorID INTEGER,
                name VARCHAR(30),
                city VARCHAR(30),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city),
                FOREIGN KEY (vendorID) REFERENCES Vendor(vendorID)
                )
        `);

}

async function dropVenue(db) {
    return db.run(`DROP TABLE IF EXISTS Venue`);
}

async function initSection(db) {

    return db.run(`
            CREATE TABLE Section
                (sectionNumber INTEGER,
                eventID INTEGER,
                numberOfSeats INTEGER,
                type CHAR(5),
                PRIMARY KEY (sectionNumber, eventID)
                FOREIGN KEY (eventID) REFERENCES Event(eventID)
                )
        `);

}

async function dropSection(db) {
    return db.run(`DROP TABLE IF EXISTS Section`);
}

async function initSeat(db) {
    return db.run(`
        CREATE TABLE Seat
            (sectionNumber INTEGER,
            eventID INTEGER,
            rowNumber INTEGER,
            seatNumber INTEGER,
            PRIMARY KEY (sectionNumber, eventID, seatNumber, rowNumber),
            FOREIGN KEY (sectionNumber, eventID) REFERENCES Section(sectionNumber, eventID) ON DELETE CASCADE
            )
    `)
}

async function dropSeat(db) {
    return db.run(`DROP TABLE IF EXISTS Seat`);
}

async function initCityProvinceMap(db) {

    return db.run(`
            CREATE TABLE CityProvinceMap
                (city VARCHAR(30) PRIMARY KEY,
                province VARCHAR(30)
                )
        `);

}

async function dropCityProvinceMapt(db) {
    return db.run(`DROP TABLE IF EXISTS CityProvinceMap`);
}

async function initCustomer(db) {

    return db.run(`
            CREATE TABLE Customer
                (userID INTEGER PRIMARY KEY,
                name VARCHAR(30),
                city VARCHAR(30),
                password VARCHAR(64),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city)
                )
        `);

}

async function dropCustomer(db) {
    return db.run(`DROP TABLE IF EXISTS Customer`);
}

async function initCustomerSession(db) {

    return db.run(`
            CREATE TABLE CustomerSession
                (userID INTEGER,
                sessionToken VARCHAR(32) PRIMARY KEY,
                singleUse NUMBER(1),
                expire TIMESTAMP,
                FOREIGN KEY (userID) REFERENCES Customer(userID)
                )
        `);

}

async function dropCustomerSession(db) {
    return db.run(`DROP TABLE IF EXISTS CustomerSession`)
}

async function dropCustomer(db) {
    return db.run(`DROP TABLE IF EXISTS Customer`);
}

async function initVendor(db) {

    return db.run(`
            CREATE TABLE Vendor 
                (vendorID INTEGER PRIMARY KEY,
                name VARCHAR(30)
                )
        `);

}

async function dropVendor(db) {
    return db.run(`DROP TABLE IF EXISTS Vendor`);
}

async function initConcessions(db) {

    return db.run(`
        CREATE TABLE Concession 
            (itemName VARCHAR(30) PRIMARY KEY,
            price DECIMAL(10, 2),
            specifier CHAR(1)
            )
    `);
   
}

async function dropConcession(db) {
    return db.run(`DROP TABLE IF EXISTS Concession`);
}

async function initConcessionsVenue(db) {

    return db.run(`
        CREATE TABLE ConcessionVenue
            (itemName VARCHAR(30),
            venueID INTEGER,
            PRIMARY KEY (itemName, venueID),
            FOREIGN KEY (itemName) REFERENCES Concession(itemName),
            FOREIGN KEY (venueID) REFERENCES Venue(venueID)
            )
    `);
}

async function dropConcessionVenue(db) {
    return db.run(`DROP TABLE IF EXISTS ConcessionVenue`);
}

async function initEvent(db) {

    return db.run(`
        CREATE TABLE Event
            (eventID INTEGER PRIMARY KEY,
            type VARCHAR(30),
            name VARCHAR(30),
            author VARCHAR(32),
            description VARCHAR(2048)
            )
    `);
   
}

async function dropEvent(db) {
    return db.run(`DROP TABLE IF EXISTS Event`);
}

async function initEventVenue(db) {

    return db.run(`
        CREATE TABLE EventVenue
            (eventID INTEGER,
            venueID INTEGER,
            startTime TIMESTAMP,
            PRIMARY KEY (eventID, venueID),
            FOREIGN KEY (eventID) REFERENCES Event(eventID),
            FOREIGN KEY (venueID) REFERENCES Venue(venueID)
            )
    `);
}

async function dropEventVenue(db) {
    return db.run(`DROP TABLE IF EXISTS EventVenue`);
}

async function initTicket(db) {
    return db.run(`
        CREATE TABLE Ticket
            (ticketID INTEGER PRIMARY KEY,
            cost DECIMAL(10, 2),
            rowNumber INTEGER,
            seatNumber INTEGER,
            eventID INTEGER, 
            sectionNumber INTEGER,
            FOREIGN KEY (seatNumber,eventID,sectionNumber,rowNumber) REFERENCES Seat(seatNumber,eventID,sectionNumber,rowNumber)
            )
    `)
}

async function dropTicket(db) {
    return db.run(`DROP TABLE IF EXISTS Ticket`);
}

async function initUserTicket(db) {
    return db.run(`
        CREATE TABLE UserTicket
            (ticketID INTEGER,
            userID INTEGER,
            PRIMARY KEY (ticketID, userID),
            FOREIGN KEY (ticketID) REFERENCES Ticket(ticketID),
            FOREIGN KEY (userID) REFERENCES Customer(userID)
            )
    `)
}

async function dropUserTicket(db) {
    return db.run(`DROP TABLE IF EXISTS UserTicket`)
}

async function dropEvents(db) {
    return db.run(`DROP TABLE IF EXISTS Events`)
}

async function dropSection_Seat(db) {
    return db.run(`DROP TABLE IF EXISTS Section_Seat`)
}

async function initAll(db) {
    const promises = [
        initDEMOTABLE(db),
        initSection(db),
        initSeat(db),
        initVenue(db),
        initCityProvinceMap(db),
        initVendor(db),
        initConcessions(db),
        initConcessionsVenue(db),
        initCustomer(db),
        initEvent(db),
        initEventVenue(db),
        initTicket(db),
        initUserTicket(db),
        initCustomerSession(db),
    ]
    return Promise.all(promises);
}

async function dropAll(db) {
    const promises = [
        dropDEMOTABLE(db),
        dropSection(db),
        dropVenue(db),
        dropCityProvinceMapt(db),
        dropConcession(db),
        dropConcessionVenue(db),
        dropCustomer(db),
        dropEventVenue(db),
        dropEvent(db),
        dropSeat(db),
        dropSection_Seat(db),
        dropVendor(db),
        dropTicket(db),
        dropUserTicket(db),
        dropEvents(db),
        dropCustomerSession(db),
        
    ]
    return Promise.all(promises);

}

async function resetAll(db) {

    return await dropAll(db).then(async()=>{
        const res = await initAll(db).then(()=>true).catch((err)=>{
            console.log(err);
            return false;
        });
        console.log(res)
        return res
    }).catch((err)=>{
        console.log(err);
        return false;
    })


}

module.exports = {
    initAll,
    dropAll,
    resetAll,
}