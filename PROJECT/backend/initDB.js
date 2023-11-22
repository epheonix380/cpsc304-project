const insertData = require("./testData")

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
                venueName VARCHAR(30),
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
                venueID INTEGER,
                numberOfSeats INTEGER,
                type CHAR(5),
                PRIMARY KEY (sectionNumber, eventID, venueID),
                FOREIGN KEY (eventID, venueID) REFERENCES Holds(eventID, venueID)
                )
        `);

}

async function dropSection(db) {
    return db.run(`DROP TABLE IF EXISTS Section`);
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
                customerName VARCHAR(30),
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
                vendorName VARCHAR(30)
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
            eventName VARCHAR(30),
            author VARCHAR(32),
            description VARCHAR(2048)
            )
    `);
   
}

async function dropEvent(db) {
    return db.run(`DROP TABLE IF EXISTS Event`);
}

async function initHolds(db) {

    return db.run(`
        CREATE TABLE Holds
            (eventID INTEGER,
            venueID INTEGER,
            startTime TIMESTAMP,
            PRIMARY KEY (eventID, venueID),
            FOREIGN KEY (eventID) REFERENCES Event(eventID),
            FOREIGN KEY (venueID) REFERENCES Venue(venueID)
            )
    `);
}

async function dropHolds(db) {
    return db.run(`DROP TABLE IF EXISTS Holds`)
}

async function initTicket(db) {
    return db.run(`
        CREATE TABLE Ticket
            (ticketID INTEGER PRIMARY KEY,
            cost DECIMAL(10, 2),
            rowNumber INTEGER,
            seatNumber INTEGER,
            eventID INTEGER, 
            venueID INTEGER,
            sectionNumber INTEGER,
            UNIQUE (venueID, sectionNumber, seatNumber, rowNumber, eventID),
            FOREIGN KEY (sectionNumber, eventID, venueID) REFERENCES Section(sectionNumber, eventID, venueID)
            )
    `)
}

async function dropTicket(db) {
    return db.run(`DROP TABLE IF EXISTS Ticket`);
}

async function initIssued(db) {
    return db.run(`
        CREATE TABLE Issued
            (ticketID INTEGER,
            userID INTEGER,
            PRIMARY KEY (ticketID, userID),
            FOREIGN KEY (ticketID) REFERENCES Ticket(ticketID),
            FOREIGN KEY (userID) REFERENCES Customer(userID)
            )
    `)
}

async function dropIssued(db) {
    return db.run(`DROP TABLE IF EXISTS Issued`)
}

async function initFoodDrink(db) {
    return db.run(`
        CREATE TABLE FoodDrink(
            itemName VARCHAR(100) PRIMARY KEY,
            price NUMBER(2,2),
            specifier VARCHAR(1),
            isFriesIncluded NUMBER(1),
            drinkSize VARCHAR(1)
            )
    `)
}

async function dropFoodDrink(db) {
    return db.run(`DROP TABLE IF EXISTS FoodDrink`)
}

async function initHas(db) {
    return db.run(`
        CREATE TABLE Has(
            itemName VARCHAR(100),
            venueID INTEGER,
            PRIMARY KEY (itemName, venueID),
            FOREIGN KEY (itemName) REFERENCES FoodDrink(itemName),
            FOREIGN KEY (venueID) REFERENCES Venue(venueID)
            )
    `)
}

async function dropHas(db) {
    return db.run(`DROP TABLE IF EXISTS Has`)
}

