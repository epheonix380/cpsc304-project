# DOCS FOR API ENDPOINTS #

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