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
                (sectionNumber INTEGER PRIMARY KEY,
                eventID INTEGER,
                numberOfSeats INTEGER,
                type CHAR(5)
                )
        `);

}

async function dropSection(db) {
    return db.run(`DROP TABLE IF EXISTS Section`);
}

async function initCityProvinceMap(db) {

    return db.run(`
            CREATE TABLE CityProvinceMap
                (city VARCHAR(30) PRIMARY KEY,
                province VARCHAR(30)
                )
        `);

}

async function initCustomer(db) {

    return db.run(`
            CREATE TABLE Customer
                (userID INTEGER PRIMARY KEY,
                name VARCHAR(30),
                city VARCHAR(30),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city)
                )
        `);

}

async function initVendor(db) {

    return db.run(`
            CREATE TABLE Vendor 
                (vendorID INTEGER PRIMARY KEY,
                name VARCHAR(30)
                )
        `);

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

async function initEvent(db) {

    return db.run(`
        CREATE TABLE Events 
            (eventID INTEGER PRIMARY KEY,
            type VARCHAR(30),
            name VARCHAR(30),
            venueID INTEGER,
            FOREIGN KEY (venueID) REFERENCES Venue(venueID)
            )
    `);
   
}

async function initEventVenue(db) {

    return db.run(`
        CREATE TABLE EventVenue
            (eventID INTEGER,
            venueID INTEGER,
            PRIMARY KEY (eventID, venueID),
            FOREIGN KEY (eventID) REFERENCES Events(eventID),
            FOREIGN KEY (venueID) REFERENCES Venue(venueID)
            )
    `);
}

async function initAll(db) {
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
        initEventVenue(db),
    ]
    return Promise.all(promises);
}

async function dropAll(db) {
    const promises = [
        dropDEMOTABLE(db),
        dropSection(db),
        dropVenue(db),
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