async function initAll(db) {
    if (db.getIsOracle()) {
        return new Promise(async(resolve, reject)=>{
        await initDEMOTABLE(db)
        .catch((err)=>{
            console.log(`Error from DemoTable: ${err}`);
            reject(err);
        })
        await initCityProvinceMap(db)
        .catch((err)=>{
            console.log(`Error from CityProvinceMap: ${err}`);
            reject(err);
        })
        await initVendor(db)
        .catch((err)=>{
            console.log(`Error from Vendor: ${err}`);
            reject(err);
        })
        await initVenue(db)
        .catch((err)=>{
            console.log(`Error from Venue: ${err}`);
            reject(err);
        })
        await initEvent(db)
        .catch((err)=>{
            console.log(`Error from Event: ${err}`);
            reject(err);
        })
        await initHolds(db)
        .catch((err)=>{
            console.log(`Error from Holds: ${err}`);
            reject(err);
        })
        await initConcessions(db)
        .catch((err)=>{
            console.log(`Error from Concessions: ${err}`);
            reject(err);
        })
        await initConcessionsVenue(db)
        .catch((err)=>{
            console.log(`Error from ConcessionsVenue: ${err}`);
            reject(err);
        })
        await initCustomer(db)
        .catch((err)=>{
            console.log(`Error from Customer: ${err}`);
            reject(err);
        })
        await initSection(db)
        .catch((err)=>{
            console.log(`Error from Section: ${err}`);
            reject(err);
        })
        await initTicket(db)
        .catch((err)=>{
            console.log(`Error from Ticket: ${err}`);
            reject(err);
        })
        await initIssued(db)
        .catch((err)=>{
            console.log(`Error from Issued: ${err}`);
            reject(err);
        })
        await initCustomerSession(db)
        .catch((err)=>{
            console.log(`Error from CustomerSession: ${err}`);
            reject(err);
        })
        await initFoodDrink(db)
        .catch((err)=>{
            console.log(`Error from FoodDrink: ${err}`);
            reject(err);
        
        })
        await initHas(db)
        .catch((err)=>{
            console.log(`Error from Has: ${err}`);
            reject(err);
        })
        resolve(true);
        })
        
    } else {
        // This cannot be performed on Oracle DB due to rate limits
        const promises = [
            initDEMOTABLE(db),
            initSection(db),
            initVenue(db),
            initCityProvinceMap(db),
            initVendor(db),
            initConcessions(db),
            initConcessionsVenue(db),
            initCustomer(db),
            initEvent(db),
            initTicket(db),
            initIssued(db),
            initCustomerSession(db),
            initHolds(db),
            initFoodDrink(db),
            initHas(db),
        ]
        return Promise.all(promises);
    }
    
}

async function dropAll(db) {
    if (db.getIsOracle()) {
        return new Promise(async(resolve,reject)=>{
            await db.run(`DROP TABLE DEMOTABLE CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at DEMOTABLE: ${err}`)})
            await db.run(`DROP TABLE Section CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Section: ${err}`)})
            await db.run(`DROP TABLE Venue CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Venue: ${err}`)})
            await db.run(`DROP TABLE CityProvinceMap CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at CityProvinceMap: ${err}`)})
            await db.run(`DROP TABLE Concession CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Concession: ${err}`)})
            await db.run(`DROP TABLE ConcessionVenue CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at ConcessionVenue: ${err}`)})
            await db.run(`DROP TABLE Customer CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Customer: ${err}`)})
            await db.run(`DROP TABLE Event CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Event: ${err}`)})
            await db.run(`DROP TABLE Vendor CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Vendor: ${err}`)})
            await db.run(`DROP TABLE Ticket CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Ticket: ${err}`)})
            await db.run(`DROP TABLE CustomerSession CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at CustomerSession: ${err}`)})
            await db.run(`DROP TABLE Issued CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Issued: ${err}`)})
            await db.run(`DROP TABLE Holds CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Holds: ${err}`)})
            await db.run(`DROP TABLE FoodDrink CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at FoodDrink:${err}`)})
            await db.run(`DROP TABLE Has CASCADE CONSTRAINTS`)
            .catch((err)=>{console.log(`Error at Has: ${err}`)})
            resolve(true);
        })
    } else {
        // This cannot be performed on Oracle DB due to rate limits
        const promises = [
            dropDEMOTABLE(db),
            dropSection(db),
            dropVenue(db),
            dropCityProvinceMapt(db),
            dropConcession(db),
            dropConcessionVenue(db),
            dropCustomer(db),
            dropEvent(db),
            dropSeat(db),
            dropVendor(db),
            dropTicket(db),
            dropCustomerSession(db),
            dropIssued(db),
            dropHolds(db),
            dropFoodDrink(db),
            dropHas(db),
        ]
        return Promise.all(promises);
    }

}

async function resetAll(db) {
    console.log("Starting database reset")
    console.log("Starting drop tables...")
    return await dropAll(db).then(async()=>{
        console.log("Starting create tables...")
        const res = await initAll(db).then(async ()=>{
            console.log("Starting inserting data into tables...")
            return await insertData.insertData().then((res)=>res).catch(
                (err)=>{
                    console.log({err, source:"insertData"});
                    return err;
                }
            )
            
        }).catch((err)=>{
            console.log({err,source:"initAll"});
            return false;
        });
        console.log("Database succesfully reset");
        return res
    }).catch((err)=>{
        console.log({err,source:"dropAll"});
        return false;
    })


}

module.exports = {
    initAll,
    dropAll,
    resetAll,
}