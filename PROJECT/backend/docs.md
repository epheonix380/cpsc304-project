# DOCS FOR API ENDPOINTS #

## Events API ##

`url/events`

Gets all the events in the future. It uses current datetime as the date to search with

Results:
```
[
    {"eventid":1,"type":"CNCRT","eventname":"Eras Tour","author":"Taylor Swift","description":"I heard its good","starttime":"2023-11-04","venueid":1,"venuename":"Rogers Arena","city":"Vancouver"},
    
    {"eventid":2,"type":"CNCRT","eventname":"Coldplay Tour","author":"Coldplay","description":"I heard its good","starttime":"2023-11-06","venueid":2,"venuename":"BC Place","city":"Vancouver"}
    ]
```

Options:

`url/events?orderBy=type`


This option ordersBy the specified category

Available options:


        type, ename, author, startTime, vname, city, startTime(default option)

## Users API ##

`url/users`

Gets all users in the system

Results:
```
{"data":
    [
        {"userid":1,"name":"John","city":"Vancouver","password":"12345"},
        {"userid":2,"name":"Sarah","city":"Calgery","password":"12345"},
        {"userid":3,"name":"Peter","city":"Toronto","password":"12345"},
        {"userid":4,"name":"Bella","city":"Montreal","password":"12345"},
        {"userid":5,"name":"Bob","city":"Victoria","password":"12345"}
        ]
    }
```

This API has no options

## Tickets API ##

`url/tickets/:userid`

Gets all the tickets associated with specific userid

Results:
```
{"data":
    [
        {"ticketid":14,"rownumber":1,"seatnumber":3,"sectionnumber":1,"eventid":1,"eventname":"Eras Tour","author":"Taylor Swift","venuename":"Scotiabank Saddledome","city":"Calgary","starttime":"2024-01-04"},
        
        {"ticketid":62,"rownumber":1,"seatnumber":1,"sectionnumber":1,"eventid":2,"eventname":"Coldplay Tour","author":"Coldplay","venuename":"Calgary Event Centre","city":"Calgary","starttime":"2024-01-06"}
        ]
    }
```


This API endpoint has no options