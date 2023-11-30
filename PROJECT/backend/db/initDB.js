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
                (venueid INTEGER PRIMARY KEY,
                vendorid INTEGER,
                venuename VARCHAR(30),
                city VARCHAR(30),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city),
                FOREIGN KEY (vendorid) REFERENCES Vendor(vendorid)
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
                eventid INTEGER,
                venueid INTEGER,
                numberofseats INTEGER,
                type CHAR(5),
                PRIMARY KEY (sectionnumber, eventid, venueid),
                FOREIGN KEY (eventid, venueid) REFERENCES Holds(eventid, venueid)
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
                (userid INTEGER PRIMARY KEY,
                customername VARCHAR(30),
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
                (userid INTEGER,
                sessiontoken VARCHAR(32) PRIMARY KEY,
                singleuse NUMBER(1),
                expire TIMESTAMP,
                FOREIGN KEY (userid) REFERENCES Customer(userid)
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
                (vendorid INTEGER PRIMARY KEY,
                vendorname VARCHAR(30)
                )
        `);

}

async function dropVendor(db) {
    return db.run(`DROP TABLE IF EXISTS Vendor`);
}

async function initConcessions(db) {

    return db.run(`
        CREATE TABLE Concession 
            (itemname VARCHAR(30),
            price DECIMAL(10, 2),
            specifier VARCHAR(1),
            PRIMARY KEY (itemname, specifier)
            )
    `);
   
}

async function dropConcession(db) {
    return db.run(`DROP TABLE IF EXISTS Concession`);
}

async function initConcessionsVenue(db) {

    return db.run(`
        CREATE TABLE ConcessionVenue
            (itemname VARCHAR(30),
            venueid INTEGER,
            specifier VARCHAR(1),
            PRIMARY KEY (itemname, specifier, venueid),
            FOREIGN KEY (itemname, specifier) REFERENCES Concession(itemname, specifier),
            FOREIGN KEY (venueid) REFERENCES Venue(venueid)
            )
    `);
}

async function dropConcessionVenue(db) {
    return db.run(`DROP TABLE IF EXISTS ConcessionVenue`);
}

async function initEvent(db) {

    return db.run(`
        CREATE TABLE Event
            (eventid INTEGER PRIMARY KEY,
            type VARCHAR(30),
            eventname VARCHAR(30),
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
            (eventid INTEGER,
            venueid INTEGER,
            starttime TIMESTAMP,
            PRIMARY KEY (eventid, venueid),
            FOREIGN KEY (eventid) REFERENCES Event(eventid),
            FOREIGN KEY (venueid) REFERENCES Venue(venueid)
            )
    `);
}

async function dropHolds(db) {
    return db.run(`DROP TABLE IF EXISTS Holds`)
}

async function initTicket(db) {
    return db.run(`
        CREATE TABLE Ticket
            (ticketid INTEGER PRIMARY KEY,
            cost DECIMAL(10, 2),
            rownumber INTEGER,
            seatnumber INTEGER,
            eventid INTEGER, 
            venueid INTEGER,
            sectionnumber INTEGER,
            UNIQUE (venueid, sectionnumber, seatnumber, rownumber, eventid),
            FOREIGN KEY (sectionnumber, eventid, venueid) REFERENCES Section(sectionnumber, eventid, venueid)
            )
    `)
}

async function dropTicket(db) {
    return db.run(`DROP TABLE IF EXISTS Ticket`);
}

async function initIssued(db) {
    return db.run(`
        CREATE TABLE Issued
            (ticketid INTEGER,
            userid INTEGER,
            PRIMARY KEY (ticketid, userid),
            UNIQUE (ticketid),
            FOREIGN KEY (ticketid) REFERENCES Ticket(ticketid),
            FOREIGN KEY (userid) REFERENCES Customer(userid)
            )
    `)
}

async function dropIssued(db) {
    return db.run(`DROP TABLE IF EXISTS Issued`)
}

async function dropFoodDrink(db) {
    return db.run(`DROP TABLE IF EXISTS FoodDrink`)
}

async function initHas(db) {
    return db.run(`
        CREATE TABLE Has(
            itemname VARCHAR(100),
            venueid INTEGER,
            PRIMARY KEY (itemname, venueid),
            FOREIGN KEY (itemname) REFERENCES FoodDrink(itemname),
            FOREIGN KEY (venueid) REFERENCES Venue(venueid)
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