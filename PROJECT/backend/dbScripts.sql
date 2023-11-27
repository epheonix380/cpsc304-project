DROP TABLE IF EXISTS DEMOTABLE
DROP TABLE IF EXISTS Section
DROP TABLE IF EXISTS Venue
DROP TABLE IF EXISTS CityProvinceMap
DROP TABLE IF EXISTS Concession
DROP TABLE IF EXISTS ConcessionVenue
DROP TABLE IF EXISTS Customer
DROP TABLE IF EXISTS Event
DROP TABLE IF EXISTS Seat
DROP TABLE IF EXISTS Vendor
DROP TABLE IF EXISTS Ticket
DROP TABLE IF EXISTS CustomerSession
DROP TABLE IF EXISTS Issued
DROP TABLE IF EXISTS Holds
DROP TABLE IF EXISTS FoodDrink
DROP TABLE IF EXISTS Has

    CREATE TABLE DEMOTABLE (
        id NUMBER PRIMARY KEY,
        name VARCHAR2(20)
    )


            CREATE TABLE Section
                (sectionNumber INTEGER,
                eventid INTEGER,
                venueid INTEGER,
                numberofseats INTEGER,
                type CHAR(5),
                PRIMARY KEY (sectionnumber, eventid, venueid),
                FOREIGN KEY (eventid, venueid) REFERENCES Holds(eventid, venueid)
                )
        

            CREATE TABLE Venue
                (venueid INTEGER PRIMARY KEY,
                vendorid INTEGER,
                venuename VARCHAR(30),
                city VARCHAR(30),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city),
                FOREIGN KEY (vendorid) REFERENCES Vendor(vendorid)
                )
        

            CREATE TABLE CityProvinceMap
                (city VARCHAR(30) PRIMARY KEY,
                province VARCHAR(30)
                )
        

            CREATE TABLE Vendor 
                (vendorid INTEGER PRIMARY KEY,
                vendorname VARCHAR(30)
                )
        

        CREATE TABLE Concession 
            (itemname VARCHAR(30),
            price DECIMAL(10, 2),
            specifier VARCHAR(1),
            PRIMARY KEY (itemname, specifier)
            )
    

        CREATE TABLE ConcessionVenue
            (itemname VARCHAR(30),
            venueid INTEGER,
            PRIMARY KEY (itemname, venueid),
            FOREIGN KEY (itemname) REFERENCES Concession(itemname),
            FOREIGN KEY (venueid) REFERENCES Venue(venueid)
            )
    

            CREATE TABLE Customer
                (userid INTEGER PRIMARY KEY,
                customername VARCHAR(30),
                city VARCHAR(30),
                password VARCHAR(64),
                FOREIGN KEY (city) REFERENCES CityProvinceMap(city)
                )
        

        CREATE TABLE Event
            (eventid INTEGER PRIMARY KEY,
            type VARCHAR(30),
            eventname VARCHAR(30),
            author VARCHAR(32),
            description VARCHAR(2048)
            )
    

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
    

        CREATE TABLE Issued
            (ticketid INTEGER,
            userid INTEGER,
            PRIMARY KEY (ticketid, userid),
            FOREIGN KEY (ticketid) REFERENCES Ticket(ticketid),
            FOREIGN KEY (userid) REFERENCES Customer(userid)
            )
    

            CREATE TABLE CustomerSession
                (userid INTEGER,
                sessiontoken VARCHAR(32) PRIMARY KEY,
                singleuse NUMBER(1),
                expire TIMESTAMP,
                FOREIGN KEY (userid) REFERENCES Customer(userid)
                )
        

        CREATE TABLE Holds
            (eventid INTEGER,
            venueid INTEGER,
            starttime TIMESTAMP,
            PRIMARY KEY (eventid, venueid),
            FOREIGN KEY (eventid) REFERENCES Event(eventid),
            FOREIGN KEY (venueid) REFERENCES Venue(venueid)
            )
    

        INSERT INTO CityProvinceMap (city, province) values ('Vancouver', 'British Columbia')
    

        INSERT INTO CityProvinceMap (city, province) values ('Calgary', 'Alberta')
    

        INSERT INTO CityProvinceMap (city, province) values ('Toronto', 'Ontario')
    

        INSERT INTO CityProvinceMap (city, province) values ('Montreal', 'Quebec')
    

        INSERT INTO CityProvinceMap (city, province) values ('Victoria', 'British Columbia')
    

        INSERT INTO Customer 
            (userid, customername, city, password) values
            (1, 'John', 'Vancouver', '12345')
    

        INSERT INTO Customer 
            (userid, customername, city, password) values
            (2, 'Sarah', 'Calgary', '12345')
    

        INSERT INTO Customer 
            (userid, customername, city, password) values
            (3, 'Peter', 'Toronto', '12345')
    

        INSERT INTO Customer 
            (userid, customername, city, password) values
            (4, 'Bella', 'Montreal', '12345')
    

        INSERT INTO Customer 
            (userid, customername, city, password) values
            (5, 'Bob', 'Victoria', '12345')
    

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (1, 'Vendor 1')
    

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (2, 'Vendor 2')
    

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (3, 'Vendor 3')
    

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (4, 'Vendor 4')
    

        INSERT INTO Vendor 
            (vendorid, vendorname) values
            (5, 'Vendor 5')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (1, 1, 'Rogers Arena', 'Vancouver')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (2, 1, 'BC Place', 'Vancouver')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (3, 2, 'Scotiabank Saddledome', 'Calgary')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (4, 2, 'Calgary Event Centre', 'Calgary')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (5, 3, 'Rogers Centre', 'Toronto')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (6, 3, 'Scotiabank Arena', 'Toronto')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (7, 4, 'Centre Bell', 'Montreal')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (8, 4, 'Place Bell', 'Montreal')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (9, 5, 'The Q Centre Arena', 'Victoria')
    

        INSERT INTO Venue 
            (venueid, vendorid, venuename, city) values
            (10, 5, 'Save-On-Foods Memorial Centre', 'Victoria')
    

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (1, 'CNCRT', 'Eras Tour', 'Taylor Swift', 'I heard its good')
    

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (2, 'CNCRT', 'Coldplay Tour', 'Coldplay', 'I heard its good')
    

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (3, 'MUSCL', 'Hadestown', 'Anais Mitchell', 'Lots of music')
    

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (4, 'MUSCL', 'Hamilton', 'Lin-Manuel Miranda', 'Lots of music')
    

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (5, 'HOCKY', 'Canucks Game', 'NHL', 'Lots of hockey')
    

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (6, 'HOCKY', 'Not canucks game', 'NHL', 'Lots of hockey')
    

        INSERT INTO Event 
            (eventid, type, eventname, author, description) values
            (7, 'BSBLL', 'Some baseball game', 'Baseball', 'Lots of baseballs')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 1,  '2023-11-04')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 3,  '2024-01-04')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 5,  '2024-02-04')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 7,  '2024-03-04')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (1, 9,  '2024-04-04')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 2,  '2023-11-06')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 4,  '2024-01-06')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 6,  '2024-02-06')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 8,  '2024-03-06')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (2, 10,  '2024-04-06')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (5, 1,  '2023-11-10')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (6, 3,  '2024-01-10')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (7, 5,  '2024-02-10')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (3, 7,  '2024-03-10')
    

        INSERT INTO Holds 
            (eventid, venueid, starttime) values
            (4, 9,  '2024-04-10')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 1,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 3,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 5,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 7,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (1, 9,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 2,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 4,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 6,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 8,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (2, 10,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (5, 1,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (6, 3,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (7, 5,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (3, 7,1, 10, 'STAND')
    

        INSERT INTO Section 
            (eventid, venueid, sectionnumber, numberofseats, type) values
            (4, 9,1, 10, 'STAND')
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (1, 100, 1, 0, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (2, 100, 1, 1, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (3, 100, 1, 2, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (4, 100, 1, 3, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (5, 100, 1, 4, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (6, 100, 1, 5, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (7, 100, 1, 6, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (8, 100, 1, 7, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (9, 100, 1, 8, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (10, 100, 1, 9, 1, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (11, 100, 1, 0, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (12, 100, 1, 1, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (13, 100, 1, 2, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (14, 100, 1, 3, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (15, 100, 1, 4, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (16, 100, 1, 5, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (17, 100, 1, 6, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (18, 100, 1, 7, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (19, 100, 1, 8, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (20, 100, 1, 9, 1, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (21, 100, 1, 0, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (22, 100, 1, 1, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (23, 100, 1, 2, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (24, 100, 1, 3, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (25, 100, 1, 4, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (26, 100, 1, 5, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (27, 100, 1, 6, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (28, 100, 1, 7, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (29, 100, 1, 8, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (30, 100, 1, 9, 1, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (31, 100, 1, 0, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (32, 100, 1, 1, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (33, 100, 1, 2, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (34, 100, 1, 3, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (35, 100, 1, 4, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (36, 100, 1, 5, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (37, 100, 1, 6, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (38, 100, 1, 7, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (39, 100, 1, 8, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (40, 100, 1, 9, 1, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (41, 100, 1, 0, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (42, 100, 1, 1, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (43, 100, 1, 2, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (44, 100, 1, 3, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (45, 100, 1, 4, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (46, 100, 1, 5, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (47, 100, 1, 6, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (48, 100, 1, 7, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (49, 100, 1, 8, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (50, 100, 1, 9, 1, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (51, 100, 1, 0, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (52, 100, 1, 1, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (53, 100, 1, 2, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (54, 100, 1, 3, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (55, 100, 1, 4, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (56, 100, 1, 5, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (57, 100, 1, 6, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (58, 100, 1, 7, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (59, 100, 1, 8, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (60, 100, 1, 9, 2, 2,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (61, 100, 1, 0, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (62, 100, 1, 1, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (63, 100, 1, 2, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (64, 100, 1, 3, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (65, 100, 1, 4, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (66, 100, 1, 5, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (67, 100, 1, 6, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (68, 100, 1, 7, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (69, 100, 1, 8, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (70, 100, 1, 9, 2, 4,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (71, 100, 1, 0, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (72, 100, 1, 1, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (73, 100, 1, 2, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (74, 100, 1, 3, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (75, 100, 1, 4, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (76, 100, 1, 5, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (77, 100, 1, 6, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (78, 100, 1, 7, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (79, 100, 1, 8, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (80, 100, 1, 9, 2, 6,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (81, 100, 1, 0, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (82, 100, 1, 1, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (83, 100, 1, 2, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (84, 100, 1, 3, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (85, 100, 1, 4, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (86, 100, 1, 5, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (87, 100, 1, 6, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (88, 100, 1, 7, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (89, 100, 1, 8, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (90, 100, 1, 9, 2, 8,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (91, 100, 1, 0, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (92, 100, 1, 1, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (93, 100, 1, 2, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (94, 100, 1, 3, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (95, 100, 1, 4, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (96, 100, 1, 5, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (97, 100, 1, 6, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (98, 100, 1, 7, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (99, 100, 1, 8, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (100, 100, 1, 9, 2, 10,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (101, 100, 1, 0, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (102, 100, 1, 1, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (103, 100, 1, 2, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (104, 100, 1, 3, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (105, 100, 1, 4, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (106, 100, 1, 5, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (107, 100, 1, 6, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (108, 100, 1, 7, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (109, 100, 1, 8, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (110, 100, 1, 9, 5, 1,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (111, 100, 1, 0, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (112, 100, 1, 1, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (113, 100, 1, 2, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (114, 100, 1, 3, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (115, 100, 1, 4, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (116, 100, 1, 5, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (117, 100, 1, 6, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (118, 100, 1, 7, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (119, 100, 1, 8, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (120, 100, 1, 9, 6, 3,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (121, 100, 1, 0, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (122, 100, 1, 1, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (123, 100, 1, 2, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (124, 100, 1, 3, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (125, 100, 1, 4, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (126, 100, 1, 5, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (127, 100, 1, 6, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (128, 100, 1, 7, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (129, 100, 1, 8, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (130, 100, 1, 9, 7, 5,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (131, 100, 1, 0, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (132, 100, 1, 1, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (133, 100, 1, 2, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (134, 100, 1, 3, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (135, 100, 1, 4, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (136, 100, 1, 5, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (137, 100, 1, 6, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (138, 100, 1, 7, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (139, 100, 1, 8, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (140, 100, 1, 9, 3, 7,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (141, 100, 1, 0, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (142, 100, 1, 1, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (143, 100, 1, 2, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (144, 100, 1, 3, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (145, 100, 1, 4, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (146, 100, 1, 5, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (147, 100, 1, 6, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (148, 100, 1, 7, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (149, 100, 1, 8, 4, 9,1)
    

        INSERT INTO Ticket
            (ticketid, cost, rownumber, seatnumber, eventid, venueid, sectionnumber) values
            (150, 100, 1, 9, 4, 9,1)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (1, 1)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (12, 2)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (21, 3)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (32, 4)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (41, 5)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (52, 1)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (60, 2)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (71, 3)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (81, 4)
    

        INSERT INTO Issued
            (ticketid, userid) values
            (91, 5)
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Coke', 5, 'S')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Coke', 7.5, 'M')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Coke', 10, 'L')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Fanta', 5, 'S')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Fanta', 7.5, 'M')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Fanta', 10, 'L')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Sprite', 5, 'S')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Sprite', 7.5, 'M')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Sprite', 10, 'L')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Water', 5, 'S')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Water', 7.5, 'M')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Water', 10, 'L')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Popcorn', 10, 'N')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Chips', 5, 'N')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Candy', 5, 'N')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hotdog', 10, 'N')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hotdog', 15, 'Y')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hamburger', 10, 'N')
    

        INSERT INTO Concession
            (itemname, price, specifier) values
            ('Hamburger', 15, 'Y')
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Coke', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Fanta', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Sprite', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Water', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Popcorn', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Chips', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Candy', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hotdog', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hamburger', 1)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Coke', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Fanta', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Sprite', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Water', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Popcorn', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Chips', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Candy', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hotdog', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hamburger', 2)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Coke', 3)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Sprite', 3)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Popcorn', 3)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Candy', 3)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hamburger', 3)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Fanta', 4)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Water', 4)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Chips', 4)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hotdog', 4)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Popcorn', 5)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Chips', 5)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Candy', 5)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hotdog', 5)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Hamburger', 5)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Coke', 6)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Fanta', 6)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Sprite', 6)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Water', 6)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Coke', 7)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Fanta', 7)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Sprite', 7)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Water', 7)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Popcorn', 7)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Chips', 7)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Candy', 7)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Water', 8)
    

        INSERT INTO ConcessionVenue
            (itemname, venueid) values
            ('Water', 9)
    

            SELECT 
                name
            FROM 
                sqlite_schema
            WHERE 
                type ='table' AND 
                name NOT LIKE 'sqlite_%'
        
