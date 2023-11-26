# DOCS FOR API ENDPOINTS #

## Events API ##
GET
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
GET
`url/events?orderBy=type`


This option ordersBy the specified category

Available options:


        type, ename, author, startTime, vname, city, startTime(default option)

## Users API ##
GET
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
GET
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

## Sections ##
GET
`url/sections?eventid=X&venueid=Y&amount=Z`

Replace X, Y and Z with your desired numbers

This API displays all available tickets within the same section given 
    the amount of tickets,
    the eventid,
    the venueid
If the amount of tickets requested is more than available in a section it will not return 
any tickets from that section, even if there are unsold tickets in that section

Results:
```
{"data":
    [
        {"ticketid":48,"cost":100,"rownumber":1,"seatnumber":7,"eventid":1,"venueid":9,"sectionnumber":1},

        {"ticketid":49,"cost":100,"rownumber":1,"seatnumber":8,"eventid":1,"venueid":9,"sectionnumber":1},

        {"ticketid":46,"cost":100,"rownumber":1,"seatnumber":5,"eventid":1,"venueid":9,"sectionnumber":1},

        {"ticketid":47,"cost":100,"rownumber":1,"seatnumber":6,"eventid":1,"venueid":9,"sectionnumber":1}
        ]
    }
```


## Purchase ##
POST
`url/purchase`


This API purchases all the tickets given. The body should be formatted in this way.
Body:
```
    {
        "userid":1
        "tickets":[
            41,
            42,
            43
        ]
    }
```

userid is of the user purchasing the tickets
tickets is a list of ticketid s to be purchased
The API returns a list of the ticketid s of the successfully purchased tickets
It will not return any failed tickets.

Response:
```
{
    "data": [
        42,
        43,
        44,
        45
        ]
    }
```

## Concessions ##
GET

`url/concessions/:venueid`


This API retrieves all food/drink available at a specific venue specified using venueid

Responose:
```
{
    "data":
        [
            {"itemname":"Water","price":10,"specifier":"L"},
            {"itemname":"Water","price":7.5,"specifier":"M"},
            {"itemname":"Water","price":5,"specifier":"S"}
            ]
    }
```


## Province ##

`url/province/:city`


This API gets a province when given a city name

Response:
```
{
    "data":
        [
            {"province":"British Columbia"}
            ]
    }
```