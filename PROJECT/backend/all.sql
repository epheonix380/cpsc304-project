DROP TABLE DEMOTABLE CASCADE CONSTRAINTS;
DROP TABLE Section CASCADE CONSTRAINTS;
DROP TABLE Venue CASCADE CONSTRAINTS;
DROP TABLE CityProvinceMap CASCADE CONSTRAINTS;
DROP TABLE Concession CASCADE CONSTRAINTS;
DROP TABLE ConcessionVenue CASCADE CONSTRAINTS;
DROP TABLE Customer CASCADE CONSTRAINTS;
DROP TABLE Event CASCADE CONSTRAINTS;
DROP TABLE Vendor CASCADE CONSTRAINTS;
DROP TABLE Ticket CASCADE CONSTRAINTS;
DROP TABLE CustomerSession CASCADE CONSTRAINTS;
DROP TABLE Issued CASCADE CONSTRAINTS;
DROP TABLE Holds CASCADE CONSTRAINTS;

    CREATE TABLE DEMOTABLE (
        id NUMBER PRIMARY KEY,
        name VARCHAR2(20)
    )
;

            CREATE TABLE CityProvinceMap
                (city VARCHAR(30) PRIMARY KEY,
                province VARCHAR(30)
                )
        ;

            CREATE TABLE Vendor 
                (vendorid INTEGER PRIMARY KEY,
                vendorname VARCHAR(30)
                )
        ;

            CREATE TABLE Venue
                (venueid INTEGER PRIMARY KEY,
                vendorid INTEGER,
                venuename VARCHAR(30),
                city VARCHAR(30),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city),
                FOREIGN KEY (vendorid) REFERENCES Vendor(vendorid)
                )
        ;

        CREATE TABLE Event
            (eventid INTEGER PRIMARY KEY,
            type VARCHAR(30),
            eventname VARCHAR(30),
            author VARCHAR(32),
            description VARCHAR(2048)
            )
    ;

        CREATE TABLE Holds
            (eventid INTEGER,
            venueid INTEGER,
            starttime TIMESTAMP,
            PRIMARY KEY (eventid, venueid),
            FOREIGN KEY (eventid) REFERENCES Event(eventid),
            FOREIGN KEY (venueid) REFERENCES Venue(venueid)
            )
    ;

        CREATE TABLE Concession 
            (itemname VARCHAR(30),
            price DECIMAL(10, 2),
            specifier VARCHAR(1),
            PRIMARY KEY (itemname, specifier)
            )
    ;

        CREATE TABLE ConcessionVenue
            (itemname VARCHAR(30),
            venueid INTEGER,
            specifier VARCHAR(1),
            PRIMARY KEY (itemname, specifier, venueid),
            FOREIGN KEY (itemname, specifier) REFERENCES Concession(itemname, specifier),
            FOREIGN KEY (venueid) REFERENCES Venue(venueid)
            )
    ;

            CREATE TABLE Customer
                (userid INTEGER PRIMARY KEY,
                customername VARCHAR(30),
                username VARCHAR(16) UNIQUE,
                city VARCHAR(30),
                password VARCHAR(64),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city)
                )
        ;

            CREATE TABLE Section
                (sectionNumber INTEGER,
                eventid INTEGER,
                venueid INTEGER,
                numberofseats INTEGER,
                type CHAR(5),
                PRIMARY KEY (sectionnumber, eventid, venueid),
                FOREIGN KEY (eventid, venueid) REFERENCES Holds(eventid, venueid)
                )
        ;

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
    ;

        CREATE TABLE Issued
            (ticketid INTEGER,
            userid INTEGER,
            attended NUMBER(1),
            PRIMARY KEY (ticketid, userid),
            UNIQUE (ticketid),
            FOREIGN KEY (ticketid) REFERENCES Ticket(ticketid),
            FOREIGN KEY (userid) REFERENCES Customer(userid) ON DELETE CASCADE
            )
    ;

            CREATE TABLE CustomerSession
                (userid INTEGER,
                sessiontoken VARCHAR(32) PRIMARY KEY,
                singleuse NUMBER(1),
                expire TIMESTAMP,
                FOREIGN KEY (userid) REFERENCES Customer(userid)
                )
        ;

        INSERT INTO CityProvinceMap (city, province) values ('Vancouver', 'British Columbia')
    ;

        INSERT INTO CityProvinceMap (city, province) values ('Calgary', 'Alberta')
    ;

        INSERT INTO CityProvinceMap (city, province) values ('Toronto', 'Ontario')
    ;

        INSERT INTO CityProvinceMap (city, province) values ('Montreal', 'Quebec')
    ;

        INSERT INTO CityProvinceMap (city, province) values ('Victoria', 'British Columbia')
    ;

        INSERT INTO Customer 
            (userid, username, customername, city, password) values
            (1, 'John1', 'John', 'Vancouver', '12345')
    ;

        INSERT INTO Customer 
            (userid, username, customername, city, password) values
            (2, 'Sarah2', 'Sarah', 'Calgary', '12345')
    ;

        INSERT INTO Customer 
            (userid, username, customername, city, password) values
            (3, 'Peter3', 'Peter', 'Toronto', '12345')
    ;

        INSERT INTO Customer 
            (userid, username, customername, city, password) values
            (4, 'Bella4', 'Bella', 'Montreal', '12345')
    ;

        INSERT INTO Customer 
            (userid, username, customername, city, password) values
            (5, 'Bob5', 'Bob', 'Victoria', '12345')
    ;

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (1, 'Vendor 1')
    ;

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (2, 'Vendor 2')
    ;

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (3, 'Vendor 3')
    ;

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (4, 'Vendor 4')
    ;

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (5, 'Vendor 5')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (1, 1, 'Rogers Arena', 'Vancouver')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (2, 1, 'BC Place', 'Vancouver')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (3, 2, 'Scotiabank Saddledome', 'Calgary')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (4, 2, 'Calgary Event Centre', 'Calgary')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (5, 3, 'Rogers Centre', 'Toronto')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (6, 3, 'Scotiabank Arena', 'Toronto')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (7, 4, 'Centre Bell', 'Montreal')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (8, 4, 'Place Bell', 'Montreal')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (9, 5, 'The Q Centre Arena', 'Victoria')
    ;

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (10, 5, 'Save-On-Foods Memorial Centre', 'Victoria')
    ;

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (1, 'CNCRT', 'Eras Tour', 'Taylor Swift', 'I heard its good')
    ;

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (2, 'CNCRT', 'Coldplay Tour', 'Coldplay', 'I heard its good')
    ;

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (3, 'MUSCL', 'Hadestown', 'Anais Mitchell', 'Lots of music')
    ;

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (4, 'MUSCL', 'Hamilton', 'Lin-Manuel Miranda', 'Lots of music')
    ;

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (5, 'HOCKY', 'Canucks Game', 'NHL', 'Lots of hockey')
    ;

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (6, 'HOCKY', 'Not canucks game', 'NHL', 'Lots of hockey')
    ;

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (7, 'BSBLL', 'Some baseball game', 'Baseball', 'Lots of baseballs')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 1, date '2023-11-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 3, date '2024-01-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 5, date '2024-02-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 7, date '2024-03-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 9, date '2024-04-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 2, date '2023-11-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 4, date '2024-01-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 6, date '2024-02-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 8, date '2024-03-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 10, date '2023-04-11')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (5, 1, date '2024-11-12')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (5, 3, date '2024-12-12')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (6, 3, date '2024-01-12')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (7, 5, date '2024-02-12')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (3, 7, date '2024-03-12')
    ;

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (4, 9, date '2024-04-12')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 1,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 3,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 5,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 7,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 9,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 2,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 4,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 6,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 8,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 10,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (5, 1,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (6, 3,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (7, 5,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (3, 7,1, 10, 'STAND')
    ;

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (4, 9,1, 10, 'STAND')
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (1, 100, 1, 0, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (2, 100, 1, 1, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (3, 100, 1, 2, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (4, 100, 1, 3, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (5, 100, 1, 4, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (6, 100, 1, 5, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (7, 100, 1, 6, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (8, 100, 1, 7, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (9, 100, 1, 8, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (10, 100, 1, 9, 1, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (11, 100, 1, 0, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (12, 100, 1, 1, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (13, 100, 1, 2, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (14, 100, 1, 3, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (15, 100, 1, 4, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (16, 100, 1, 5, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (17, 100, 1, 6, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (18, 100, 1, 7, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (19, 100, 1, 8, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (20, 100, 1, 9, 1, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (21, 100, 1, 0, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (22, 100, 1, 1, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (23, 100, 1, 2, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (24, 100, 1, 3, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (25, 100, 1, 4, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (26, 100, 1, 5, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (27, 100, 1, 6, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (28, 100, 1, 7, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (29, 100, 1, 8, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (30, 100, 1, 9, 1, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (31, 100, 1, 0, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (32, 100, 1, 1, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (33, 100, 1, 2, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (34, 100, 1, 3, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (35, 100, 1, 4, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (36, 100, 1, 5, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (37, 100, 1, 6, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (38, 100, 1, 7, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (39, 100, 1, 8, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (40, 100, 1, 9, 1, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (41, 100, 1, 0, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (42, 100, 1, 1, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (43, 100, 1, 2, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (44, 100, 1, 3, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (45, 100, 1, 4, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (46, 100, 1, 5, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (47, 100, 1, 6, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (48, 100, 1, 7, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (49, 100, 1, 8, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (50, 100, 1, 9, 1, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (51, 100, 1, 0, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (52, 100, 1, 1, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (53, 100, 1, 2, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (54, 100, 1, 3, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (55, 100, 1, 4, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (56, 100, 1, 5, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (57, 100, 1, 6, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (58, 100, 1, 7, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (59, 100, 1, 8, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (60, 100, 1, 9, 2, 2,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (61, 100, 1, 0, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (62, 100, 1, 1, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (63, 100, 1, 2, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (64, 100, 1, 3, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (65, 100, 1, 4, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (66, 100, 1, 5, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (67, 100, 1, 6, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (68, 100, 1, 7, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (69, 100, 1, 8, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (70, 100, 1, 9, 2, 4,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (71, 100, 1, 0, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (72, 100, 1, 1, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (73, 100, 1, 2, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (74, 100, 1, 3, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (75, 100, 1, 4, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (76, 100, 1, 5, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (77, 100, 1, 6, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (78, 100, 1, 7, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (79, 100, 1, 8, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (80, 100, 1, 9, 2, 6,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (81, 100, 1, 0, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (82, 100, 1, 1, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (83, 100, 1, 2, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (84, 100, 1, 3, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (85, 100, 1, 4, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (86, 100, 1, 5, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (87, 100, 1, 6, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (88, 100, 1, 7, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (89, 100, 1, 8, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (90, 100, 1, 9, 2, 8,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (91, 100, 1, 0, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (92, 100, 1, 1, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (93, 100, 1, 2, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (94, 100, 1, 3, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (95, 100, 1, 4, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (96, 100, 1, 5, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (97, 100, 1, 6, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (98, 100, 1, 7, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (99, 100, 1, 8, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (100, 100, 1, 9, 2, 10,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (101, 100, 1, 0, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (102, 100, 1, 1, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (103, 100, 1, 2, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (104, 100, 1, 3, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (105, 100, 1, 4, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (106, 100, 1, 5, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (107, 100, 1, 6, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (108, 100, 1, 7, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (109, 100, 1, 8, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (110, 100, 1, 9, 5, 1,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (111, 100, 1, 0, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (112, 100, 1, 1, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (113, 100, 1, 2, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (114, 100, 1, 3, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (115, 100, 1, 4, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (116, 100, 1, 5, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (117, 100, 1, 6, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (118, 100, 1, 7, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (119, 100, 1, 8, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (120, 100, 1, 9, 6, 3,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (121, 100, 1, 0, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (122, 100, 1, 1, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (123, 100, 1, 2, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (124, 100, 1, 3, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (125, 100, 1, 4, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (126, 100, 1, 5, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (127, 100, 1, 6, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (128, 100, 1, 7, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (129, 100, 1, 8, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (130, 100, 1, 9, 7, 5,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (131, 100, 1, 0, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (132, 100, 1, 1, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (133, 100, 1, 2, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (134, 100, 1, 3, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (135, 100, 1, 4, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (136, 100, 1, 5, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (137, 100, 1, 6, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (138, 100, 1, 7, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (139, 100, 1, 8, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (140, 100, 1, 9, 3, 7,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (141, 100, 1, 0, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (142, 100, 1, 1, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (143, 100, 1, 2, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (144, 100, 1, 3, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (145, 100, 1, 4, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (146, 100, 1, 5, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (147, 100, 1, 6, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (148, 100, 1, 7, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (149, 100, 1, 8, 4, 9,1)
    ;

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (150, 100, 1, 9, 4, 9,1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (2, 1, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (10, 2, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (24, 3, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (33, 4, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (40, 5, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (50, 1, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (63, 2, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (74, 3, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (83, 4, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (90, 5, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (101, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (102, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (103, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (104, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (105, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (106, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (107, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (108, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (109, 1, 1)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (110, 1, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (111, 1, 0)
    ;

        INSERT INTO Issued
            (ticketid, userid, attended) values
            (112, 1, 0)
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Coke', 5, 'S')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Coke', 7.5, 'M')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Coke', 10, 'L')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Fanta', 5, 'S')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Fanta', 7.5, 'M')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Fanta', 10, 'L')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Sprite', 5, 'S')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Sprite', 7.5, 'M')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Sprite', 10, 'L')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Water', 5, 'S')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Water', 7.5, 'M')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Water', 10, 'L')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Popcorn', 10, 'N')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Chips', 5, 'N')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Candy', 5, 'N')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hotdog', 10, 'N')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hotdog', 15, 'Y')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hamburger', 10, 'N')
    ;

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hamburger', 15, 'Y')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 1, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 1, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 1, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 1, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 1, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 1, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 1, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 1, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 1, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 1, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 1, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 1, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Popcorn', 1, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Chips', 1, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Candy', 1, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hotdog', 1, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hotdog', 1, 'Y')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hamburger', 1, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hamburger', 1, 'Y')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 2, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 2, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 2, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 2, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 2, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 2, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 2, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 2, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 2, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 2, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Popcorn', 2, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Chips', 2, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Candy', 2, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hotdog', 2, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hamburger', 2, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 3, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 3, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 3, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 3, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 3, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 3, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Popcorn', 3, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Candy', 3, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hamburger', 3, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 4, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 4, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 4, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 4, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Chips', 4, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hotdog', 4, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Popcorn', 5, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Chips', 5, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Candy', 5, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hotdog', 5, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Hamburger', 5, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 6, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 6, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 6, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 6, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 6, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 6, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 6, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 6, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 6, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 6, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 7, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 7, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Coke', 7, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 7, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 7, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Fanta', 7, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 7, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 7, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Sprite', 7, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 7, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Popcorn', 7, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Chips', 7, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Candy', 7, 'N')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 8, 'S')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 8, 'M')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 8, 'L')
    ;

        INSERT INTO ConcessionVenue
            (itemname, venueid, specifier) values
            ('Water', 9, 'S')
    ;

            SELECT table_name as name
            FROM user_tables
            ;
