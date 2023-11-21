# DOCS FOR API ENDPOINTS #

## Events API ##

`url/events`

Gets all the events in the future. It uses current datetime as the date to search with

Results:
```
[
    {"eventID":1,"type":"CNCRT","name":"Rogers Arena","author":"Taylor Swift","description":"I heard its good","startTime":20231204,"venueID":1,"city":"Vancouver"},
    {"eventID":2,"type":"CNCRT","name":"BC Place","author":"Coldplay","description":"I heard its good","startTime":20231206,"venueID":2,"city":"Vancouver"}
    ]
```

Options:

`url/events?orderBy=type`


This option ordersBy the specified category

Available options:


        type, eName, author, startTime, vName, city, startTime(default option)

## Users API ##

`url/users`

Gets all users in the system

Results:
```
{"data":
    [
        {"userID":1,"name":"John","city":"Vancouver","password":"12345"},
        {"userID":2,"name":"Sarah","city":"Calgery","password":"12345"},
        {"userID":3,"name":"Peter","city":"Toronto","password":"12345"},
        {"userID":4,"name":"Bella","city":"Montreal","password":"12345"},
        {"userID":5,"name":"Bob","city":"Victoria","password":"12345"}
        ]
    }
```

This API has no options

## Tickets API ##

`url/tickets/:userID`

Gets all the tickets associated with specific userID

Results:
```
{"data":
    [
        {"ticketID":3,"rowNumber":1,"seatNumber":2,"sectionNumber":1,"eventID":1,"eName":"Eras Tour","author":"Taylor Swift","vName":"Rogers Arena","city":"Vancouver","startTime":20231204},
        
        {"ticketID":54,"rowNumber":1,"seatNumber":3,"sectionNumber":1,"eventID":2,"eName":"Coldplay Tour","author":"Coldplay","vName":"BC Place","city":"Vancouver","startTime":20231206}]
    }
```


This API endpoint has no options