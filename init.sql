CREATE TABLE Venue
(venueID INTEGER PRIMARY KEY,
 vendorID INTEGER,
 name VARCHAR(30),
 city VARCHAR(30),
 FOREIGN KEY (city) REFERENCES CityProvinceMap(city),
 FOREIGN KEY (vendorID) REFERENCES Vendor(vendorID)
)

CREATE TABLE Section
(sectionNumber INTEGER PRIMARY KEY,
 eventID INTEGER,
 numberOfSeats INTEGER,
 type CHAR(5),
)


CREATE TABLE Customer
(userID INTEGER PRIMARY KEY,
 name VARCHAR(30),
 city VARCHAR(30),
 FOREIGN KEY (city) REFERENCES CityProvinceMap(city)
)

CREATE TABLE CityProvinceMap
(city VARCHAR(30) PRIMARY KEY,
 province VARCHAR(30)
)

CREATE TABLE Vendor 
(vendorID INTEGER PRIMARY KEY,
 name VARCHAR(30)
)

CREATE TABLE Concession 
(itemName VARCHAR(30) PRIMARY KEY,
 price DECIMAL(10, 2),
 specifier CHAR(1)
)

CREATE TABLE Events 
(eventID INTEGER PRIMARY KEY,
 type VARCHAR(30),
 name VARCHAR(30),
 author VARCHAR(32),
 description VARCHAR(2048)

)
CREATE TABLE EventVenue
(eventID INTEGER,
 venueID INTEGER,
 startTime TIMESTAMP,
 PRIMARY KEY (eventID, venueID, startTime),
 FOREIGN KEY (eventID) REFERENCES Events(eventID),
 FOREIGN KEY (venueID) REFERENCES Venue(venueID)
)


CREATE TABLE ConcessionVenue
(itemName VARCHAR(30),
 venueID INTEGER,
 PRIMARY KEY (itemName, venueID),
 FOREIGN KEY (itemName) REFERENCES Concession(itemName),
 FOREIGN KEY (venueID) REFERENCES Venue(venueID)
)

CREATE TABLE Section_Seat
(sectionNumber INTEGER,
 seatNumber INTEGER,
PRIMARY KEY (sectionNumber, seatNumber),
FOREIGN KEY (sectionNumber) REFERENCES Section(sectionNumber) ON DELETE CASCADE
)

CREATE TABLE Ticket
(ticketID INTEGER PRIMARY KEY,
 cost DECIMAL(10, 2)
)

CREATE TABLE UserTicket
(ticketID INTEGER,
 userID INTEGER,
 PRIMARY KEY (ticketID, userID),
 FOREIGN KEY (ticketID) REFERENCES Ticket(ticketID),
 FOREIGN KEY (userID) REFERENCES Customer(userID)
)

